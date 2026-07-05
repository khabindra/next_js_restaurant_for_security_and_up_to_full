// app/(admin)/actions/gallery/actions.ts
'use server';

import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createGalleryImageAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    const alt = formData.get('alt') as string;
    const category = formData.get('category') as string;

    if (!file || !alt || !category) {
      return { success: false, error: 'All parameters (media file, alt description, category) are required.' };
    }

    // 1. Initialize your cookie-aware server client instance dynamically
    const supabase = await createClient();

    // Convert file array buffer to server execution stream buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const fileExt = file.name.split('.').pop();
    // const fileName = `${crypto.randomUUID()}.${fileExt}`;
    // Replace crypto.randomUUID() with this:
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    const fileName = `${uniqueId}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    // 2. Upload binary stream securely using your server instance
    const { error: uploadError } = await supabase.storage
      .from('restaurant_gallery')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // 3. Build structured global CDN URI path
    const { data: urlData } = supabase.storage
      .from('restaurant_gallery')
      .getPublicUrl(filePath);

    // 4. Register index coordinates to database model
    const newAsset = await prisma.galleryImage.create({
      data: {
        src: urlData.publicUrl,
        alt,
        category,
      },
    });

    revalidatePath('/admin/gallery');
    return { success: true, data: JSON.parse(JSON.stringify(newAsset)) };
  } catch (error: any) {
    return { success: false, error: error.message || 'Server pipeline extraction anomaly.' };
  }
}

export async function deleteGalleryImageAction(id: string, storageSrc: string) {
  try {
    // Initialize your cookie-aware server client instance dynamically
    const supabase = await createClient();

    // Extract deep cloud keys from legacy paths
    const pathSegments = storageSrc.split('/storage/v1/object/public/restaurant_gallery/');
    if (pathSegments.length === 2) {
      const filePath = pathSegments[1];
      const { error: storageError } = await supabase.storage
        .from('restaurant_gallery')
        .remove([filePath]);
        
      if (storageError) throw storageError;
    }

    // Drop database item indexing reference
    await prisma.galleryImage.delete({
      where: { id },
    });

    revalidatePath('/admin/gallery');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Database index deletion failure.' };
  }
}