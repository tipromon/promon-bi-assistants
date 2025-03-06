'use client';

import React, { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ChatEmbed } from '@/components/ChatEmbed';
import { agents } from '@/config/agents';

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState(Object.keys(agents)[0]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleAgentSelect = useCallback((agentName: string) => {
    const cleanName = agentName.replace('#', '');
    if (agents[cleanName]) {
      setSelectedAgent(cleanName);
    }
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar 
        onAgentSelect={handleAgentSelect} 
        onCollapse={(collapsed) => setIsSidebarCollapsed(collapsed)}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <main className="flex-1 overflow-auto">
          <ChatEmbed 
            key={selectedAgent}
            agent={agents[selectedAgent]} 
          />
        </main>
      </div>
    </div>
  );
}