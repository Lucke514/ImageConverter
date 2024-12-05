import React, { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';
import { ImageFormat, ConversionOptions } from '../types';
import { getCompatibleFormats } from '../utils/imageCompression';

interface ConversionOptionsProps {
  options: ConversionOptions;
  onChange: (options: ConversionOptions) => void;
  selectedFile?: File;
}

export function ConversionOptionsPanel({ options, onChange, selectedFile }: ConversionOptionsProps) {
  const [availableFormats, setAvailableFormats] = useState<ImageFormat[]>([]);

  useEffect(() => {
    if (selectedFile) {
      const formats = getCompatibleFormats(selectedFile.type);
      setAvailableFormats(formats);
      if (!formats.includes(options.format)) {
        onChange({ ...options, format: formats[0] });
      }
    } else {
      setAvailableFormats(['webp', 'jpeg', 'png', 'gif', 'bmp', 'ico', 'svg', 'tiff', 'avif']);
    }
  }, [selectedFile, options.format, onChange]);

  const getFormatLabel = (format: ImageFormat): string => {
    const labels: Record<ImageFormat, string> = {
      webp: 'WebP (Mejor compresión)',
      jpeg: 'JPEG (Compatible)',
      png: 'PNG (Sin pérdida)',
      gif: 'GIF (Animaciones)',
      bmp: 'BMP (Sin compresión)',
      ico: 'ICO (Favicon)',
      svg: 'SVG (Vectorial)',
      tiff: 'TIFF (Alta calidad)',
      avif: 'AVIF (Nueva generación)'
    };
    return labels[format];
  };

  return (
    <aside 
      className="bg-card rounded-lg shadow-sm border"
      role="complementary"
      aria-labelledby="options-title"
    >
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" aria-hidden="true" />
          <h2 id="options-title" className="text-lg font-semibold">
            Opciones de Conversión
          </h2>
        </div>
      </div>
      
      <form className="p-4 space-y-4">
        <div role="group" aria-labelledby="format-label">
          <label id="format-label" className="block text-sm font-medium mb-1">
            Formato de Salida
          </label>
          <select
            value={options.format}
            onChange={(e) => onChange({ ...options, format: e.target.value as ImageFormat })}
            className="w-full px-3 py-2 bg-background border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            aria-describedby="format-help"
          >
            {availableFormats.map((format) => (
              <option key={format} value={format}>
                {getFormatLabel(format)}
              </option>
            ))}
          </select>
          <p id="format-help" className="text-xs text-muted-foreground mt-1">
            {selectedFile ? 
              `Convirtiendo desde: ${selectedFile.type.split('/')[1].toUpperCase()}` :
              'Selecciona una imagen para ver los formatos disponibles'}
          </p>
        </div>

        <div role="group" aria-labelledby="quality-label">
          <label id="quality-label" className="block text-sm font-medium mb-1">
            Calidad ({options.quality}%)
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={options.quality}
            onChange={(e) => onChange({ ...options, quality: Number(e.target.value) })}
            className="w-full accent-primary"
            aria-valuemin={1}
            aria-valuemax={100}
            aria-valuenow={options.quality}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div role="group" aria-labelledby="width-label">
            <label id="width-label" className="block text-sm font-medium mb-1">
              Ancho Máximo
            </label>
            <input
              type="number"
              value={options.maxWidth}
              onChange={(e) => onChange({ ...options, maxWidth: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-background border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              min="1"
              max="10000"
              aria-label="Ancho máximo en píxeles"
            />
          </div>
          <div role="group" aria-labelledby="height-label">
            <label id="height-label" className="block text-sm font-medium mb-1">
              Alto Máximo
            </label>
            <input
              type="number"
              value={options.maxHeight}
              onChange={(e) => onChange({ ...options, maxHeight: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-background border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              min="1"
              max="10000"
              aria-label="Alto máximo en píxeles"
            />
          </div>
        </div>
      </form>
    </aside>
  );
}