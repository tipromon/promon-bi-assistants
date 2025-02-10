# Promon BI - Assistentes de Inteligência de Mercado

Interface web para os assistentes de inteligência de mercado da Promon, desenvolvida com Next.js.

## Tecnologias Utilizadas

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Flowise AI

## Pré-requisitos

- Node.js 20.x ou superior
- npm ou yarn

## Configuração do Ambiente

1. Clone o repositório
```bash
git clone [URL_DO_REPOSITÓRIO]
cd [NOME_DO_REPOSITÓRIO]
```

2. Instale as dependências
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente
- Copie o arquivo `.env.example` para `.env.local`
- Preencha as variáveis com os valores apropriados

4. Execute o projeto em desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

5. Para build de produção
```bash
npm run build
# ou
yarn build
```

## Estrutura do Projeto

- `/app` - Páginas e layouts da aplicação
- `/components` - Componentes React reutilizáveis
- `/config` - Arquivos de configuração
- `/public` - Arquivos estáticos

## Deploy

Este projeto está configurado para deploy na Vercel. O deploy é feito automaticamente a partir da branch principal.

## Variáveis de Ambiente Necessárias

- `NEXT_PUBLIC_FLOWISE_URL`: URL base da API Flowise
- `NEXT_PUBLIC_ACCIONA_CHATFLOW_ID`: ID do fluxo de chat da Acciona
- `NEXT_PUBLIC_MINERACAO_CHATFLOW_ID`: ID do fluxo de chat de Mineração
- `NEXT_PUBLIC_SAF_CHATFLOW_ID`: ID do fluxo de chat SAF
- `NEXT_PUBLIC_VALE_CHATFLOW_ID`: ID do fluxo de chat da VALE
- `NEXT_PUBLIC_HYDRO_CHATFLOW_ID`: ID do fluxo de chat da Hydro 