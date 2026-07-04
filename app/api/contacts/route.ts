// src/app/api/contacts/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const msg = await prisma.contact.create({
      data: {
        name,
        email,
        subject: subject || null,
        message,
      },
    });

    return NextResponse.json(msg, { status: 201 });
  } catch (error) {
    console.error('Failed to create contact entry:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}