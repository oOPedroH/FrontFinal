
# Sistema de Agendamento para Estética - Realle

## Sobre o Projeto

O Sistema de Agendamento para Estética Realle é uma aplicação web completa para gerenciamento de clínicas de estética e salões de beleza. O sistema permite o agendamento online de serviços pelos clientes e oferece um painel administrativo completo para gestão de agendamentos, serviços e clientes.

## Recursos Principais

### Área do Cliente
- **Página Inicial**: Apresentação da empresa, destaques e promoções
- **Catálogo de Serviços**: Listagem de todos os serviços disponíveis, organizados por categoria
- **Detalhes do Serviço**: Informações detalhadas sobre cada procedimento estético
- **Agendamento Online**: Sistema intuitivo para marcação de horários, com verificação de disponibilidade em tempo real
- **Sobre/Contato**: Informações sobre a empresa e formulário de contato

### Painel Administrativo
- **Dashboard**: Visão geral de estatísticas, agendamentos recentes e indicadores de desempenho
- **Agenda**: Gerenciamento completo de horários, com opções para bloqueio de períodos e confirmação de agendamentos
- **Clientes**: Cadastro e gestão de informações de clientes
- **Serviços**: Administração do catálogo de serviços, com preços, duração e descrições
- **Configurações**: Personalização do sistema e preferências de notificação

## Como Acessar o Painel Administrativo

O sistema atualmente não possui autenticação implementada. Para acessar o painel administrativo, utilize as seguintes rotas:

1. **Dashboard**: `/admin` - Visão geral do sistema
2. **Agenda**: `/admin/calendar` - Gerenciamento de agendamentos
3. **Clientes**: `/admin/clients` - Lista e cadastro de clientes
4. **Serviços**: `/admin/services` - Gerenciamento de serviços oferecidos
5. **Configurações**: `/admin/settings` - Configurações do sistema

## Guia de Integração com Supabase

### O que é o Supabase?

O Supabase é uma alternativa de código aberto ao Firebase, oferecendo um conjunto completo de ferramentas para desenvolvimento backend:
- Banco de dados PostgreSQL
- Autenticação e gerenciamento de usuários
- Armazenamento de arquivos
- Funções e APIs serverless
- Segurança com Row Level Security (RLS)

### Passo a Passo para Integração

#### 1. Criando uma conta e projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Após login, clique em "New Project" e siga as instruções para criar um projeto
3. Anote as credenciais fornecidas (URL e chave anônima)

#### 2. Instalando as dependências necessárias

No diretório do projeto, instale o cliente Supabase:

```bash
npm install @supabase/supabase-js
```

#### 3. Configurando o cliente Supabase

Crie um arquivo de configuração do cliente:

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = 'SUA_URL_SUPABASE';
const supabaseKey = 'SUA_CHAVE_ANONIMA_SUPABASE';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
```

#### 4. Estrutura do Banco de Dados

Crie as seguintes tabelas no Supabase:

##### Tabela: clientes
```sql
CREATE TABLE clientes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  telefone TEXT,
  data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW()) NOT NULL
);
```

##### Tabela: categorias
```sql
CREATE TABLE categorias (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT
);
```

##### Tabela: servicos
```sql
CREATE TABLE servicos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2) NOT NULL,
  duracao INTEGER NOT NULL,
  imagem_url TEXT,
  categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
  ativo BOOLEAN DEFAULT true
);
```

##### Tabela: agendamentos
```sql
CREATE TABLE agendamentos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  servico_id UUID REFERENCES servicos(id) ON DELETE CASCADE,
  data_hora TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmado', 'cancelado', 'concluido')),
  observacoes TEXT,
  data_criacao TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW()) NOT NULL
);
```

##### Tabela: bloqueios_horarios
```sql
CREATE TABLE bloqueios_horarios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  data_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
  data_fim TIMESTAMP WITH TIME ZONE NOT NULL,
  motivo TEXT,
  criado_por TEXT
);
```

##### Tabela: usuarios
```sql
CREATE TABLE usuarios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  nome TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW()) NOT NULL
);
```

#### 5. Implementando Autenticação

Substitua o componente de Login:

```typescript
// src/pages/Login.tsx
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: 'Login realizado com sucesso',
          description: 'Você será redirecionado para o painel',
        });
        navigate('/admin');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro ao fazer login',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    // Mantenha o layout existente, atualize apenas a lógica do formulário
  );
};

export default Login;
```

#### 6. Adicionando Controle de Acesso

Crie um hook de autenticação:

```typescript
// src/hooks/useAuth.tsx
import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    setData();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);
  
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  
  const value = {
    user,
    session,
    loading,
    signOut,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// HOC para rotas protegidas
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    return <div>Carregando...</div>;
  }
  
  return <>{children}</>;
};
```

#### 7. Integrando com a Aplicação

Atualize o App.tsx para incluir o AuthProvider:

```tsx
import { AuthProvider } from '@/hooks/useAuth';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        {/* ... código existente ... */}
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);
```

E proteja as rotas administrativas:

```tsx
import { ProtectedRoute } from '@/hooks/useAuth';

{/* Rotas de admin protegidas */}
<Route 
  path="/admin" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

#### 8. Funções de Acesso aos Dados

Crie funções de acesso ao Supabase:

```typescript
// src/lib/api.ts
import { supabase } from './supabase';

export const clientesAPI = {
  listar: async () => {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('nome');
    
    if (error) throw error;
    return data;
  },
  
  buscarPorId: async (id: string) => {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  criar: async (cliente: any) => {
    const { data, error } = await supabase
      .from('clientes')
      .insert([cliente])
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  atualizar: async (id: string, cliente: any) => {
    const { data, error } = await supabase
      .from('clientes')
      .update(cliente)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  excluir: async (id: string) => {
    const { error } = await supabase
      .from('clientes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },
};

// Crie funções similares para serviços, agendamentos, etc.
```

#### 9. Utilizando com React Query

Integre as funções de API com React Query:

```typescript
// Exemplo para a página de Clientes
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientesAPI } from '@/lib/api';

// Hook para listar clientes
export function useClientes() {
  return useQuery({
    queryKey: ['clientes'],
    queryFn: clientesAPI.listar,
  });
}

// Hook para criar cliente
export function useCriarCliente() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: clientesAPI.criar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
    },
  });
}
```

#### 10. Armazenamento de Imagens

Para uploads de imagens:

```typescript
export const uploadImagem = async (file: File, pasta: string) => {
  const nomeArquivo = `${Date.now()}-${file.name}`;
  const caminho = `${pasta}/${nomeArquivo}`;
  
  const { data, error } = await supabase.storage
    .from('imagens')
    .upload(caminho, file);
  
  if (error) throw error;
  
  // Retorna a URL pública da imagem
  const { data: { publicUrl } } = supabase.storage
    .from('imagens')
    .getPublicUrl(caminho);
  
  return publicUrl;
};
```

#### 11. Segurança com Row Level Security (RLS)

Configure políticas de segurança no Supabase:

```sql
-- Habilitar RLS para todas as tabelas
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;

-- Política para usuários autenticados lerem todos os dados
CREATE POLICY "Usuários autenticados podem ler" 
ON clientes FOR SELECT 
TO authenticated 
USING (true);

-- Política para administradores modificarem dados
CREATE POLICY "Somente administradores podem editar" 
ON clientes FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM usuarios
    WHERE usuarios.id = auth.uid()
    AND usuarios.role = 'admin'
  )
);
```

### Testes e Verificação

1. Teste a autenticação criando usuários no Supabase
2. Verifique o funcionamento das políticas de segurança
3. Teste o fluxo completo de agendamento
4. Revise erros no console do navegador

### Próximos Passos após Integração

1. Migrar os dados mock para o banco de dados real
2. Implementar notificações por email para novos agendamentos
3. Configurar backup automático dos dados
4. Implementar relatórios e estatísticas avançadas

## Visão Geral do Sistema e Verificação

### Arquitetura do Sistema

O sistema segue uma arquitetura cliente-servidor com interface em React e backend (futuro) via Supabase:

1. **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
2. **Estado**: React Query (TanStack Query)
3. **Roteamento**: React Router
4. **Backend (futuro)**: Supabase (PostgreSQL, Auth, Storage)

### Pontos de Verificação

1. ✅ **Navegação**: Verificado funcionamento de todas as rotas
2. ✅ **Layout Responsivo**: Adaptação para dispositivos móveis e desktop
3. ✅ **Componentes UI**: Conformidade com design system
4. ✅ **Gestão de Estado**: Correto uso de useState e React Query
5. ✅ **Formulários**: Validação e submissão correta
6. ✅ **Dashboard Admin**: Visualização de estatísticas e agendamentos recentes
7. ✅ **Calendário**: Interação para selecionar dias e horários
8. ✅ **Lista de Clientes**: Visualização e edição de clientes
9. ✅ **Catálogo de Serviços**: Organização por categorias
10. ✅ **Configurações**: Interface para personalização do sistema

O sistema está funcionando conforme esperado e pronto para integração com Supabase para funcionalidades de backend.

## Contato e Suporte

Para dúvidas, suporte ou contribuições ao projeto, entre em contato com a equipe de desenvolvimento da Realle Estética.

---

Desenvolvido com ❤️ por Realle Estética
