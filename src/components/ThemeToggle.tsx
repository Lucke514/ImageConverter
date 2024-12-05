import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onChange: (theme: 'light' | 'dark') => void;
}

export function ThemeToggle({ theme, onChange }: ThemeToggleProps) {
  return (
    <button
      onClick={() => onChange(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
      title={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-secondary-foreground" />
      ) : (
        <Sun className="w-5 h-5 text-secondary-foreground" />
      )}
    </button>
  );
}