import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ImageList } from './components/ImageList';
import { ConversionOptionsPanel } from './components/ConversionOptionsPanel';
import { Header } from './components/Header';
import { ProjectInfo } from './components/ProjectInfo';
import { Footer } from './components/Footer';
import { convertAndCompressImage } from './utils/imageCompression';
import { Download, Loader2 } from 'lucide-react';
import { ProcessedImage, ConversionOptions } from './types';
import { useTheme } from './hooks/useTheme';
import JSZip from 'jszip';

function App() {
  const { theme, setTheme } = useTheme();
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const [options, setOptions] = useState<ConversionOptions>({
    format: 'webp',
    quality: 80,
    maxWidth: 1920,
    maxHeight: 1080
  });

  const handleImagesSelect = useCallback((files: File[]) => {
    const newImages: ProcessedImage[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      originalFile: file,
      previewUrl: URL.createObjectURL(file),
      status: 'pending'
    }));
    setImages(prev => [...prev, ...newImages]);
    if (files.length > 0) {
      setSelectedImage(files[0]);
    }
  }, []);

  const handleRemoveImage = useCallback((id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.previewUrl);
      }
      const filteredImages = prev.filter(img => img.id !== id);
      if (filteredImages.length > 0) {
        setSelectedImage(filteredImages[0].originalFile);
      } else {
        setSelectedImage(undefined);
      }
      return filteredImages;
    });
  }, []);

  const processImages = useCallback(async () => {
    setIsProcessing(true);
    const zip = new JSZip();
    
    try {
      const convertedImages = await Promise.all(
        images.map(async (image) => {
          if (image.status === 'completed') return null;

          setImages(prev => 
            prev.map(img => 
              img.id === image.id ? { ...img, status: 'processing' } : img
            )
          );

          try {
            const convertedBlob = await convertAndCompressImage(
              image.originalFile,
              options
            );

            const fileName = `${image.originalFile.name.split('.')[0]}.${options.format}`;
            zip.file(fileName, convertedBlob);

            setImages(prev =>
              prev.map(img =>
                img.id === image.id ? { ...img, status: 'completed' } : img
              )
            );

            return { success: true, image };
          } catch (error) {
            setImages(prev =>
              prev.map(img =>
                img.id === image.id ? { ...img, status: 'error', error: String(error) } : img
              )
            );
            return { success: false, image, error };
          }
        })
      );

      if (convertedImages.some(result => result?.success)) {
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted_images.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } finally {
      setIsProcessing(false);
    }
  }, [images, options]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header theme={theme} onThemeChange={setTheme} />
      <ProjectInfo />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ImageUploader onImagesSelect={handleImagesSelect} />
            
            {images.length > 0 && (
              <div className="space-y-6">
                <div className="bg-card rounded-lg shadow-sm border">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">
                      Imágenes seleccionadas ({images.length})
                    </h2>
                  </div>
                  <ImageList
                    images={images}
                    onRemove={handleRemoveImage}
                  />
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={processImages}
                    disabled={isProcessing || images.length === 0}
                    className="flex items-center space-x-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Download className="w-5 h-5" />
                    )}
                    <span>
                      {isProcessing
                        ? 'Procesando imágenes...'
                        : 'Convertir y Descargar ZIP'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <ConversionOptionsPanel
              options={options}
              onChange={setOptions}
              selectedFile={selectedImage}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;