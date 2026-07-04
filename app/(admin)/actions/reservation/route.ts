// app/(admin)/actions/reservation/route.ts

'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import {assertAdminUser} from '@/app/(admin)/actions/contacts/route'



// Public Action: Create a reservation safely with database connection pooling
export async function createReservationAction(formData: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}) {
  try {
    const record = await prisma.reservation.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        notes: formData.notes,
        status: 'pending',
      },
    });

    revalidatePath('/admin/reservation');
    return { success: true, data: record };
  } catch (error) {
    console.error('Reservation failed:', error);
    return { success: false, error: 'Database transaction failed.' };
  }
}

// Admin Action: Update status (confirmed, cancelled, completed)
export async function updateReservationStatus(id: string, status: 'confirmed' | 'cancelled' | 'completed') {
  try {
    await assertAdminUser(); // Your existing security checkpoint function
    await prisma.reservation.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin/reservation');
  } catch (error) {
    console.error('Failed to change reservation status:', error);
  }
}