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
      agendamento: {
        Row: {
          cod_maquina: number | null
          cod_status: number | null
          cod_tecnico: number | null
          cod_tipo_manut: number | null
          data_prevista: string
          hora_prevista: string
          id_agendamento: number
        }
        Insert: {
          cod_maquina?: number | null
          cod_status?: number | null
          cod_tecnico?: number | null
          cod_tipo_manut?: number | null
          data_prevista: string
          hora_prevista: string
          id_agendamento?: number
        }
        Update: {
          cod_maquina?: number | null
          cod_status?: number | null
          cod_tecnico?: number | null
          cod_tipo_manut?: number | null
          data_prevista?: string
          hora_prevista?: string
          id_agendamento?: number
        }
        Relationships: [
          {
            foreignKeyName: "agendamento_cod_maquina_fkey"
            columns: ["cod_maquina"]
            isOneToOne: false
            referencedRelation: "maquina"
            referencedColumns: ["id_maquina"]
          },
          {
            foreignKeyName: "agendamento_cod_status_fkey"
            columns: ["cod_status"]
            isOneToOne: false
            referencedRelation: "status"
            referencedColumns: ["id_status"]
          },
          {
            foreignKeyName: "agendamento_cod_tecnico_fkey"
            columns: ["cod_tecnico"]
            isOneToOne: false
            referencedRelation: "tecnico"
            referencedColumns: ["id_tecnico"]
          },
          {
            foreignKeyName: "agendamento_cod_tipo_manut_fkey"
            columns: ["cod_tipo_manut"]
            isOneToOne: false
            referencedRelation: "tipo_manutencao"
            referencedColumns: ["id_tipo_manut"]
          },
        ]
      }
      almoxarifado: {
        Row: {
          cod_ferramenta: number | null
          id_almoxarifado: number
          status_ferramenta: string | null
        }
        Insert: {
          cod_ferramenta?: number | null
          id_almoxarifado?: number
          status_ferramenta?: string | null
        }
        Update: {
          cod_ferramenta?: number | null
          id_almoxarifado?: number
          status_ferramenta?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "almoxarifado_cod_ferramenta_fkey"
            columns: ["cod_ferramenta"]
            isOneToOne: false
            referencedRelation: "ferramenta"
            referencedColumns: ["id_ferramenta"]
          },
        ]
      }
      estoque: {
        Row: {
          cod_material: number | null
          id_estoque: number
          qntd_estoque: number | null
          qntd_limite: number | null
        }
        Insert: {
          cod_material?: number | null
          id_estoque?: number
          qntd_estoque?: number | null
          qntd_limite?: number | null
        }
        Update: {
          cod_material?: number | null
          id_estoque?: number
          qntd_estoque?: number | null
          qntd_limite?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "estoque_cod_material_fkey"
            columns: ["cod_material"]
            isOneToOne: false
            referencedRelation: "material"
            referencedColumns: ["id_material"]
          },
        ]
      }
      execucao: {
        Row: {
          cod_agendamento: number | null
          cod_ferramenta: number | null
          cod_status: number | null
          data_realizada: string | null
          hora_fim: string | null
          hora_inicio: string | null
          id_execucao: number
          valor_exec: number | null
        }
        Insert: {
          cod_agendamento?: number | null
          cod_ferramenta?: number | null
          cod_status?: number | null
          data_realizada?: string | null
          hora_fim?: string | null
          hora_inicio?: string | null
          id_execucao?: number
          valor_exec?: number | null
        }
        Update: {
          cod_agendamento?: number | null
          cod_ferramenta?: number | null
          cod_status?: number | null
          data_realizada?: string | null
          hora_fim?: string | null
          hora_inicio?: string | null
          id_execucao?: number
          valor_exec?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "execucao_cod_agendamento_fkey"
            columns: ["cod_agendamento"]
            isOneToOne: false
            referencedRelation: "agendamento"
            referencedColumns: ["id_agendamento"]
          },
          {
            foreignKeyName: "execucao_cod_ferramenta_fkey"
            columns: ["cod_ferramenta"]
            isOneToOne: false
            referencedRelation: "ferramenta"
            referencedColumns: ["id_ferramenta"]
          },
          {
            foreignKeyName: "execucao_cod_status_fkey"
            columns: ["cod_status"]
            isOneToOne: false
            referencedRelation: "status"
            referencedColumns: ["id_status"]
          },
        ]
      }
      execucao_material: {
        Row: {
          cod_execucao: number | null
          cod_material: number | null
          id_exec_material: number
          qntd_material: number | null
        }
        Insert: {
          cod_execucao?: number | null
          cod_material?: number | null
          id_exec_material?: number
          qntd_material?: number | null
        }
        Update: {
          cod_execucao?: number | null
          cod_material?: number | null
          id_exec_material?: number
          qntd_material?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "execucao_material_cod_execucao_fkey"
            columns: ["cod_execucao"]
            isOneToOne: false
            referencedRelation: "execucao"
            referencedColumns: ["id_execucao"]
          },
          {
            foreignKeyName: "execucao_material_cod_material_fkey"
            columns: ["cod_material"]
            isOneToOne: false
            referencedRelation: "material"
            referencedColumns: ["id_material"]
          },
        ]
      }
      ferramenta: {
        Row: {
          id_ferramenta: number
          nome_ferramenta: string | null
        }
        Insert: {
          id_ferramenta?: number
          nome_ferramenta?: string | null
        }
        Update: {
          id_ferramenta?: number
          nome_ferramenta?: string | null
        }
        Relationships: []
      }
      gerente: {
        Row: {
          cod_setor: number | null
          cpf: string | null
          datanasc: string | null
          id_gerente: number
          nome_gerente: string | null
          telefone: string | null
        }
        Insert: {
          cod_setor?: number | null
          cpf?: string | null
          datanasc?: string | null
          id_gerente?: number
          nome_gerente?: string | null
          telefone?: string | null
        }
        Update: {
          cod_setor?: number | null
          cpf?: string | null
          datanasc?: string | null
          id_gerente?: number
          nome_gerente?: string | null
          telefone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gerente_cod_setor_fkey"
            columns: ["cod_setor"]
            isOneToOne: false
            referencedRelation: "setor"
            referencedColumns: ["id_setor"]
          },
        ]
      }
      maquina: {
        Row: {
          cod_setor: number | null
          id_maquina: number
          nome_maquina: string | null
        }
        Insert: {
          cod_setor?: number | null
          id_maquina?: number
          nome_maquina?: string | null
        }
        Update: {
          cod_setor?: number | null
          id_maquina?: number
          nome_maquina?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maquina_cod_setor_fkey"
            columns: ["cod_setor"]
            isOneToOne: false
            referencedRelation: "setor"
            referencedColumns: ["id_setor"]
          },
        ]
      }
      material: {
        Row: {
          descricao_material: string | null
          id_material: number
          nome_material: string | null
          valor_material: number | null
        }
        Insert: {
          descricao_material?: string | null
          id_material?: number
          nome_material?: string | null
          valor_material?: number | null
        }
        Update: {
          descricao_material?: string | null
          id_material?: number
          nome_material?: string | null
          valor_material?: number | null
        }
        Relationships: []
      }
      setor: {
        Row: {
          id_setor: number
          nome_setor: string | null
        }
        Insert: {
          id_setor?: number
          nome_setor?: string | null
        }
        Update: {
          id_setor?: number
          nome_setor?: string | null
        }
        Relationships: []
      }
      status: {
        Row: {
          desc_status: string | null
          id_status: number
        }
        Insert: {
          desc_status?: string | null
          id_status?: number
        }
        Update: {
          desc_status?: string | null
          id_status?: number
        }
        Relationships: []
      }
      tecnico: {
        Row: {
          cod_setor: number | null
          cpf: string | null
          datanasc: string | null
          id_tecnico: number
          nome_tecnico: string | null
          telefone: string | null
          valorhora: number | null
        }
        Insert: {
          cod_setor?: number | null
          cpf?: string | null
          datanasc?: string | null
          id_tecnico?: number
          nome_tecnico?: string | null
          telefone?: string | null
          valorhora?: number | null
        }
        Update: {
          cod_setor?: number | null
          cpf?: string | null
          datanasc?: string | null
          id_tecnico?: number
          nome_tecnico?: string | null
          telefone?: string | null
          valorhora?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tecnico_cod_setor_fkey"
            columns: ["cod_setor"]
            isOneToOne: false
            referencedRelation: "setor"
            referencedColumns: ["id_setor"]
          },
        ]
      }
      tipo_manutencao: {
        Row: {
          descricao: string | null
          id_tipo_manut: number
        }
        Insert: {
          descricao?: string | null
          id_tipo_manut?: number
        }
        Update: {
          descricao?: string | null
          id_tipo_manut?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
