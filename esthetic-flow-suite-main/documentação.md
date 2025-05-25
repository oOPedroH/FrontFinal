# Documentação do Projeto: Sistema de Agendamento para Estética - Realle

## Sumário

1. Visão Geral
2. Estrutura do Projeto
3. Tecnologias Utilizadas
4. Funcionalidades Principais
5. Organização do Código
6. Fluxo de Dados e Integração com o Banco (Supabase)
7. Como Rodar o Projeto
8. Upload e Exibição de Imagens
9. Autenticação e Painel Administrativo
10. Dicas para Deploy e Customização

---

## 1. Visão Geral

O Realle é um sistema web para clínicas de estética e salões de beleza, permitindo agendamento online de serviços, gerenciamento de clientes, agenda, serviços e configurações administrativas. Possui área do cliente e painel administrativo.

---

## 2. Estrutura do Projeto

```
esthetic-flow-suite/
│
├── public/                # Arquivos estáticos (imagens, favicon, etc)
├── src/                   # Código-fonte principal
│   ├── components/        # Componentes reutilizáveis (Navbar, Footer, etc)
│   ├── pages/             # Páginas principais (Index, Login, Admin, etc)
│   ├── lib/               # Funções utilitárias, integração com API e banco
│   ├── integrations/      # Tipos e integrações externas (ex: Supabase)
│   └── ...                # Outros diretórios auxiliares
├── supabase/              # Configurações e scripts do Supabase
├── package.json           # Dependências e scripts do projeto
├── tailwind.config.ts     # Configuração do Tailwind CSS
├── vite.config.ts         # Configuração do Vite
└── README.md              # Documentação do projeto
```

---

## 3. Tecnologias Utilizadas

- **React + TypeScript**: Frontend moderno e tipado.
- **Vite**: Bundler rápido para desenvolvimento.
- **Tailwind CSS**: Estilização rápida e responsiva.
- **Supabase**: Backend as a Service (banco de dados, autenticação, storage).
- **React Router**: Navegação entre páginas.
- **ESLint/Prettier**: Padronização de código.

---

## 4. Funcionalidades Principais

### Área do Cliente
- Visualização de serviços e detalhes
- Agendamento online com verificação de disponibilidade
- Página inicial, sobre, contato

### Painel Administrativo
- Dashboard com estatísticas
- Gerenciamento de agenda, clientes e serviços
- Upload de imagens para serviços
- Configurações do sistema

---

## 5. Organização do Código

### Componentes
- **Navbar/Footer**: Navegação e rodapé presentes em todas as páginas.
- **HeroSection**: Banner principal da home.
- **ServiceCategoryTabs**: Filtros de serviços por categoria.
- **BeforeAfterGallery**: Galeria de resultados antes/depois.
- **ServiceImageUpload**: Upload de imagens para serviços (admin).

### Páginas
- **Index.tsx**: Página inicial, exibe serviços em destaque.
- **Login.tsx**: Tela de login para administradores.
- **Admin/**: Páginas do painel administrativo (dashboard, agenda, clientes, serviços, configurações).
- **ServiceDetail.tsx**: Detalhes de um serviço específico.

### Utilitários e Integrações
- **lib/api.ts**: Funções para consumir a API (listar, criar, editar, deletar serviços, clientes, etc).
- **lib/authService.ts**: Lida com autenticação de usuários.
- **integrations/supabase/**: Tipos e funções para integração com Supabase.

---

## 6. Fluxo de Dados e Integração com o Banco (Supabase)

### Estrutura do Banco (Supabase)
- **servicos**: Tabela de serviços (id, titulo, descricao, preco, duracao, imagem_url, destaque, etc)
- **clientes**: Tabela de clientes
- **agendamentos**: Tabela de agendamentos
- **imagens_antes_depois**: Tabela para galeria de resultados
- **users**: Usuários administrativos

### Conexão com o Supabase

- O projeto utiliza o SDK do Supabase para autenticação, CRUD e upload de arquivos.
- As funções de API (em `lib/api.ts`) usam o cliente do Supabase para buscar, criar, editar e deletar registros.
- Para upload de imagens, utiliza-se o Supabase Storage, salvando a URL pública no campo `imagem_url` do serviço.

**Exemplo de uso:**
```ts
import { supabase } from "@/lib/supabaseClient";

// Buscar serviços
const { data, error } = await supabase.from('servicos').select('*');

// Upload de imagem
const { data, error } = await supabase.storage
  .from('servicos')
  .upload(`imagens/${file.name}`, file);
```

---

## 7. Como Rodar o Projeto

1. **Pré-requisitos**: Node.js 18+, npm ou yarn.
2. **Instale as dependências**:
   ```bash
   npm install
   ```
3. **Configure o Supabase**:
   - Crie um projeto no [Supabase](https://supabase.com/).
   - Configure as variáveis de ambiente com as chaves do Supabase (`.env`).
4. **Rode o projeto**:
   ```bash
   npm run dev
   ```
5. **Acesse**: [http://localhost:5173](http://localhost:5173)

---

## 8. Upload e Exibição de Imagens

- O upload de imagens de serviços é feito pelo painel admin, usando o componente `ServiceImageUpload`.
- A imagem é enviada ao Supabase Storage e a URL pública é salva no campo `imagem_url` do serviço.
- Na home e listagem de serviços, a imagem é exibida usando esse campo. Se estiver vazio, mostra uma imagem padrão.

---

## 9. Autenticação e Painel Administrativo

- O login é feito via Supabase Auth.
- Usuários administrativos acessam o painel via `/login` com as credenciais fornecidas.
- Após login, podem gerenciar agenda, clientes, serviços e configurações.

---

## 10. Dicas para Deploy e Customização

- Para deploy, use plataformas como Vercel, Netlify ou o próprio Supabase Hosting.
- Certifique-se de configurar as variáveis de ambiente de produção.
- Personalize o tema facilmente editando o Tailwind e as imagens em `public/assets` ou `public/lovable-uploads`.

---

## Dúvidas Frequentes

- **Imagens não aparecem?**  
  Verifique se o campo `imagem_url` está preenchido corretamente e se a imagem existe no Supabase Storage.

- **Erro de autenticação?**  
  Confira as chaves do Supabase e as permissões das tabelas.

---

Caso precise de mais detalhes sobre algum ponto específico, consulte o código-fonte ou entre em contato com o desenvolvedor responsável. 