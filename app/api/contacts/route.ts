// app/api/contacts/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { contactRateLimiter, getClientIpHash } from '@/lib/rateLimit';
import { contactSchema } from '@/lib/validations/contact';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 1. Structural Schema Verification
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid field data or payload limits exceeded.' }, { status: 400 });
    }

    const { name, email, subject, message, honeypot } = result.data;

    // 2. Hidden Honeypot Check
    // Trick the script scraper by safely exiting early with a success indicator
    if (honeypot && honeypot.trim() !== '') {
      console.warn('Spam bot intercepted via frontend honeypot camouflage.');
      return NextResponse.json({ success: true }, { status: 201 });
    }

    // 3. Distributed Atomic Rate Limiter Check
    let ipHash: string;
    try {
      ipHash = await getClientIpHash(request.headers);
    } catch (ipError) {
      console.error('Security tracking perimeter alert:', ipError);
      return NextResponse.json({ error: 'Untrusted network connection.' }, { status: 400 });
    }

    const { success } = await contactRateLimiter.limit(ipHash);
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

    // 4. Persistence Entry Database Execution
    await prisma.contact.create({
      data: {
        name,
        email: email.toLowerCase(),
        subject: subject || null,
        message,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Contact submission execution failure:', error);
    return NextResponse.json(
      { error: 'Internal server error processing submission.' },
      { status: 500 }
    );
  }
}