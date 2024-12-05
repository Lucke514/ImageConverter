import { useState, useCallback } from 'react';
import { ProcessedImage, ConversionOptions } from '../types';
import { convertAndCompressImage } from '../utils/imageCompression';
import JSZip from 'jszip';

export function useImageProcessing() {
  const [isProcessing, setIsProcessing] = useState(false);

  const processImages = useCallback(async (
    images: ProcessedImage[],
    options: ConversionOptions,
    onProgress?: (progress: number) => void
  ) => {
    setIsProcessing(true);
    const zip = new JSZip();
    
    try {
      const total = images.length;
      let completed = 0;

      const convertedImages = await Promise.all(
        images.map(async (image, index) => {
          if (image.status === 'completed') {
            completed++;
            onProgress?.(completed / total);
            return null;
          }

          try {
            const convertedBlob = await convertAndCompressImage(
              image.originalFile,
              options
            );

            const fileName = `${image.originalFile.name.split('.')[0]}.${options.format}`;
            zip.file(fileName, convertedBlob);

            completed++;
            onProgress?.(completed / total);

            return { success: true, image };
          } catch (error) {
            console.error(`Error processing image ${image.originalFile.name}:`, error);
            return { success: false, image, error };
          }
        })
      );

      if (convertedImages.some(result => result?.success)) {
        const zipBlob = await zip.generateAsync({ 
          type: 'blob',
          compression: 'DEFLATE',
          compressionOptions: { level: 9 }
        });

        return zipBlob;
      }

      throw new Error('No se pudo procesar ninguna imagen');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    isProcessing,
    processImages
  };
}