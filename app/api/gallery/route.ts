// src/app/api/gallery/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Fetch all active gallery entries
export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve gallery images' }, { status: 500 });
  }
}

// POST: Register a newly uploaded asset into database indexes
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { src, alt, category } = body;

    if (!src || !alt || !category) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const newImage = await prisma.galleryImage.create({
      data: { src, alt, category },
    });

    return NextResponse.json(newImage);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to preserve gallery entry' }, { status: 500 });
  }
}

// DELETE: Remove media target indexes by explicit unique identification tracking numbers
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing required reference target identification parameter' }, { status: 400 });
    }

    await prisma.galleryImage.delete({ where: { id } });
    return NextResponse.json({ message: 'Resource cleared successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to clear resource metadata' }, { status: 500 });
  }
}