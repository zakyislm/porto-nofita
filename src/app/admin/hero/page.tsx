"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SkeletonCard, SkeletonTitle, SkeletonInput, SkeletonTextarea, SkeletonButton, SkeletonImageInput } from "@/components/AdminSkeleton";

export default function EditHero() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [portraitUrl, setPortraitUrl] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  
  // Local file states
  const [portraitFile, setPortraitFile] = useState<File | null>(null);
  const [portraitPreview, setPortraitPreview] = useState<string>("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  
  const [uploading, setUploading] = useState(false);

  const fetchSettings = () => {
    fetch("/api/admin/settings")
      .then(async (res) => {
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setName(data.hero_title || "Nofita");
        setHeadline(data.hero_subtitle || "Digital Creator & PR Strategist");
        setDescription(data.hero_description || "Crafting compelling narratives and building strong digital presences for modern brands.");
        setPortraitUrl(data.portraitUrl || "");
        setCvUrl(data.cvUrl || "");
        setLoading(false);
      })
      .catch((err) => {
        if (err.message?.includes("database server is running") || err.message?.includes("pooler.supabase.com")) {
          setTimeout(fetchSettings, 3000);
        } else {
          setError(err.message);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handlePortraitSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Portrait file exceeds 5MB limit.");
      return;
    }
    setError("");
    setPortraitFile(file);
    setPortraitPreview(URL.createObjectURL(file));
  };

  const handleCvSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("CV file exceeds 5MB limit.");
      return;
    }
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'pdf' && ext !== 'docx') {
      setError("CV must be a PDF or DOCX file.");
      return;
    }
    setError("");
    setCvFile(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    let finalPortraitUrl = portraitUrl;
    let finalCvUrl = cvUrl;

    try {
      // 1. Upload portrait if changed
      if (portraitFile) {
        setUploading(true);
        const pData = new FormData();
        pData.append("file", portraitFile);
        pData.append("bucket", "nofita-story-bucketzx");
        if (portraitUrl) pData.append("oldUrl", portraitUrl);

        const res = await fetch("/api/admin/upload", { method: "POST", body: pData });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        finalPortraitUrl = data.url;
        setPortraitUrl(finalPortraitUrl);
      }

      // 2. Upload CV if changed
      if (cvFile) {
        setUploading(true);
        const cData = new FormData();
        cData.append("file", cvFile);
        cData.append("bucket", "nofita-story-bucketzx");
        if (cvUrl) cData.append("oldUrl", cvUrl);

        const res = await fetch("/api/admin/upload", { method: "POST", body: cData });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        finalCvUrl = data.url;
        setCvUrl(finalCvUrl);
      }

      setUploading(false);

      // 3. Save Settings
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hero_title: name,
          hero_subtitle: headline,
          hero_description: description,
          portraitUrl: finalPortraitUrl,
          cvUrl: finalCvUrl,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setSuccess(true);
      setPortraitFile(null);
      setCvFile(null);
    } catch (err: any) {
      setError(err.message);
      setUploading(false);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="animate-pulse">
      <SkeletonCard singleColumn>
        <SkeletonTitle width="w-40" />
        <div className="space-y-6">
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonTextarea rows={3} />
          <SkeletonImageInput />
          <SkeletonButton />
        </div>
      </SkeletonCard>
    </div>
  );

  return (
    <div className="max-w-2xl bg-surface-container border-[4px] border-black p-6 md:p-8 neobrutal-shadow mb-12">

      <h2 className="text-2xl font-heading font-black text-on-surface mb-6 capitalize">Edit Hero Section</h2>

      {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 radius-input text-sm mb-6">{error}</div>}
      {success && <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 radius-input text-sm mb-6">Saved successfully!</div>}

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block font-mono font-bold text-on-surface mb-2">Display Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-surface border-[3px] border-black px-4 py-3 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
            required
          />
        </div>

        <div>
          <label className="block font-mono font-bold text-on-surface mb-2">Headline</label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full bg-surface border-[3px] border-black px-4 py-3 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
            required
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
          />
        </div>

        <div>
          <label className="block font-mono font-bold text-on-surface mb-2">Portrait Media (Max 5MB)</label>
          <div className="flex items-center gap-4">
            {(portraitPreview || portraitUrl) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={portraitPreview || portraitUrl} alt="Portrait Preview" className="w-20 h-20 object-cover border-[3px] border-black" />
            )}
            <div>
              <input
                type="file"
                accept="image/*,video/mp4,video/webm,image/gif"
                onChange={handlePortraitSelect}
                disabled={uploading || saving}
                className="text-sm font-mono text-on-surface file:mr-4 file:py-2 file:px-4 file:border-[3px] file:border-black file:bg-secondary file:text-on-secondary file:font-bold file:capitalize file:cursor-pointer hover:file:-translate-y-0.5 hover:file:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] file:transition-all"
              />
              <p className="text-xs text-text/40 mt-1">Image, GIF, or Video. Recommended square format.</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block font-mono font-bold text-on-surface mb-2">CV / Resume (Max 5MB)</label>
          <div className="flex items-center gap-4">
            <div>
              <input
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleCvSelect}
                disabled={uploading || saving}
                className="text-sm font-mono text-on-surface file:mr-4 file:py-2 file:px-4 file:border-[3px] file:border-black file:bg-surface file:text-on-surface file:font-bold file:capitalize file:cursor-pointer hover:file:-translate-y-0.5 hover:file:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] file:transition-all"
              />
              <p className="text-xs text-text/40 mt-1">
                {cvFile ? `Selected: ${cvFile.name}` : (cvUrl ? "CV is currently uploaded." : "No CV uploaded yet.")}
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving || uploading}
          className="bg-primary text-on-primary border-[3px] border-black px-6 py-3 font-mono font-bold capitalize hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer disabled:opacity-50 mt-4"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
