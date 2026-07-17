"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SkeletonCard, SkeletonTitle, SkeletonTextarea, SkeletonButton } from "@/components/AdminSkeleton";

export default function EditAbout() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [paragraph, setParagraph] = useState("");

  const fetchSettings = () => {
    fetch("/api/admin/settings")
      .then(async (res) => {
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        const defaultText = "I am a digital creator specializing in public relations and social media strategy. With over 5 years of experience, I help brands build their online presence and engage with their audience effectively.";
        setParagraph(data.about_text || defaultText);
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          about_text: paragraph,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="animate-pulse">
      <SkeletonCard singleColumn>
        <SkeletonTitle width="w-48" />
        <div className="space-y-6">
          <SkeletonTextarea rows={8} />
          <SkeletonButton />
        </div>
      </SkeletonCard>
    </div>
  );

  return (
    <div className="max-w-2xl bg-surface-container border-[4px] border-black p-6 md:p-8 neobrutal-shadow mb-12">
      <h2 className="text-2xl font-heading font-black text-on-surface mb-6 capitalize">Edit About Section</h2>

      {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 radius-input text-sm mb-6">{error}</div>}
      {success && <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 radius-input text-sm mb-6">Saved successfully!</div>}

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block font-mono font-bold text-on-surface mb-2">About Paragraph</label>
          <textarea
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            rows={8}
            className="w-full bg-surface border-[3px] border-black px-4 py-3 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
            required
            placeholder="A single paragraph introducing yourself..."
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-on-primary border-[3px] border-black px-6 py-3 font-mono font-bold capitalize hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer disabled:opacity-50 mt-4"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
