export type ImageFormat = 'webp' | 'jpeg' | 'png' | 'gif' | 'bmp' | 'ico' | 'svg' | 'tiff' | 'avif';

export interface ProcessedImage {
  id: string;
  originalFile: File;
  previewUrl: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}

export interface ConversionOptions {
  format: ImageFormat;
  quality: number;
  maxWidth: number;
  maxHeight: number;
}