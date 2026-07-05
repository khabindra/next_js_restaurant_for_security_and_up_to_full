// app/(admin)/actions/menuitems/route.ts
"use server";

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import {assertAdminUser} from '@/app/(admin)/actions/auth/actions';

export async function createMenuItemAction(data: {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}) {
  try {
    await assertAdminUser();
    
    // Normalize empty strings into absolute nulls for the database
    const finalImage = data.image && data.image.trim() !== "" ? data.image : null;

    const item = await prisma.menuItem.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        image: finalImage,
      },
    });

    revalidatePath('/menu');
    revalidatePath('/admin/menu'); // ✅ Corrected route path hierarchy matching filesystem
    return { success: true, data: item };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create menu item' };
  }
}

export async function updateMenuItemAction(id: string, data: {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}) {
  try {
    await assertAdminUser();
    
    const finalImage = data.image && data.image.trim() !== "" ? data.image : null;

    await prisma.menuItem.update({
      where: { id },
      data: {
        ...data,
        image: finalImage
      },
    });
    
    revalidatePath('/menu');
    revalidatePath('/admin/menu'); // ✅ Corrected path
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function deleteMenuItemAction(id: string) {
  try {
    await assertAdminUser();
    await prisma.menuItem.delete({
      where: { id },
    });
    revalidatePath('/menu');
    revalidatePath('/admin/menu'); // ✅ Corrected path
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}