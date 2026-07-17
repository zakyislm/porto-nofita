import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const experience = await prisma.experience.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(experience);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { position, organization, duration, description } = body;
    if (!position || !organization || !duration) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const exp = await prisma.experience.create({
      data: { position, organization, duration, description },
    });
    return NextResponse.json(exp);
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
    const { id, position, organization, duration, description } = body;
    if (!id || !position || !organization || !duration) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const exp = await prisma.experience.update({
      where: { id },
      data: { position, organization, duration, description },
    });
    return NextResponse.json(exp);
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

    await prisma.experience.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
