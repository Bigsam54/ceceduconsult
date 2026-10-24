// Direct browser uploads to CEC's Cloudinary account via an *unsigned* upload preset.
// Create the preset in Cloudinary: Settings -> Upload -> Upload presets -> Add (Signing mode: Unsigned),
// then set VITE_CLOUDINARY_UPLOAD_PRESET in .env (and in Vercel's environment variables).

const cloudName = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined) || 'qg0w6ewi';
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;

export const isCloudinaryConfigured = Boolean(cloudName && uploadPreset);

export const CLOUDINARY_FOLDERS = {
  ghanaCards: 'cec/teachers/ghana-cards',
  avatars: 'cec/teachers/avatars',
  storeBooks: 'cec/store/books',
  storeResources: 'cec/store/school-resources'
} as const;

/**
 * Uploads an image or PDF and resolves with its secure https URL.
 * Uses the "auto" resource type so PDFs are accepted alongside photos.
 */
export const uploadToCloudinary = async (
  file: Blob,
  options: { folder: string; fileName?: string }
): Promise<string> => {
  if (!isCloudinaryConfigured) {
    throw new Error('File uploads are not set up yet. Please contact CEC or try again later.');
  }

  const body = new FormData();
  body.append('file', file, options.fileName ?? 'upload');
  body.append('upload_preset', uploadPreset as string);
  body.append('folder', options.folder);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: 'POST',
    body
  });

  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.secure_url) {
    throw new Error(result?.error?.message || 'Upload failed. Please check your connection and try again.');
  }
  return result.secure_url as string;
};
