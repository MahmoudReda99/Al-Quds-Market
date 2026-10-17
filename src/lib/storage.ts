import { supabase } from './supabase';

const BUCKET_NAME = 'product-images';

/**
 * Returns the public URL for an image stored in the product-images bucket.
 */
export function getProductImageUrl(filePath: string): string {
  if (!filePath) return '';
  // If already an absolute URL or local public asset path (e.g. /categories/...), return as is
  if (filePath.startsWith('http://') || filePath.startsWith('https://') || filePath.startsWith('/')) {
    return filePath;
  }
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
  return data.publicUrl;
}

/**
 * Uploads a product image to Supabase Storage.
 * Requires admin privileges (enforced by Storage RLS policies).
 */
export async function uploadProductImage(
  file: File,
  folder: string = 'products'
): Promise<{ url: string; path: string }> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`Failed to upload product image: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return {
    url: publicUrlData.publicUrl,
    path: data.path,
  };
}

/**
 * Deletes a product image from Supabase Storage.
 * Requires admin privileges.
 */
export async function deleteProductImage(filePath: string): Promise<void> {
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath]);
  if (error) {
    throw new Error(`Failed to delete product image: ${error.message}`);
  }
}
