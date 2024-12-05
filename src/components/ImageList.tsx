import React from 'react';
import { ImageListItem } from './ImageListItem';
import { ProcessedImage } from '../types';

interface ImageListProps {
  images: ProcessedImage[];
  onRemove: (id: string) => void;
}

export function ImageList({ images, onRemove }: ImageListProps) {
  return (
    <div className="space-y-2 max-h-[500px] overflow-y-auto p-2">
      {images.map((image) => (
        <ImageListItem
          key={image.id}
          image={image}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}