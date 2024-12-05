import React from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  onRemove: () => void;
}

export function ImagePreview({ imageUrl, onRemove }: ImagePreviewProps) {
  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt="Preview"
        className="max-w-full h-auto rounded-lg shadow-lg"
      />
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}