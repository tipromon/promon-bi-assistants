import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { agents } from '@/config/agents';
import Image from 'next/image';

interface SidebarProps {
  onAgentSelect: (agentName: string) => void;
  onCollapse: (collapsed: boolean) => void;
}

export function Sidebar({ onAgentSelect, onCollapse }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(Object.keys(agents)[0]);

  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    onCollapse(collapsed);
  };

  const handleAgentSelect = (agentName: string) => {
    setSelectedAgent(agentName);
    onAgentSelect(agentName);
  };

  return (
    <motion.div
      className={`fixed left-0 top-0 h-screen bg-background border-r transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={() => handleCollapse(!isCollapsed)}
        className="absolute -right-4 top-8 bg-white border shadow-md rounded-full p-2 hover:bg-gray-50 transition-colors duration-200 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isCollapsed ? (
          <ChevronRight size={16} className="text-gray-600 group-hover:text-blue-600" />
        ) : (
          <ChevronLeft size={16} className="text-gray-600 group-hover:text-blue-600" />
        )}
      </motion.button>

      <div className="p-4 space-y-4">
        <div className={`flex justify-center mb-6 ${isCollapsed ? 'scale-75' : ''}`}>
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
        </div>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg font-semibold mb-4 text-gray-700"
            >
              Assistentes
            </motion.h2>
          )}
        </AnimatePresence>

        <nav className="space-y-2">
          {Object.keys(agents).map((agentName, index) => (
            <motion.button
              key={agentName}
              onClick={() => handleAgentSelect(agentName)}
              className={`w-full text-left p-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-2
                ${selectedAgent === agentName 
                  ? index % 2 === 0 
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  : 'text-gray-600 hover:bg-gray-100'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle 
                size={isCollapsed ? 20 : 16} 
                className={index % 2 === 0 ? 'text-blue-500' : 'text-orange-500'} 
              />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="truncate"
                  >
                    {agentName}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}
