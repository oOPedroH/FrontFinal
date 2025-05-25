export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agendamentos: {
        Row: {
          atualizado_em: string | null
          cliente_id: string
          criado_em: string | null
          data: string
          hora: string
          id: string
          observacoes: string | null
          servico_id: string
          status: string | null
        }
        Insert: {
          atualizado_em?: string | null
          cliente_id: string
          criado_em?: string | null
          data: string
          hora: string
          id?: string
          observacoes?: string | null
          servico_id: string
          status?: string | null
        }
        Update: {
          atualizado_em?: string | null
          cliente_id?: string
          criado_em?: string | null
          data?: string
          hora?: string
          id?: string
          observacoes?: string | null
          servico_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agendamentos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agendamentos_servico_id_fkey"
            columns: ["servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["id"]
          },
        ]
      }
      bloqueios_horarios: {
        Row: {
          criado_em: string | null
          criado_por: string | null
          data_fim: string
          data_inicio: string
          id: string
          motivo: string | null
        }
        Insert: {
          criado_em?: string | null
          criado_por?: string | null
          data_fim: string
          data_inicio: string
          id?: string
          motivo?: string | null
        }
        Update: {
          criado_em?: string | null
          criado_por?: string | null
          data_fim?: string
          data_inicio?: string
          id?: string
          motivo?: string | null
        }
        Relationships: []
      }
      categorias: {
        Row: {
          ativa: boolean | null
          criado_em: string | null
          descricao: string | null
          id: string
          nome: string
          ordem: number | null
        }
        Insert: {
          ativa?: boolean | null
          criado_em?: string | null
          descricao?: string | null
          id?: string
          nome: string
          ordem?: number | null
        }
        Update: {
          ativa?: boolean | null
          criado_em?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          ordem?: number | null
        }
        Relationships: []
      }
      clientes: {
        Row: {
          atualizado_em: string | null
          criado_em: string | null
          email: string
          endereco: string | null
          id: string
          nascimento: string | null
          nome: string
          observacoes: string | null
          telefone: string
        }
        Insert: {
          atualizado_em?: string | null
          criado_em?: string | null
          email: string
          endereco?: string | null
          id?: string
          nascimento?: string | null
          nome: string
          observacoes?: string | null
          telefone: string
        }
        Update: {
          atualizado_em?: string | null
          criado_em?: string | null
          email?: string
          endereco?: string | null
          id?: string
          nascimento?: string | null
          nome?: string
          observacoes?: string | null
          telefone?: string
        }
        Relationships: []
      }
      configuracoes: {
        Row: {
          atualizado_em: string | null
          dias_funcionamento: number[]
          email_contato: string | null
          endereco: string | null
          facebook: string | null
          horario_abertura: string
          horario_fechamento: string
          id: string
          instagram: string | null
          intervalo_agendamento: number
          logo_url: string | null
          nome_clinica: string
          telefone_contato: string | null
          whatsapp: string | null
        }
        Insert: {
          atualizado_em?: string | null
          dias_funcionamento?: number[]
          email_contato?: string | null
          endereco?: string | null
          facebook?: string | null
          horario_abertura?: string
          horario_fechamento?: string
          id?: string
          instagram?: string | null
          intervalo_agendamento?: number
          logo_url?: string | null
          nome_clinica?: string
          telefone_contato?: string | null
          whatsapp?: string | null
        }
        Update: {
          atualizado_em?: string | null
          dias_funcionamento?: number[]
          email_contato?: string | null
          endereco?: string | null
          facebook?: string | null
          horario_abertura?: string
          horario_fechamento?: string
          id?: string
          instagram?: string | null
          intervalo_agendamento?: number
          logo_url?: string | null
          nome_clinica?: string
          telefone_contato?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      imagens_antes_depois: {
        Row: {
          cliente_id: string
          criado_em: string | null
          data: string
          id: string
          imagem_antes: string
          imagem_depois: string
          observacoes: string | null
          servico_id: string | null
        }
        Insert: {
          cliente_id: string
          criado_em?: string | null
          data: string
          id?: string
          imagem_antes: string
          imagem_depois: string
          observacoes?: string | null
          servico_id?: string | null
        }
        Update: {
          cliente_id?: string
          criado_em?: string | null
          data?: string
          id?: string
          imagem_antes?: string
          imagem_depois?: string
          observacoes?: string | null
          servico_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "imagens_antes_depois_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "imagens_antes_depois_servico_id_fkey"
            columns: ["servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["id"]
          },
        ]
      }
      servicos: {
        Row: {
          ativo: boolean | null
          atualizado_em: string | null
          categoria_id: string | null
          criado_em: string | null
          descricao: string
          descricao_completa: string | null
          destaque: boolean | null
          duracao: number
          id: string
          imagem_url: string | null
          preco: number
          titulo: string
        }
        Insert: {
          ativo?: boolean | null
          atualizado_em?: string | null
          categoria_id?: string | null
          criado_em?: string | null
          descricao: string
          descricao_completa?: string | null
          destaque?: boolean | null
          duracao: number
          id?: string
          imagem_url?: string | null
          preco: number
          titulo: string
        }
        Update: {
          ativo?: boolean | null
          atualizado_em?: string | null
          categoria_id?: string | null
          criado_em?: string | null
          descricao?: string
          descricao_completa?: string | null
          destaque?: boolean | null
          duracao?: number
          id?: string
          imagem_url?: string | null
          preco?: number
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "servicos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          ativo: boolean | null
          auth_id: string | null
          cargo: string
          criado_em: string | null
          email: string
          id: string
          imagem_perfil: string | null
          nome: string
        }
        Insert: {
          ativo?: boolean | null
          auth_id?: string | null
          cargo: string
          criado_em?: string | null
          email: string
          id?: string
          imagem_perfil?: string | null
          nome: string
        }
        Update: {
          ativo?: boolean | null
          auth_id?: string | null
          cargo?: string
          criado_em?: string | null
          email?: string
          id?: string
          imagem_perfil?: string | null
          nome?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      verificar_disponibilidade_horario: {
        Args: {
          p_data: string
          p_hora: string
          p_servico_id: string
          p_agendamento_id?: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
