// app/(admin)/actions/auth/auth.ts
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