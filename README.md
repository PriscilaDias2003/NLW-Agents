# NLW Agents

Projeto desenvolvido durante o evento **NLW (Next Level Week)** da Rocketseat, focado na criação de um sistema de agentes inteligentes para responder perguntas durante lives de forma eficiente e contextualizada.

## 🚀 Sobre o Projeto

O **NLW Agents** é uma aplicação web completa que integra com a **Inteligência Artificial Gemini** para criar agentes especializados que podem responder perguntas durante transmissões ao vivo. O sistema permite:

- **Criar salas de aula** para organizar conteúdo
- **Fazer upload de áudio** de aulas/lives
- **Transcrever automaticamente** o áudio usando IA
- **Gerar embeddings** para busca semântica
- **Responder perguntas** baseadas no contexto da aula
- **Interface moderna** com React 19 e Tailwind CSS

## 🛠️ Tecnologias Utilizadas

### Backend
- **Fastify** - Framework web rápido para Node.js
- **Drizzle ORM** - ORM TypeScript-first para PostgreSQL
- **PostgreSQL** - Banco de dados relacional com extensão pgvector
- **Google Gemini AI** - API de IA para transcrição e geração de respostas
- **Zod** - Validação de schemas TypeScript
- **TypeScript** - Linguagem de programação tipada
- **Docker** - Containerização do banco de dados

### Frontend
- **React 19** - Biblioteca para interfaces de usuário
- **Vite** - Build tool e dev server
- **Tailwind CSS 4** - Framework CSS utilitário
- **React Router DOM** - Roteamento para React
- **TanStack Query** - Gerenciamento de estado do servidor
- **Radix UI** - Componentes de interface acessíveis
- **React Hook Form** - Gerenciamento de formulários
- **Lucide React** - Ícones
- **Day.js** - Manipulação de datas

### Ferramentas de Desenvolvimento
- **Biome** - Linter e formatter
- **Docker Compose** - Orquestração de containers
- **Drizzle Kit** - Ferramentas para migrações e seeds
- **TypeScript** - Tipagem estática

## 🏗️ Arquitetura do Projeto

### Padrões Utilizados
- **Monorepo** - Estrutura com frontend e backend separados
- **Clean Architecture** - Separação clara entre camadas
- **Type-Safe APIs** - Validação de tipos com Zod
- **Database-First** - Schema-first com Drizzle ORM
- **Component-Based UI** - Componentes reutilizáveis com Radix UI
- **Vector Search** - Busca semântica com embeddings

### Estrutura de Pastas Atualizada
```
nwl/
├── server/                    # Backend Fastify + PostgreSQL
│   ├── src/
│   │   ├── db/               # Configuração do banco e schemas
│   │   │   ├── connection.ts # Conexão com PostgreSQL
│   │   │   ├── migrations/   # Migrações do banco
│   │   │   ├── schema/       # Schemas das tabelas
│   │   │   └── seed.ts       # Dados iniciais
│   │   ├── http/             # Rotas e handlers
│   │   │   ├── routes/       # Endpoints da API
│   │   │   └── client.http   # Testes da API
│   │   ├── services/         # Serviços externos
│   │   │   └── gemini.ts     # Integração com Gemini AI
│   │   ├── env.ts            # Configuração de ambiente
│   │   └── server.ts         # Servidor principal
│   ├── docker/               # Configuração Docker
│   ├── drizzle.config.ts     # Configuração Drizzle
│   └── package.json
└── web/                      # Frontend React + Vite
    ├── src/
    │   ├── components/       # Componentes reutilizáveis
    │   │   ├── ui/           # Componentes base (Radix UI)
    │   ├── pages/            # Páginas da aplicação
    │   ├── http/             # Cliente HTTP e tipos
    │   │   ├── types/        # Tipos TypeScript
    │   ├── lib/              # Utilitários
    │   │   ├── dayjs.ts      # Configuração de datas
    │   │   └── utils.ts      # Funções utilitárias
    │   ├── app.tsx           # Componente principal
    │   ├── main.tsx          # Entry point
    │   └── index.css         # Estilos globais
    ├── public/               # Assets estáticos
    ├── package.json
    └── vite.config.ts
```

## 🤖 Integração com Gemini AI

O projeto implementa uma integração completa com a **API do Google Gemini**, oferecendo três funcionalidades principais:

### 1. Transcrição de Áudio
```typescript
// Transcreve áudio para texto em português
export async function transcribeAudio(audioAsBase64: string, mimeType: string)
```
- Utiliza o modelo `gemini-2.5-flash`
- Processa áudio em base64
- Retorna transcrição natural em português
- Mantém pontuação e estrutura adequada

### 2. Geração de Embeddings
```typescript
// Gera embeddings para busca semântica
export async function generateEmbeddings(text: string)
```
- Usa o modelo `text-embedding-004`
- Gera vetores de 768 dimensões
- Otimizado para tarefas de recuperação de documentos
- Armazenado no PostgreSQL com extensão pgvector

### 3. Geração de Respostas
```typescript
// Gera respostas baseadas no contexto da aula
export async function generateAnswer(question: string, transcription: string[])
```
- Analisa o contexto completo da aula
- Responde apenas com informações do contexto
- Mantém tom educativo e profissional
- Cita trechos relevantes quando apropriado

## 🗄️ Modelo de Dados

### Tabelas Principais

#### Rooms (Salas)
```sql
- id: UUID (Primary Key)
- name: TEXT (Nome da sala)
- description: TEXT (Descrição opcional)
- createdAt: TIMESTAMP
```

#### AudioChunks (Chunks de Áudio)
```sql
- id: UUID (Primary Key)
- roomId: UUID (Foreign Key para Rooms)
- transcription: TEXT (Texto transcrito)
- embbedings: VECTOR(768) (Embeddings para busca semântica)
- createdAt: TIMESTAMP
```

#### Questions (Perguntas)
```sql
- id: UUID (Primary Key)
- roomId: UUID (Foreign Key para Rooms)
- question: TEXT (Pergunta do usuário)
- answer: TEXT (Resposta gerada pela IA)
- createdAt: TIMESTAMP
```

## ⚙️ Configuração e Setup

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- Git
- Chave da API do Google Gemini

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
# Editar .env com suas configurações:
# - GEMINI_API_KEY=sua_chave_do_gemini
# - DATABASE_URL=postgresql://user:pass@localhost:5432/nwl

# Iniciar banco de dados
docker-compose up -d

# Executar migrações
npm run db:migrate

# Executar seeds (opcional)
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
- **Drizzle Studio**: http://localhost:4983 (npm run db:studio)

## 🔧 Scripts Disponíveis

### Backend (server/)
- `npm run dev` - Servidor de desenvolvimento com hot reload
- `npm run start` - Servidor de produção
- `npm run db:generate` - Gerar migrações
- `npm run db:migrate` - Executar migrações
- `npm run db:seed` - Executar seeds do banco
- `npm run db:studio` - Abrir Drizzle Studio

### Frontend (web/)
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build

## 🎯 Funcionalidades Implementadas

### ✅ Backend
- [x] API REST com Fastify
- [x] Integração completa com Gemini AI
- [x] Upload e processamento de áudio
- [x] Transcrição automática
- [x] Geração de embeddings
- [x] Sistema de perguntas e respostas
- [x] Banco PostgreSQL com pgvector
- [x] Migrações automáticas com Drizzle
- [x] Validação de schemas com Zod
- [x] Containerização com Docker

### ✅ Frontend
- [x] Interface moderna com React 19
- [x] Roteamento com React Router
- [x] Gerenciamento de estado com TanStack Query
- [x] Componentes acessíveis com Radix UI
- [x] Formulários com React Hook Form
- [x] Estilização com Tailwind CSS 4
- [x] Upload de arquivos de áudio
- [x] Listagem de salas e perguntas
- [x] Interface responsiva

## 📚 Aprendizados e Conquistas

### 🎓 Tecnologias Dominadas
- **Fastify**: Framework web performático para Node.js
- **Drizzle ORM**: ORM moderno com TypeScript-first
- **PostgreSQL + pgvector**: Banco relacional com suporte a vetores
- **Google Gemini AI**: Integração com IA para processamento de áudio e texto
- **React 19**: Versão mais recente do React com melhorias de performance
- **TanStack Query**: Gerenciamento eficiente de estado do servidor
- **Radix UI**: Componentes acessíveis e customizáveis
- **Tailwind CSS 4**: Framework CSS com novas funcionalidades

### 🏗️ Arquitetura e Padrões
- **Monorepo**: Organização eficiente de projetos full-stack
- **Type Safety**: Tipagem completa com TypeScript
- **API Design**: REST APIs bem estruturadas
- **Database Design**: Schema-first com migrações automáticas
- **Component Architecture**: Componentes reutilizáveis e modulares
- **State Management**: Gerenciamento eficiente de estado

### 🤖 Inteligência Artificial
- **Audio Processing**: Processamento e transcrição de áudio
- **Vector Search**: Busca semântica com embeddings
- **Context-Aware Responses**: Respostas baseadas em contexto
- **AI Integration**: Integração robusta com APIs de IA

### 🛠️ Ferramentas e DevOps
- **Docker**: Containerização para desenvolvimento
- **Biome**: Linting e formatação de código
- **Drizzle Kit**: Ferramentas para gerenciamento de banco
- **Vite**: Build tool moderno e rápido

---

**Desenvolvido com ❤️ durante o NLW Agents da Rocketseat**
