import React from 'react';
import { X, Check, Loader2, AlertCircle, FileImage } from 'lucide-react';
import { ProcessedImage } from '../types';
import { motion } from 'framer-motion';

interface ImageListItemProps {
  image: ProcessedImage;
  onRemove: (id: string) => void;
}

export function ImageListItem({ image, onRemove }: ImageListItemProps) {
  const getStatusIcon = () => {
    switch (image.status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-primary animate-spin" />;
      case 'completed':
        return <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusColor = () => {
    switch (image.status) {
      case 'pending':
        return 'bg-muted/50 border-muted';
      case 'processing':
        return 'bg-primary/10 border-primary/20';
      case 'completed':
        return 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900';
      case 'error':
        return 'bg-destructive/10 border-destructive/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      layout
      className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor()} transition-colors`}
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <FileImage className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        <span className="truncate text-sm">
          {image.originalFile.name}
        </span>
        <span className="text-xs text-muted-foreground flex-shrink-0">
          ({Math.round(image.originalFile.size / 1024)} KB)
        </span>
      </div>
      <div className="flex items-center space-x-3 flex-shrink-0">
        <motion.span 
          className="flex-shrink-0"
          animate={{ scale: [0.8, 1.2, 1] }}
          transition={{ duration: 0.3 }}
        >
          {getStatusIcon()}
        </motion.span>
        <motion.button
          onClick={() => onRemove(image.id)}
          className="p-1 hover:bg-muted rounded-full transition-colors"
          title="Eliminar imagen"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </motion.button>
      </div>
    </motion.div>
  );
}