import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export interface StoredFileResult {
  storedFileName: string;
  fileUrl: string;
  storageProvider: 'supabase' | 'local' | 'ephemeral';
}

export async function saveResumeFile(
  buffer: Buffer,
  originalFilename: string,
  mimeType: string
): Promise<StoredFileResult> {
  const timestamp = Date.now();
  const sanitizedFilename = originalFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storedFileName = `${timestamp}_${sanitizedFilename}`;

  // 1. If Supabase Storage is configured, upload to Supabase "resumes" bucket
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase.storage
        .from('resumes')
        .upload(storedFileName, buffer, {
          contentType: mimeType,
          upsert: true,
        });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from('resumes')
          .getPublicUrl(storedFileName);

        return {
          storedFileName,
          fileUrl: publicUrlData?.publicUrl || `${supabaseUrl}/storage/v1/object/public/resumes/${storedFileName}`,
          storageProvider: 'supabase',
        };
      }
      console.warn('Supabase upload skipped or failed:', error?.message);
    } catch (supabaseError) {
      console.warn('Supabase storage error:', supabaseError);
    }
  }

  // 2. Fallback for local development (safely try/catch for read-only serverless filesystems like Vercel)
  try {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });
    const localFilePath = path.join(uploadsDir, storedFileName);
    await fs.writeFile(localFilePath, buffer);

    return {
      storedFileName,
      fileUrl: `/uploads/${storedFileName}`,
      storageProvider: 'local',
    };
  } catch (fsError) {
    // In serverless / read-only environments like Vercel, filesystem writes to cwd are disabled
    console.info('Serverless read-only environment: processed file in-memory.');
    return {
      storedFileName,
      fileUrl: '',
      storageProvider: 'ephemeral',
    };
  }
}
