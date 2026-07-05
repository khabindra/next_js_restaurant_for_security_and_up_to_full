// // app/(admin)/actions/menuitems/route.ts
// "use server";

// import prisma from '@/lib/prisma';
// import { revalidatePath } from 'next/cache';
// import {assertAdminUser} from '@/app/(admin)/actions/auth/actions';

// export async function createMenuItemAction(data: {
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   image?: string;
// }) {
//   try {
//     await assertAdminUser();
    
//     // Normalize empty strings into absolute nulls for the database
//     const finalImage = data.image && data.image.trim() !== "" ? data.image : null;

//     const item = await prisma.menuItem.create({
//       data: {
//         name: data.name,
//         description: data.description,
//         price: data.price,
//         category: data.category,
//         image: finalImage,
//       },
//     });

//     revalidatePath('/menu');
//     revalidatePath('/admin/menu'); // ✅ Corrected route path hierarchy matching filesystem
//     return { success: true, data: item };
//   } catch (error) {
//     console.error(error);
//     return { success: false, error: 'Failed to create menu item' };
//   }
// }

// export async function updateMenuItemAction(id: string, data: {
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   image?: string;
// }) {
//   try {
//     await assertAdminUser();
    
//     const finalImage = data.image && data.image.trim() !== "" ? data.image : null;

//     await prisma.menuItem.update({
//       where: { id },
//       data: {
//         ...data,
//         image: finalImage
//       },
//     });
    
//     revalidatePath('/menu');
//     revalidatePath('/admin/menu'); // ✅ Corrected path
//     return { success: true };
//   } catch (error) {
//     console.error(error);
//     return { success: false };
//   }
// }

// export async function deleteMenuItemAction(id: string) {
//   try {
//     await assertAdminUser();
//     await prisma.menuItem.delete({
//       where: { id },
//     });
//     revalidatePath('/menu');
//     revalidatePath('/admin/menu'); // ✅ Corrected path
//     return { success: true };
//   } catch (error) {
//     console.error(error);
//     return { success: false };
//   }
// }

"use server";

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { assertAdminUser } from '@/app/(admin)/actions/auth/actions';
import { createClient } from '@/utils/supabase/server';
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// 1. Strict Validation Schema using Zod Coercion
const MenuItemSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  description: z.string().trim().min(5, "Description must be at least 5 characters"),
  price: z.coerce.number().int().positive("Price must be a positive integer"),
  category: z.string().trim().min(2, "Category is required"),
});

// Helper to safely extract storage path without relying on fragile array pops
function getStoragePathFromUrl(url: string | null): string | null {
  if (!url) return null;
  const parts = url.split('/object/public/menu_items/');
  return parts.length > 1 ? parts[1] : null;
}

/**
 * Creates a new menu item, handles image uploads, and rolls back files if DB writes fail.
 */
export async function createMenuItemAction(formData: FormData) {
  try {
    await assertAdminUser();
    
    // Safely validate and coerce raw form data inputs
    const validation = MenuItemSchema.safeParse({
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'), // Coerced automatically by Zod
      category: formData.get('category'),
    });

    if (!validation.success) {
      // Return the first validation error message cleanly
      return { success: false, error: validation.error.issues[0]?.message || "Validation failed" };
    }

    const { name, description, price, category } = validation.data;
    const file = formData.get('file') as File | null;
    
    let publicImageUrl = null;
    let uploadedFileName: string | null = null;

    // Validate and process file uploads safely
    if (file && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) return { success: false, error: "File exceeds 5MB limit" };
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return { success: false, error: "Only JPG, PNG, and WebP are allowed" };

      const fileExt = file.name.split('.').pop() || 'png';
      uploadedFileName = `${crypto.randomUUID()}.${fileExt}`;
      const supabase = await createClient();
      
      const { error: uploadError } = await supabase.storage
        .from('menu_items')
        .upload(uploadedFileName, file, { cacheControl: '3600', upsert: false });

      if (uploadError) return { success: false, error: `Storage Error: ${uploadError.message}` };

      const { data: urlData } = supabase.storage.from('menu_items').getPublicUrl(uploadedFileName);
      publicImageUrl = urlData.publicUrl;
    }

    // DB Execution Block with Rollback Strategy
    try {
      const item = await prisma.menuItem.create({
        data: { name, description, price, category, image: publicImageUrl },
      });

      revalidatePath('/menu');
      revalidatePath('/admin/menu');
      return { success: true, data: item };
    } catch (dbError) {
      // Rollback uploaded file if DB insertion crashes to avoid orphaned storage assets
      if (uploadedFileName) {
        const supabase = await createClient();
        await supabase.storage.from('menu_items').remove([uploadedFileName]);
      }
      throw dbError;
    }
  } catch (error: any) {
    console.error("Critical Failure in createMenuItemAction:", error);
    return { success: false, error: 'Failed to create menu item' };
  }
}

/**
 * Updates an existing menu item, uploads new media, and drops old media safely downstream.
 */
export async function updateMenuItemAction(formData: FormData) {
  try {
    await assertAdminUser();
    
    const id = formData.get('id') as string;
    if (!id) return { success: false, error: "Missing item identification" };

    const validation = MenuItemSchema.safeParse({
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      category: formData.get('category'),
    });

    if (!validation.success) {
      return { success: false, error: validation.error.issues[0]?.message || "Validation failed" };
    }

    const { name, description, price, category } = validation.data;
    const file = formData.get('file') as File | null;
    const currentImageUrl = formData.get('currentImageUrl') as string || null;

    let publicImageUrl = currentImageUrl;
    let oldFileNameToDelete: string | null = null;

    if (file && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) return { success: false, error: "File exceeds 5MB limit" };
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return { success: false, error: "Only JPG, PNG, and WebP are allowed" };

      const fileExt = file.name.split('.').pop() || 'png';
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const supabase = await createClient();
      
      const { error: uploadError } = await supabase.storage
        .from('menu_items')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (uploadError) return { success: false, error: `Storage Error: ${uploadError.message}` };

      const { data: urlData } = supabase.storage.from('menu_items').getPublicUrl(fileName);
      publicImageUrl = urlData.publicUrl;
      oldFileNameToDelete = getStoragePathFromUrl(currentImageUrl);
    }

    // Database writes happen before old file deletions to guarantee uptime availability
    await prisma.menuItem.update({
      where: { id },
      data: { name, description, price, category, image: publicImageUrl },
    });
    
    // Safely delete old asset downstream ONLY after successful DB transaction
    if (oldFileNameToDelete) {
      const supabase = await createClient();
      await supabase.storage.from('menu_items').remove([oldFileNameToDelete]);
    }

    revalidatePath('/menu');
    revalidatePath('/admin/menu');
    return { success: true };
  } catch (error: any) {
    console.error("Critical Failure in updateMenuItemAction:", error);
    return { success: false, error: 'Failed to update menu item' };
  }
}

/**
 * Removes a menu item from the DB first, then triggers bucket deletion for cleanup.
 */
export async function deleteMenuItemAction(id: string) {
  try {
    await assertAdminUser();
    if (!id) return { success: false, error: "Missing item identification" };

    const item = await prisma.menuItem.findUnique({ where: { id } });
    if (!item) return { success: false, error: 'Item not found' };

    // DB deletion takes precedence
    await prisma.menuItem.delete({ where: { id } });
    
    // Cleanup file system resources safely downstream
    const fileName = getStoragePathFromUrl(item.image);
    if (fileName) {
      const supabase = await createClient();
      const { error: storageError } = await supabase.storage.from('menu_items').remove([fileName]);
      if (storageError) {
        console.error('Non-blocking storage deletion failed downstream:', storageError);
      }
    }
    
    revalidatePath('/menu');
    revalidatePath('/admin/menu');
    return { success: true };
  } catch (error) {
    console.error("Critical Failure in deleteMenuItemAction:", error);
    return { success: false, error: 'Failed to delete menu item' };
  }
}
