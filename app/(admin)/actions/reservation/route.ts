// app/(admin)/actions/reservation/route.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { assertAdminUser } from '@/app/(admin)/actions/contacts/route';
import { reservationSchema } from '@/lib/validations/reservation';
import { getClientIpHash, reservationRateLimiter } from '@/lib/rateLimit';

// Public Action: Create a reservation safely with DB connection pooling & Security
export async function createReservationAction(formData: unknown) {
  try {
    // 1. IP Hash & Rate Limiting
    const headersList = await headers();
    const ipHash = await getClientIpHash(headersList);
    const { success: rateLimitSuccess } = await reservationRateLimiter.limit(ipHash);

    if (!rateLimitSuccess) {
      return { success: false, error: 'Too many requests. Please try again later.' };
    }

    // 2. Strict Zod Validation
    const parsed = reservationSchema.safeParse(formData);
    
    if (!parsed.success) {
      return { success: false, error: 'Invalid form data. Please check your inputs.' };
    }

    const data = parsed.data;

    // 3. Honeypot Trap
    if (data.honeypot) {
      // If a bot fills out the hidden honeypot field, silently reject 
      // but return success to trick the bot into leaving.
      console.warn('Bot intercepted in reservation form:', ipHash);
      return { success: true };
    }

    // 4. Secure Database Insertion
    const record = await prisma.reservation.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: data.date,
        time: data.time,
        guests: data.guests,
        notes: data.notes,
        status: 'pending',
      },
    });

    revalidatePath('/admin/reservation');
    return { success: true, data: record };
    
  } catch (error) {
    console.error('Reservation failed:', error);
    return { success: false, error: 'Server error. Please try again later.' };
  }
}

// Admin Action: Update status (confirmed, cancelled, completed)
export async function updateReservationStatus(id: string, status: 'confirmed' | 'cancelled' | 'completed') {
  try {
    await assertAdminUser(); 
    await prisma.reservation.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin/reservation');
  } catch (error) {
    console.error('Failed to change reservation status:', error);
  }
}

// app/(admin)/actions/reservation/route.ts
// ... keep your existing imports and functions ...

// Add this at the bottom of the file
export async function deleteReservation(id: string) {
  try {
    await assertAdminUser(); 
    
    await prisma.reservation.delete({
      where: { id },
    });
    
    revalidatePath('/admin/reservation');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete reservation:', error);
    return { success: false, error: 'Failed to delete reservation.' };
  }
}