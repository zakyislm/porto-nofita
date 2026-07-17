import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const education = await prisma.education.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(education);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { degree, institution, duration, description } = body;
    if (!degree || !institution || !duration) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const edu = await prisma.education.create({
      data: { degree, institution, duration, description },
    });
    return NextResponse.json(edu);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, degree, institution, duration, description } = body;
    if (!id || !degree || !institution || !duration) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const edu = await prisma.education.update({
      where: { id },
      data: { degree, institution, duration, description },
    });
    return NextResponse.json(edu);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.education.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
