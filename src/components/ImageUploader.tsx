import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageUploaderProps {
  onImagesSelect: (files: File[]) => void;
}

export function ImageUploader({ onImagesSelect }: ImageUploaderProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files).filter(file => 
        file.type.startsWith('image/') || file.type === 'image/svg+xml'
      );
      if (files.length > 0) {
        onImagesSelect(files);
      }
    },
    [onImagesSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []).filter(file => 
        file.type.startsWith('image/') || file.type === 'image/svg+xml'
      );
      if (files.length > 0) {
        onImagesSelect(files);
      }
    },
    [onImagesSelect]
  );

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-full p-8 border-2 border-dashed border-muted rounded-lg bg-card hover:border-primary transition-all cursor-pointer hover:scale-[1.01]"
      aria-labelledby="upload-title"
      role="region"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <label 
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center space-y-4 cursor-pointer"
      >
        <motion.div 
          className="relative" 
          aria-hidden="true"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Upload className="w-16 h-16 text-primary" />
          <ImageIcon className="w-8 h-8 text-primary absolute -bottom-2 -right-2" />
        </motion.div>
        <div className="text-center">
          <motion.h2 
            id="upload-title" 
            className="text-xl font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Arrastra y suelta tus imágenes aquí
          </motion.h2>
          <motion.p 
            className="text-sm text-muted-foreground mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            o haz clic para seleccionar
          </motion.p>
          <motion.p 
            className="text-xs text-muted-foreground mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Soporta: PNG, JPEG, WebP, GIF, BMP, ICO, SVG, TIFF, AVIF
          </motion.p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="sr-only"
          accept="image/*,.svg"
          multiple
          onChange={handleFileInput}
          aria-label="Seleccionar imágenes para convertir"
        />
      </label>
    </motion.section>
  );
}