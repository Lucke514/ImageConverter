import imageCompression from 'browser-image-compression';
import { ImageFormat, ConversionOptions } from '../types';

const MIME_TYPES: Record<string, ImageFormat[]> = {
  'image/jpeg': ['jpeg', 'webp', 'png', 'avif', 'tiff'],
  'image/png': ['png', 'webp', 'jpeg', 'avif', 'tiff', 'ico'],
  'image/webp': ['webp', 'jpeg', 'png', 'avif', 'tiff'],
  'image/gif': ['gif', 'webp', 'png', 'jpeg'],
  'image/bmp': ['bmp', 'png', 'jpeg', 'webp'],
  'image/x-icon': ['ico', 'png', 'webp'],
  'image/svg+xml': ['svg', 'png', 'webp', 'jpeg'],
  'image/tiff': ['tiff', 'png', 'jpeg', 'webp'],
  'image/avif': ['avif', 'webp', 'jpeg', 'png']
};

export function getCompatibleFormats(mimeType: string): ImageFormat[] {
  return MIME_TYPES[mimeType] || ['webp', 'jpeg', 'png'];
}

export async function convertAndCompressImage(
  file: File, 
  options: ConversionOptions
): Promise<Blob> {
  try {
    // Manejo especial para SVG
    if (file.type === 'image/svg+xml') {
      if (options.format === 'svg') {
        return file;
      }
      // Para convertir SVG a otros formatos, necesitamos renderizarlo primero
      const svgUrl = URL.createObjectURL(file);
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = svgUrl;
      });
      URL.revokeObjectURL(svgUrl);
    }

    // Compresión inicial de la imagen
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 2,
      maxWidthOrHeight: Math.max(options.maxWidth, options.maxHeight),
      useWebWorker: true,
      initialQuality: options.quality / 100,
    });

    // Advertencias para formatos especiales
    const specialFormats = ['ico', 'tiff', 'avif'];
    if (specialFormats.includes(options.format)) {
      console.warn(`El formato ${options.format.toUpperCase()} puede tener limitaciones de compatibilidad en algunos navegadores`);
    }

    // Conversión de formato
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        const aspectRatio = width / height;

        // Ajuste de dimensiones manteniendo proporción
        if (width > options.maxWidth) {
          width = options.maxWidth;
          height = width / aspectRatio;
        }
        if (height > options.maxHeight) {
          height = options.maxHeight;
          width = height * aspectRatio;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        
        if (!ctx) {
          reject(new Error('No se pudo obtener el contexto del canvas'));
          return;
        }

        // Configuración especial para ICO (fondo transparente)
        if (options.format === 'ico') {
          ctx.clearRect(0, 0, width, height);
        }

        // Aplicar la imagen al canvas
        ctx.drawImage(img, 0, 0, width, height);
        
        // Determinar el tipo MIME correcto
        const mimeTypes: Record<ImageFormat, string> = {
          webp: 'image/webp',
          jpeg: 'image/jpeg',
          png: 'image/png',
          gif: 'image/gif',
          bmp: 'image/bmp',
          ico: 'image/x-icon',
          svg: 'image/svg+xml',
          tiff: 'image/tiff',
          avif: 'image/avif'
        };

        const mimeType = mimeTypes[options.format];
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error(`No se pudo convertir a ${options.format.toUpperCase()}`));
            }
          },
          mimeType,
          options.quality / 100
        );
      };
      img.onerror = () => reject(new Error('Error al cargar la imagen'));
      img.src = URL.createObjectURL(compressedFile);
    });
  } catch (error) {
    console.error('Error al procesar la imagen:', error);
    throw error;
  }
}