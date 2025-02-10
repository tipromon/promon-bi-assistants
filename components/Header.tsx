import React from 'react';
import { motion } from 'framer-motion';
import { ShinyText } from './ShinyText';
import Image from 'next/image';

export function Header() {
  return (
    <motion.header
      className="w-full h-20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b flex flex-col items-center justify-center shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-2 py-2">
        <div className="w-32 h-8 relative">
          <Image
            src="https://raw.githubusercontent.com/tipromon/bi/main/LOGO-COLORIDO-%E2%80%93-FUNDO-BRANCO.png"
            alt="Promon Logo"
            width={128}
            height={32}
            className="object-contain"
            priority
          />
        </div>
        <ShinyText 
          text="Assistentes Inteligência de Mercado" 
          className="text-xl font-bold text-blue-900"
        />
      </div>
    </motion.header>
  );
}