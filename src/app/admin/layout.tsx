import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session && process.env.NODE_ENV !== "development") {
    redirect("/api/auth/signin");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-surface">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-12 md:overflow-y-auto md:max-h-screen relative z-0">
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none -z-10" 
          style={{ backgroundImage: "radial-gradient(circle, #000 2px, transparent 0)", backgroundSize: "24px 24px" }} 
        />
        <div className="max-w-4xl mx-auto relative">
          {children}
        </div>
      </main>
    </div>
  );
}
