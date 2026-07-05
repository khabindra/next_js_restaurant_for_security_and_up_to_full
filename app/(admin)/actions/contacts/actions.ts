// app/(admin)/actions/contacts/route.ts
'use server';

import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {assertAdminUser} from '@/app/(admin)/actions/auth/actions';


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
