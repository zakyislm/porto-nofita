import { Link as LinkIcon } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaDribbble,
  FaFigma,
  FaTwitch,
  FaGitlab,
} from "react-icons/fa6";
import React from "react";

export type SocialPlatformInfo = {
  name: string;
  icon: React.ElementType;
  bgClass: string;
};

export function getSocialPlatform(url: string): SocialPlatformInfo {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes("github.com")) return { name: "GitHub", icon: FaGithub, bgClass: "bg-surface text-on-surface" };
  if (lowerUrl.includes("linkedin.com")) return { name: "LinkedIn", icon: FaLinkedin, bgClass: "bg-secondary-fixed text-on-secondary-fixed" };
  if (lowerUrl.includes("instagram.com")) return { name: "Instagram", icon: FaInstagram, bgClass: "bg-primary-fixed text-on-primary-fixed" };
  if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com")) return { name: "Twitter", icon: FaTwitter, bgClass: "bg-surface text-on-surface" };
  if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be")) return { name: "YouTube", icon: FaYoutube, bgClass: "bg-[#FF0000] text-white" };
  if (lowerUrl.includes("tiktok.com")) return { name: "TikTok", icon: FaTiktok, bgClass: "bg-surface text-on-surface" };
  if (lowerUrl.includes("dribbble.com")) return { name: "Dribbble", icon: FaDribbble, bgClass: "bg-[#ea4c89] text-white" };
  if (lowerUrl.includes("figma.com")) return { name: "Figma", icon: FaFigma, bgClass: "bg-[#F24E1E] text-white" };
  if (lowerUrl.includes("twitch.tv")) return { name: "Twitch", icon: FaTwitch, bgClass: "bg-[#9146FF] text-white" };
  if (lowerUrl.includes("gitlab.com")) return { name: "GitLab", icon: FaGitlab, bgClass: "bg-[#FC6D26] text-white" };

  // Try to extract a clean domain name for the generic label
  let name = "Link";
  try {
    const { hostname } = new URL(url);
    const parts = hostname.replace("www.", "").split(".");
    if (parts.length > 0) {
      name = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    }
  } catch (e) {
    // ignore
  }

  return { name, icon: LinkIcon, bgClass: "bg-surface-variant text-on-surface-variant" };
}
