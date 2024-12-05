import React from 'react';
import { Github, Linkedin, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full py-8 mt-12 border-t border-border/40 bg-card">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://lucke.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span>lucke.cl</span>
            </a>
            <a
              href="https://github.com/Lucke514"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/lucas-gonzalez-espinosa-073bba248"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Desarrollado por Lucas González
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Herramienta gratuita para la conversión y compresión de imágenes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}