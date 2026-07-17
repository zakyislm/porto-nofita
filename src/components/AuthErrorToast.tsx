"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { X } from "lucide-react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "AccessDenied") {
      setShow(true);
      
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => setShow(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-red-500 text-white border-[4px] border-black p-6 neobrutal-shadow max-w-sm w-full relative">
        <button 
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 p-1 hover:bg-black hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="font-heading font-black text-2xl mb-2">Access Denied</h3>
        <p className="font-mono text-sm leading-relaxed">
          If you believe this is a mistake, please contact the administrator. Only authorized Google accounts can sign in.
        </p>
      </div>
    </div>
  );
}

export default function AuthErrorToast() {
  return (
    <Suspense fallback={null}>
      <AuthErrorContent />
    </Suspense>
  );
}
