import React from 'react';
import { ImageIcon, Zap, Download, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function ProjectInfo() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-12 bg-accent">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center mb-6"
          >
            <ImageIcon className="w-16 h-16 text-primary" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Convertidor de Imágenes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Convierte y optimiza múltiples imágenes a diferentes formatos
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8 mt-12"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Zap className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Conversión Rápida</h3>
            <p className="text-muted-foreground">
              Procesa múltiples imágenes simultáneamente con alta velocidad
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <FileCheck className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Múltiples Formatos</h3>
            <p className="text-muted-foreground">
              Soporta PNG, JPEG, WebP, GIF, BMP, ICO, SVG, TIFF y AVIF
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Download className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Descarga en ZIP</h3>
            <p className="text-muted-foreground">
              Descarga todas tus imágenes convertidas en un archivo comprimido
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}