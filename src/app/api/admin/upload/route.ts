import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { uploadFile, deleteFile } from "@/lib/storage";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const bucket = (formData.get("bucket") as string) || "nofita-story-bucketzx";

    const oldUrl = formData.get("oldUrl") as string | null;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    if (oldUrl) {
      try {
        const urlParts = oldUrl.split("/");
        const oldKey = urlParts[urlParts.length - 1];
        if (oldKey) {
          await deleteFile(bucket, oldKey);
        }
      } catch (e) {
        console.error("Failed to delete old file:", e);
      }
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const fileUrl = await uploadFile(bucket, uniqueName, buffer, file.type);

    return NextResponse.json({ url: fileUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
