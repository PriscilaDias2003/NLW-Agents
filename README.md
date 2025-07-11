# NLW Agents

Projeto desenvolvido durante o evento **NLW (Next Level Week)** da Rocketseat, focado na criação de um sistema de agentes inteligentes para responder perguntas durante lives de forma eficiente e contextualizada.

## 🚀 Sobre o Projeto

O **NLW Agents** é uma aplicação web que integra com a **Inteligência Artificial Gemini** para criar agentes especializados que podem responder perguntas durante transmissões ao vivo. O sistema permite criar salas de chat onde o agente AI pode interagir com os participantes, fornecendo respostas precisas e contextualizadas.

## 🛠️ Tecnologias Utilizadas

### Backend
- **Fastify** - Framework web rápido para Node.js
- **Drizzle ORM** - ORM TypeScript-first para PostgreSQL
- **PostgreSQL** - Banco de dados relacional com extensão pgvector
- **Zod** - Validação de schemas TypeScript
- **TypeScript** - Linguagem de programação tipada

### Frontend
- **React 19** - Biblioteca para interfaces de usuário
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **React Router DOM** - Roteamento para React
- **TanStack Query** - Gerenciamento de estado do servidor
- **Radix UI** - Componentes de interface acessíveis
- **Lucide React** - Ícones

### Ferramentas de Desenvolvimento
- **Biome** - Linter e formatter
- **Docker** - Containerização
- **Drizzle Kit** - Ferramentas para migrações e seeds

## 🏗️ Arquitetura do Projeto

### Padrões Utilizados
- **Monorepo** - Estrutura com frontend e backend separados
- **Clean Architecture** - Separação clara entre camadas
- **Type-Safe APIs** - Validação de tipos com Zod
- **Database-First** - Schema-first com Drizzle ORM
- **Component-Based UI** - Componentes reutilizáveis com Radix UI

### Estrutura de Pastas
```
nwl/
├── server/          # Backend Fastify + PostgreSQL
│   ├── src/
│   │   ├── db/      # Configuração do banco e schemas
│   │   ├── http/    # Rotas e handlers
│   │   └── server.ts
│   └── docker/      # Configuração Docker
└── web/             # Frontend React + Vite
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── lib/
    └── public/
```

## ⚙️ Configuração e Setup

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- Git

### 1. Clone o repositório
```bash
git clone https://github.com/PriscilaDias2003/NWL-Agents.git
cd nwl
```

### 2. Configuração do Backend
```bash
cd server

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações

# Iniciar banco de dados
docker-compose up -d

# Executar migrações
npm run db:seed

# Iniciar servidor de desenvolvimento
npm run dev
```

### 3. Configuração do Frontend
```bash
cd web

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### 4. Acessar a aplicação
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3333
- **Database**: localhost:5432

## 🔧 Scripts Disponíveis

### Backend (server/)
- `npm run dev` - Servidor de desenvolvimento
- `npm run start` - Servidor de produção
- `npm run db:seed` - Executar seeds do banco

### Frontend (web/)
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build

## 🤖 Integração com IA

O projeto está preparado para integração com a **API do Google Gemini**, permitindo que os agentes:
- Respondam perguntas em tempo real durante lives
- Mantenham contexto das conversas
- Forneçam respostas precisas e relevantes
- Aprendam com as interações anteriores
