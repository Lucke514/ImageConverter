import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export function Header({ theme, onThemeChange }: HeaderProps) {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <ImageIcon className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">Compress Image</span>
          </div>
          <ThemeToggle theme={theme} onChange={onThemeChange} />
        </div>
      </div>
    </header>
  );
}