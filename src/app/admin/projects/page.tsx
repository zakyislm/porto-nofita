"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminPageSkeleton from "@/components/AdminPageSkeleton";
import ConfirmModal from "@/components/ConfirmModal";

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  github: string | null;
  liveDemo: string | null;
}

export default function ManageProjects() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form states
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [liveDemo, setLiveDemo] = useState("");

  const fetchItems = () => {
    fetch("/api/admin/projects")
      .then(async (res) => {
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message?.includes("database server is running") || err.message?.includes("pooler.supabase.com")) {
          setTimeout(fetchItems, 3000);
        } else {
          setError(err.message);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const resetForm = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
    setThumbnail("");
    setRepoUrl("");
    setLiveDemo("");
  };

  const handleEdit = (item: Project) => {
    setEditId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setThumbnail(item.thumbnail || "");
    setRepoUrl(item.github || "");
    setLiveDemo(item.liveDemo || "");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "nofita-story-bucketzx");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setThumbnail(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      id: editId,
      title,
      description,
      thumbnail: thumbnail || null,
      github: repoUrl || null,
      liveDemo: liveDemo || null,
    };
    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch("/api/admin/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      resetForm();
      fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setError("");

    try {
      const res = await fetch(`/api/admin/projects?id=${deleteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) return <AdminPageSkeleton />;

  return (
    <div className="space-y-12">

      <div className="grid xl:grid-cols-2 gap-12">
        {/* Form */}
        <div className="bg-surface-container border-[4px] border-black p-6 md:p-8 neobrutal-shadow">
          <h2 className="text-2xl font-heading font-black text-on-surface mb-6 capitalize">
            {editId ? "Edit Project" : "Add Project"}
          </h2>

          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 radius-input text-sm mb-6">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-mono font-bold text-on-surface mb-2">Project Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-surface border-[3px] border-black px-4 py-3 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                required
                placeholder="e.g. Social Media Campaign"
              />
            </div>

            <div>
              <label className="block font-mono font-bold text-on-surface mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-surface border-[3px] border-black px-4 py-3 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow resize-none"
                required
                placeholder="Describe what you built/achieved..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text/80 mb-2">Project Thumbnail (16:10)</label>
              <div className="flex items-center gap-4">
                {thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={thumbnail} alt="Thumbnail Preview" className="w-24 h-15 object-cover rounded-xl border border-surface/30" />
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={uploading}
                    className="text-sm font-mono text-on-surface file:mr-4 file:py-2 file:px-4 file:border-[3px] file:border-black file:bg-secondary file:text-on-secondary file:font-bold file:capitalize file:cursor-pointer hover:file:-translate-y-0.5 hover:file:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] file:transition-all"
                  />
                  {thumbnail && (
                    <button
                      type="button"
                      onClick={() => setThumbnail("")}
                      className="text-xs text-red-400 hover:text-red-300 block mt-2 cursor-pointer"
                    >
                      Remove thumbnail
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block font-mono font-bold text-on-surface mb-2">Repo URL</label>
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full bg-surface border-[3px] border-black px-4 py-3 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                placeholder="e.g. https://github.com/..., https://gitlab.com/..."
              />
            </div>

            <div>
              <label className="block font-mono font-bold text-on-surface mb-2">Live Demo URL</label>
              <input
                type="url"
                value={liveDemo}
                onChange={(e) => setLiveDemo(e.target.value)}
                className="w-full bg-surface border-[3px] border-black px-4 py-3 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                placeholder="e.g. https://example.com"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving || uploading}
                className="bg-primary text-on-primary border-[3px] border-black px-6 py-3 font-mono font-bold capitalize hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer disabled:opacity-50"
              >
                {saving ? "Saving..." : editId ? "Update" : "Add Project"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-surface-container-highest text-on-surface border-[3px] border-black px-6 py-3 font-mono font-bold capitalize hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="bg-surface-container border-[4px] border-black p-6 md:p-8 neobrutal-shadow">
          <h2 className="text-2xl font-heading font-black text-on-surface mb-6 capitalize">Current Projects</h2>
          {items.length === 0 ? (
            <p className="text-sm text-text/40">No projects found.</p>
          ) : (
            <div className="grid gap-4">
              {items.map((item) => (
                <div key={item.id} className="bg-surface-container-low border-[3px] border-black p-6 neobrutal-shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-wrap">
                  <div className="flex gap-4 items-center">
                    {item.thumbnail && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.thumbnail} alt="" className="w-16 h-16 object-cover border-[3px] border-black" />
                    )}
                    <div>
                      <h3 className="font-heading font-black text-on-surface text-lg capitalize">{item.title}</h3>
                      <p className="text-sm font-mono text-on-surface/70 line-clamp-2 mt-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button
                      onClick={() => handleEdit(item)}
                      className="border-[2px] border-black bg-secondary text-on-secondary px-3 py-1 font-mono font-bold text-sm hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => confirmDelete(item.id)}
                      className="border-[2px] border-black bg-red-500 text-white px-3 py-1 font-mono font-bold text-sm hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
