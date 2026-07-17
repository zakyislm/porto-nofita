"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SkeletonCard, SkeletonTitle, SkeletonInput, SkeletonTextarea, SkeletonButton } from "@/components/AdminSkeleton";
import ConfirmModal from "@/components/ConfirmModal";

interface WhitelistEntry {
  id: string;
  email: string;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Settings states
  const [email, setEmail] = useState("");
  const [socialLinks, setSocialLinks] = useState<string[]>([]);
  const [siteTitle, setSiteTitle] = useState("");
  const [availableForWork, setAvailableForWork] = useState(true);

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");

  // Whitelist states
  const [whitelist, setWhitelist] = useState<WhitelistEntry[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [addingEmail, setAddingEmail] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState<string | null>(null);

  const fetchSettingsAndWhitelist = async () => {
    try {
      const [settingsRes, whitelistRes] = await Promise.all([
        fetch("/api/admin/settings").then((res) => res.json()),
        fetch("/api/admin/whitelist").then((res) => res.json()),
      ]);

      if (settingsRes.error) throw new Error(settingsRes.error);
      if (whitelistRes.error) throw new Error(whitelistRes.error);

      setEmail(settingsRes.contact_email || "nofita@example.com");
      try {
        setSocialLinks(settingsRes.social_links ? JSON.parse(settingsRes.social_links) : ["https://github.com/nofita", "https://linkedin.com/in/nofita"]);
      } catch(e) {
        setSocialLinks(["https://github.com/nofita", "https://linkedin.com/in/nofita"]);
      }

      setSiteTitle(settingsRes.site_title || "Portfolio.24");
      setAvailableForWork(settingsRes.available_for_work !== "false");
      setSeoTitle(settingsRes.seo_title || "Porto | Nofita");
      setSeoDescription(settingsRes.seo_description || "Professional portfolio and resume of Nofita.");
      setSeoKeywords(settingsRes.seo_keywords || "portfolio, resume, digital creator");

      setWhitelist(whitelistRes);
      setLoading(false);
    } catch (err: any) {
      if (err.message?.includes("database server is running") || err.message?.includes("pooler.supabase.com")) {
        setTimeout(fetchSettingsAndWhitelist, 3000);
      } else {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchSettingsAndWhitelist();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_email: email,
          social_links: JSON.stringify(socialLinks.filter(l => l.trim() !== "")),
          site_title: siteTitle,
          available_for_work: String(availableForWork),
          seo_title: seoTitle,
          seo_description: seoDescription,
          seo_keywords: seoKeywords,
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

  const handleAddEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;

    setAddingEmail(true);
    setError("");

    try {
      const res = await fetch("/api/admin/whitelist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setNewEmail("");
      // Refresh list
      const whitelistRes = await fetch("/api/admin/whitelist").then((res) => res.json());
      setWhitelist(whitelistRes);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAddingEmail(false);
    }
  };

  const confirmDeleteUser = (emailToDelete: string) => {
    setDeleteEmail(emailToDelete);
  };

  const handleDeleteUser = async () => {
    if (!deleteEmail) return;
    setError("");

    try {
      const res = await fetch(`/api/admin/whitelist?email=${encodeURIComponent(deleteEmail)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Refresh list
      const whitelistRes = await fetch("/api/admin/whitelist").then((res) => res.json());
      setWhitelist(whitelistRes);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeleteEmail(null);
    }
  };

  if (loading) return (
    <div className="space-y-12 animate-pulse">
      <div className="grid xl:grid-cols-2 gap-12">
        <SkeletonCard>
          <SkeletonTitle width="w-48" />
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="h-7 bg-surface-container-highest border-[3px] border-black w-40 mb-4" />
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
            </div>
            <div className="space-y-4">
              <div className="h-7 bg-surface-container-highest border-[3px] border-black w-32 mb-4 mt-8" />
              <SkeletonInput />
              <SkeletonTextarea rows={3} />
              <SkeletonInput />
            </div>
            <SkeletonButton width="w-48" />
          </div>
        </SkeletonCard>
        
        <SkeletonCard>
          <SkeletonTitle width="w-56" />
          <div className="h-5 bg-surface-container-highest border-[3px] border-black w-3/4 mb-6" />
          <div className="flex gap-3 mb-8">
            <div className="flex-1 h-[48px] bg-surface border-[3px] border-black" />
            <div className="w-[84px] h-[48px] bg-surface-container-highest border-[3px] border-black" />
          </div>
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="h-[60px] bg-surface-container-low border-[3px] border-black neobrutal-shadow-sm" />
            ))}
          </div>
        </SkeletonCard>
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="grid xl:grid-cols-2 gap-12">
        {/* Settings Form */}
        <div className="bg-surface-container border-[4px] border-black p-6 md:p-8 neobrutal-shadow">
          <h2 className="text-2xl font-heading font-black text-on-surface mb-6 capitalize">General Settings</h2>

          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 radius-input text-sm mb-6">{error}</div>}
          {success && <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 radius-input text-sm mb-6">Saved successfully!</div>}

          <form onSubmit={handleSaveSettings} className="space-y-8">
            {/* Contact */}
            <div className="space-y-4">
              <h3 className="font-heading font-black text-on-surface text-lg border-b-4 border-black pb-2 mb-4 capitalize">Site Identity & Links</h3>

              <div>
                <label className="block font-mono font-bold text-on-surface mb-2">Site Logo Title</label>
                <input
                  type="text"
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  className="w-full bg-surface border-[3px] border-black px-4 py-3 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                  placeholder="e.g. Portfolio.24"
                />
              </div>

              <div>
                <label className="block font-mono font-bold text-on-surface mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface border-[3px] border-black px-4 py-3 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                  placeholder="e.g. name@example.com"
                />
              </div>

              <div>
                <label className="block font-mono font-bold text-on-surface mb-4">Social Links</label>
                <div className="space-y-3 mb-4">
                  {socialLinks.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="url"
                        value={link}
                        onChange={(e) => {
                          const newLinks = [...socialLinks];
                          newLinks[index] = e.target.value;
                          setSocialLinks(newLinks);
                        }}
                        className="flex-1 bg-surface border-[3px] border-black px-4 py-2 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                        placeholder="e.g. https://github.com/username"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newLinks = [...socialLinks];
                          newLinks.splice(index, 1);
                          setSocialLinks(newLinks);
                        }}
                        className="bg-red-500 text-white border-[3px] border-black px-4 font-mono font-bold capitalize hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setSocialLinks([...socialLinks, ""])}
                  className="bg-secondary text-on-secondary border-[3px] border-black px-4 py-2 font-mono font-bold capitalize hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer text-sm"
                >
                  + Add Link
                </button>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="availableForWork"
                  checked={availableForWork}
                  onChange={(e) => setAvailableForWork(e.target.checked)}
                  className="w-5 h-5 border-[3px] border-black bg-surface accent-primary cursor-pointer"
                />
                <label htmlFor="availableForWork" className="font-mono font-bold text-on-surface cursor-pointer">
                  Show "Available For Work" Badge
                </label>
              </div>
            </div>

            {/* SEO */}
            <div className="space-y-4">
              <h3 className="font-heading font-black text-on-surface text-lg border-b-4 border-black pb-2 mb-4 capitalize mt-8">SEO Fields</h3>

              <div>
                <label className="block font-mono font-bold text-on-surface mb-2">Meta Title</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full bg-surface border-[3px] border-black px-4 py-3 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                  placeholder="e.g. Porto | Nofita"
                />
              </div>

              <div>
                <label className="block font-mono font-bold text-on-surface mb-2">Meta Description</label>
                <textarea
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-surface border-[3px] border-black px-4 py-3 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow resize-none"
                  placeholder="Compelling page description..."
                />
              </div>

              <div>
                <label className="block font-mono font-bold text-on-surface mb-2">Meta Keywords</label>
                <input
                  type="text"
                  value={seoKeywords}
                  onChange={(e) => setSeoKeywords(e.target.value)}
                  className="w-full bg-surface border-[3px] border-black px-4 py-3 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                  placeholder="comma, separated, keywords"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-on-primary border-[3px] border-black px-6 py-3 font-mono font-bold capitalize hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer disabled:opacity-50 mt-4"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </form>
        </div>

        {/* Whitelist Panel */}
        <div className="bg-surface-container border-[4px] border-black p-6 md:p-8 neobrutal-shadow h-fit">
          <div className="mb-6">
            <h2 className="text-2xl font-heading font-black text-on-surface mb-2 capitalize">Authorized Users</h2>
            <p className="font-mono text-sm text-on-surface/70">Only whitelisted Google emails can access the admin panel.</p>
          </div>

          <form onSubmit={handleAddEmail} className="flex gap-3 mb-8">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="flex-1 bg-surface border-[3px] border-black px-4 py-2 font-mono text-on-surface focus:outline-none focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              placeholder="e.g. admin@gmail.com"
              required
            />
            <button
              type="submit"
              disabled={addingEmail}
              className="bg-secondary text-on-secondary border-[3px] border-black px-6 py-2 font-mono font-bold capitalize hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer disabled:opacity-50"
            >
              {addingEmail ? "Adding..." : "Add"}
            </button>
          </form>

          <div className="space-y-3">
            {whitelist.map((item) => (
              <div key={item.id} className="bg-surface-container-low border-[3px] border-black p-4 neobrutal-shadow-sm flex justify-between items-center text-sm">
                <span className="font-mono font-bold text-on-surface">{item.email}</span>
                <button
                  onClick={() => handleDeleteEmail(item.id)}
                  className="border-[2px] border-black bg-red-500 text-white px-3 py-1 font-mono font-bold text-sm hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                >
                  REMOVE
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
