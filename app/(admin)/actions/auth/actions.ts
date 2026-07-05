// // app/(admin)/actions/auth/auth.ts
// 'use server';

// import prisma from '@/lib/prisma';
// import { createClient } from '@/utils/supabase/server';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';

// export async function assertAdminUser() {
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();

//   if (!user || user.id !== process.env.ADMIN_UUID) {
//     throw new Error('Unauthorized authorization context');
//   }
//   return user;
// }

// export async function login(formData: FormData) {
//   const email = formData.get('email') as string;
//   const password = formData.get('password') as string;
//   const supabase = await createClient();

//   // 1. Attempt to sign in with Supabase
//   const { data, error } = await supabase.auth.signInWithPassword({ email, password });

//   if (error) {
//     redirect('/login?error=Invalid credentials');
//   }

//   // 2. Hard check against .env before letting them proceed to dashboard
//   if (data.user?.id !== process.env.ADMIN_UUID) {
//     await supabase.auth.signOut(); // Wipe session if they aren't the designated admin
//     redirect('/login?error=Unauthorized account access');
//   }

//   // 3. Success path
//   revalidatePath('/', 'layout');
//   redirect('/admin');
// }

// export async function signOut() {
//   const supabase = await createClient();
//   await supabase.auth.signOut();
//   redirect('/login');
// }


'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().trim().email("Invalid email format").toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export interface ActionResponse {
  success: boolean;
  error: string | null;
}

export async function assertAdminUser() {
  const adminId = process.env.ADMIN_UUID;
  if (!adminId) {
    console.error('🔴 [AUTH] Server configuration error: ADMIN_UUID missing.');
    redirect('/login');
  }

  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user || user.id !== adminId) {
    console.warn('🟠 [AUTH] Unauthorized access attempt to protected route.');
    redirect('/login');
  }
  
  return user;
}

export async function login(formData: FormData): Promise<ActionResponse | undefined> {
  // 1. 🍯 HONEYPOT INTERCEPTION (Executes first before hitting databases or auth APIs)
  const honeypot = formData.get('company');
  if (honeypot && honeypot.toString().trim() !== '') {
    console.warn('⚠️ [HONEYPOT] Bot login attempt blocked instantly! Field "company" was populated.');
    
    // Return a generic error message to deceive the bot
    return { success: false, error: 'Invalid credentials' };
  }

  const adminId = process.env.ADMIN_UUID;
  if (!adminId) {
    console.error('🔴 [LOGIN] Failed: ADMIN_UUID missing in environment variables.');
    return { success: false, error: 'Authentication service temporarily unavailable' };
  }

  const validation = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validation.success) {
    console.warn('🟠 [LOGIN] Failed: Invalid input format.');
    return { success: false, error: validation.error.issues?.[0]?.message || "Invalid input data" };
  }

  const { email, password } = validation.data;
  const supabase = await createClient();

  // 2. Attempt credentials authentication
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data?.user) {
    console.warn(`🟠 [LOGIN] Failed: Invalid credentials used for email: ${email}`);
    return { success: false, error: 'Invalid credentials' };
  }

  // 3. Immediate deterministic verification check against admin UUID
  if (data.user.id !== adminId) {
    await supabase.auth.signOut(); 
    console.warn(`🔴 [LOGIN] Failed: Valid credentials, but NOT the admin account. (Email: ${email})`);
    return { success: false, error: 'Unauthorized account access' };
  }

  console.log(`🟢 [LOGIN] Success: Admin authenticated. Revalidating layout and redirecting...`);
  
  revalidatePath('/', 'layout');
  redirect('/admin');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  
  console.log('🔵 [AUTH] Success: Admin signed out.');
  revalidatePath('/', 'layout');
  redirect('/login');
}