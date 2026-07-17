import { NextResponse } from "next/server";
import { getSettings } from "@/lib/data";

export async function GET() {
  try {
    const settings = await getSettings();
    const cvUrl = settings.cvUrl;

    if (!cvUrl) {
      return new NextResponse("CV not found", { status: 404 });
    }

    // Fetch the file from Supabase
    const response = await fetch(cvUrl);
    
    if (!response.ok) {
      return new NextResponse("Failed to fetch CV", { status: response.status });
    }

    // Get the content type (PDF or DOCX usually)
    const contentType = response.headers.get("content-type") || "application/octet-stream";

    // Extract filename from URL or default to Nofita_CV
    const urlParts = cvUrl.split('/');
    let filename = urlParts[urlParts.length - 1] || "Nofita_CV.pdf";
    
    // Remove query params if any
    filename = filename.split('?')[0];

    // Stream the file back to the client
    return new NextResponse(response.body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error proxying CV:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
