import React from 'react';
import dynamic from 'next/dynamic';
import type { AgentConfig } from '@/config/agents';

interface ChatWindowTheme {
  chatWindow: {
    showTitle: boolean;
    title: string;
    welcomeMessage: string;
    backgroundColor: string;
    height: string;
    width: string;
    fontSize: number;
    clearChatOnReload: boolean;
    botMessage: {
      backgroundColor: string;
      textColor: string;
      showAvatar: boolean;
    };
    userMessage: {
      backgroundColor: string;
      textColor: string;
      showAvatar: boolean;
    };
    textInput: {
      placeholder: string;
      backgroundColor: string;
      textColor: string;
      sendButtonColor: string;
      autoFocus: boolean;
      sendMessageSound: boolean;
      receiveMessageSound: boolean;
    };
    feedback: {
      color: string;
    };
    footer: {
      textColor: string;
      text: string;
      company: string;
      companyLink: string;
    };
  };
}

interface FlowiseProps {
  chatflowid: string;
  apiHost?: string;
  theme?: ChatWindowTheme;
}

const FullPageChat = dynamic<FlowiseProps>(
  () => import('flowise-embed-react').then((mod) => mod.FullPageChat),
  { ssr: false }
);

interface ChatEmbedProps {
  agent: {
    chatflowid: string;
    welcomeMessage: string;
    title: string;
  };
}

declare global {
  interface Window {
    Chatbot: {
      init: (config: any) => void;
    };
  }
}

export function ChatEmbed({ agent }: ChatEmbedProps) {
  return (
    <div className="w-full h-full">
      <FullPageChat
        chatflowid={agent.chatflowid}
        apiHost={process.env.NEXT_PUBLIC_FLOWISE_URL}
        theme={{
          chatWindow: {
            showTitle: true,
            title: agent.title,
            welcomeMessage: agent.welcomeMessage,
            backgroundColor: '#ffffff',
            height: '100%',
            width: '100%',
            fontSize: 16,
            clearChatOnReload: false,
            botMessage: {
              backgroundColor: '#f7f8ff',
              textColor: '#303235',
              showAvatar: true,
            },
            userMessage: {
              backgroundColor: '#3B81F6',
              textColor: '#ffffff',
              showAvatar: true,
            },
            textInput: {
              placeholder: 'Digite sua pergunta',
              backgroundColor: '#ffffff',
              textColor: '#303235',
              sendButtonColor: '#3B81F6',
              autoFocus: true,
              sendMessageSound: true,
              receiveMessageSound: true,
            },
            feedback: {
              color: '#303235',
            },
            footer: {
              textColor: '#303235',
              text: 'Powered by',
              company: 'Flowise',
              companyLink: 'https://flowiseai.com',
            }
          }
        }}
      />
    </div>
  );
} 