"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminPageSkeleton from "@/components/AdminPageSkeleton";
import ConfirmModal from "@/components/ConfirmModal";

interface Experience {
  id: string;
  position: string;
  organization: string;
  duration: string;
  description: string | null;
}

export default function ManageExperience() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form states
  const [editId, setEditId] = useState<string | null>(null);
  const [position, setPosition] = useState("");
  const [organization, setOrganization] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const fetchItems = () => {
    fetch("/api/admin/experience")
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
    setPosition("");
    setOrganization("");
    setDuration("");
    setDescription("");
  };

  const handleEdit = (item: Experience) => {
    setEditId(item.id);
    setPosition(item.position);
    setOrganization(item.organization);
    setDuration(item.duration);
    setDescription(item.description || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = { id: editId, position, organization, duration, description };
    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch("/api/admin/experience", {
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
      const res = await fetch(`/api/admin/experience?id=${deleteId}`, {
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
            {editId ? "Edit Experience Entry" : "Add Experience Entry"}
          </h2>

          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 radius-input text-sm mb-6">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-mono font-bold text-on-surface mb-2">Position / Role</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full bg-surface border-[3px] border-black px-4 py-3 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                required
                placeholder="e.g. Senior PR Strategist"
              />
            </div>

            <div>
              <label className="block font-mono font-bold text-on-surface mb-2">Organization</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full bg-surface border-[3px] border-black px-4 py-3 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                required
                placeholder="e.g. Global Brands Agency"
              />
            </div>

            <div>
              <label className="block font-mono font-bold text-on-surface mb-2">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-surface border-[3px] border-black px-4 py-3 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                required
                placeholder="e.g. 2021 - Present"
              />
            </div>

            <div>
              <label className="block font-mono font-bold text-on-surface mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-surface border-[3px] border-black px-4 py-3 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow resize-none"
                placeholder="Optional details..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-primary text-on-primary border-[3px] border-black px-6 py-3 font-mono font-bold capitalize hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer disabled:opacity-50"
              >
                {saving ? "Saving..." : editId ? "Update" : "Add"}
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
          <h2 className="text-2xl font-heading font-black text-on-surface mb-6 capitalize">Current Experience</h2>
          {items.length === 0 ? (
            <p className="text-sm text-text/40">No entries found.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-surface-container-low border-[3px] border-black p-6 neobrutal-shadow-sm flex flex-col md:flex-row justify-between items-start gap-4 flex-wrap">
                  <div>
                    <h3 className="font-heading font-black text-on-surface text-lg capitalize">{item.position}</h3>
                    <p className="font-mono text-sm text-on-surface/80 font-bold mb-2">{item.organization} • {item.duration}</p>
                    {item.description && <p className="font-mono text-sm text-on-surface/70 leading-relaxed">{item.description}</p>}
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
        title="Delete Experience"
        message="Are you sure you want to delete this experience entry? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
