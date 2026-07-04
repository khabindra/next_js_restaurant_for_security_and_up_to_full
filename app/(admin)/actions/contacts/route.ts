// app/(admin)/actions/contacts/route.ts
'use server';

import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function assertAdminUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.id !== process.env.ADMIN_UUID) {
    throw new Error('Unauthorized authorization context');
  }
  return user;
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient();

  // 1. Attempt to sign in with Supabase
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect('/login?error=Invalid credentials');
  }

  // 2. Hard check against .env before letting them proceed to dashboard
  if (data.user?.id !== process.env.ADMIN_UUID) {
    await supabase.auth.signOut(); // Wipe session if they aren't the designated admin
    redirect('/login?error=Unauthorized account access');
  }

  // 3. Success path
  revalidatePath('/', 'layout');
  redirect('/admin');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

export async function deleteContact(id: string) {
  try {
    await assertAdminUser();
    await prisma.contact.delete({ where: { id } });
    revalidatePath('/admin/contacts');
  } catch (error) {
    console.error("Failed to delete contact:", error);
    // You can extend this to return an error object if using useActionState
  }
}


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