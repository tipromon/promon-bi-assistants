export interface AgentConfig {
  chatflowid: string;
  welcomeMessage: string;
  title: string;
}

export const agents: Record<string, AgentConfig> = {
  "Assistente BI - Acciona": {
    chatflowid: process.env.NEXT_PUBLIC_ACCIONA_CHATFLOW_ID || "id_padrao_acciona",
    welcomeMessage: "Bem-vindo ao Assistente Acciona! Estou aqui para ajudar com informações sobre a empresa Acciona.",
    title: "Assistente BI - Acciona"
  },
  "Mineração e Fertilizantes": {
    chatflowid: process.env.NEXT_PUBLIC_MINERACAO_CHATFLOW_ID || "id_padrao_mineracao",
    welcomeMessage: "Bem-vindo ao Assistente de Mineração e Fertilizantes! Como posso ajudar?",
    title: "Mineração e Fertilizantes"
  },
  "SAF (Sustainable Aviation Fuel)": {
    chatflowid: process.env.NEXT_PUBLIC_SAF_CHATFLOW_ID || "id_padrao_saf",
    welcomeMessage: "Bem-vindo ao Assistente SAF! Estou aqui para ajudar com informações sobre Sustainable Aviation Fuel.",
    title: "SAF (Sustainable Aviation Fuel)"
  },
  "Assistente BI - VALE": {
    chatflowid: process.env.NEXT_PUBLIC_VALE_CHATFLOW_ID || "5b498ae0-3a88-4b7e-9382-1c13319b081c",
    welcomeMessage: "Bem-vindo ao Assistente VALE! Estou aqui para ajudar com informações sobre a VALE.",
    title: "Assistente BI - VALE"
  },
  "Assistente BI - Hydro": {
    chatflowid: process.env.NEXT_PUBLIC_HYDRO_CHATFLOW_ID || "3baf72f3-c498-4f1b-b669-59beb6583d46",
    welcomeMessage: "Bem-vindo ao Assistente Hydro! Estou aqui para ajudar com informações sobre a Hydro.",
    title: "Assistente BI - Hydro"
  }
};