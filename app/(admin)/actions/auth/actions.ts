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


// update the current password of owner only if authenticated

import { createClient as createServerSupabaseClient } from '@/utils/supabase/server';
import { createClient as createStatelessClient } from '@supabase/supabase-js';

const PasswordUpdateSchema = z.object({
  currentPassword: z.string().min(1, "invalid current password"),
  newPassword: z.string().min(6, "New password must be at least 6 characters."),
  confirmPassword: z.string().min(6, "Confirm password is required.")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "new and confirm password is not matched",
  path: ["confirmPassword"],
});

export async function updatePasswordAction(formData: FormData) {
  // 1. Force authorization check OUTSIDE the try-catch 
  // (because assertAdminUser uses Next.js redirect(), which throws an error internally)
  const user = await assertAdminUser();

  try {
    // 2. Validate input fields via Zod
    const validation = PasswordUpdateSchema.safeParse({
      currentPassword: formData.get('currentPassword'),
      newPassword: formData.get('newPassword'),
      confirmPassword: formData.get('confirmPassword'),
    });

    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message };
    }

    const { currentPassword, newPassword } = validation.data;

    if (!user.email) {
      return { success: false, error: "System error: User email not found." };
    }

    // 3. Verify CURRENT password (STATELESS)
    const statelessSupabase = createStatelessClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );

    const { error: verifyError } = await statelessSupabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (verifyError) {
      // Return the exact requested string
      return { success: false, error: "invalid current password" };
    }

    // 4. Update to NEW password (SSR Client)
    const serverSupabase = await createServerSupabaseClient();
    const { error: updateError } = await serverSupabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      console.error(`🔴 [AUTH] Update Error: ${updateError.message}`);
      return { success: false, error: "Failed to update password in database." };
    }

    console.log(`🟢 [AUTH] Success: Admin password updated successfully.`);
    return { success: true, error: null };

  } catch (error) {
    console.error("🔴 [AUTH] Critical Server Action Error:", error);
    return { success: false, error: "An unexpected server error occurred." };
  }
}