import React, { useEffect, useState } from 'react';
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
    initialMessages: {
      message: string;
      type: 'user' | 'bot';
    }[];
  };
}

interface FlowiseProps {
  chatflowid: string;
  apiHost?: string;
  theme?: ChatWindowTheme;
  onUserMessage?: (message: string) => void;
  onBotResponse?: (response: string) => void;
  initialMessages?: Array<{message: string, type: 'user' | 'bot'}>;
}

const FullPageChat = dynamic<FlowiseProps>(
  () => import('flowise-embed-react').then((mod) => mod.FullPageChat),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse text-blue-600">Carregando chat...</div>
      </div>
    )
  }
);

interface ChatEmbedProps {
  agent: {
    chatflowid: string;
    welcomeMessage: string;
    title: string;
  };
}

interface ChatMessage {
  type: 'user' | 'bot';
  message: string;
  timestamp: number;
}

declare global {
  interface Window {
    Chatbot: {
      init: (config: any) => void;
    };
  }
}

export function ChatEmbed({ agent }: ChatEmbedProps) {
  const apiHost = process.env.NEXT_PUBLIC_FLOWISE_URL;
  const [chatKey, setChatKey] = useState(agent.chatflowid);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const MAX_MESSAGES = 50;

  // Carregar histórico quando mudar de agente
  useEffect(() => {
    const savedHistory = localStorage.getItem(`chat_history_${agent.chatflowid}`);
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setChatHistory(parsedHistory);
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      }
    }
    setChatKey(agent.chatflowid);
  }, [agent.chatflowid]);

  // Função para salvar mensagens no histórico
  const handleMessageSent = (message: string) => {
    const newMessage: ChatMessage = {
      type: 'user',
      message,
      timestamp: Date.now()
    };
    
    const updatedHistory = [...chatHistory, newMessage];
    setChatHistory(updatedHistory);
    saveToHistory(updatedHistory);
  };

  // Função para salvar respostas do bot
  const handleBotResponse = (response: string) => {
    const newMessage: ChatMessage = {
      type: 'bot',
      message: response,
      timestamp: Date.now()
    };
    
    const updatedHistory = [...chatHistory, newMessage];
    setChatHistory(updatedHistory);
    saveToHistory(updatedHistory);
  };

  const saveToHistory = (messages: ChatMessage[]) => {
    // Se atingir o limite, limpa todo o histórico
    if (messages.length >= MAX_MESSAGES) {
      localStorage.removeItem(`chat_history_${agent.chatflowid}`);
      setChatHistory([]);
      // Força a recriação do componente do chat
      setChatKey(Date.now().toString());
      return;
    }
    
    const limitedMessages = messages.slice(-MAX_MESSAGES);
    localStorage.setItem(`chat_history_${agent.chatflowid}`, JSON.stringify(limitedMessages));
    setChatHistory(limitedMessages);
  };

  useEffect(() => {
    // Log para debug
    console.log('API Host:', apiHost);
    console.log('Chatflow ID:', agent.chatflowid);
    
    // Verificar se a URL da API está correta
    if (apiHost?.includes('localhost')) {
      console.warn('Atenção: API está configurada para localhost');
    }
  }, [agent.chatflowid, apiHost]);

  if (!apiHost) {
    console.error('NEXT_PUBLIC_FLOWISE_URL não está definida');
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-600">Erro: API URL não configurada</div>
      </div>
    );
  }

  // Garantir que a URL da API está no formato correto
  const formattedApiHost = apiHost.endsWith('/') ? apiHost.slice(0, -1) : apiHost;

  return (
    <div className="w-full h-full">
      <FullPageChat
        key={chatKey}
        chatflowid={agent.chatflowid}
        apiHost={formattedApiHost}
        theme={{
          chatWindow: {
            showTitle: true,
            title: agent.title,
            welcomeMessage: agent.welcomeMessage,
            backgroundColor: '#ffffff',
            height: '100%',
            width: '100%',
            fontSize: 16,
            clearChatOnReload: true,
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
              sendMessageSound: false,
              receiveMessageSound: false,
            },
            feedback: {
              color: '#303235',
            },
            footer: {
              textColor: '#303235',
              text: 'Powered by',
              company: 'Flowise',
              companyLink: 'https://flowiseai.com',
            },
            initialMessages: chatHistory.map(msg => ({
              message: msg.message,
              type: msg.type
            }))
          }
        }}
        onUserMessage={handleMessageSent}
        onBotResponse={handleBotResponse}
      />
    </div>
  );
} 