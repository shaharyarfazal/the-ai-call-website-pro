export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      blogs: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image_url: string | null
          id: string
          published_at: string | null
          scheduled_at: string | null
          status: string | null
          title: string
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published_at?: string | null
          scheduled_at?: string | null
          status?: string | null
          title: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published_at?: string | null
          scheduled_at?: string | null
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          service: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          content: string
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          subject: string
          template_type: string | null
          updated_at: string
          user_id: string
          variables: Json | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          subject: string
          template_type?: string | null
          updated_at?: string
          user_id?: string
          variables?: Json | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string
          template_type?: string | null
          updated_at?: string
          user_id?: string
          variables?: Json | null
        }
        Relationships: []
      }
      kn_base: {
        Row: {
          created_at: string
          id: number
          knbase: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          knbase?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          knbase?: string | null
        }
        Relationships: []
      }
      linkedin_query: {
        Row: {
          created_at: string
          id: number
          query: string | null
          used: boolean | null
        }
        Insert: {
          created_at?: string
          id?: number
          query?: string | null
          used?: boolean | null
        }
        Update: {
          created_at?: string
          id?: number
          query?: string | null
          used?: boolean | null
        }
        Relationships: []
      }
      n8n_chat_histories: {
        Row: {
          created_at: string
          id: number
          message: string | null
          session_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string | null
          session_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string | null
          session_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      queries: {
        Row: {
          id: number
          query: string | null
          visited_r: boolean | null
        }
        Insert: {
          id?: number
          query?: string | null
          visited_r?: boolean | null
        }
        Update: {
          id?: number
          query?: string | null
          visited_r?: boolean | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      webhook_events: {
        Row: {
          created_at: string
          event_data: Json
          event_type: string
          id: string
          processed: boolean | null
          processed_at: string | null
          source: string
        }
        Insert: {
          created_at?: string
          event_data: Json
          event_type: string
          id?: string
          processed?: boolean | null
          processed_at?: string | null
          source: string
        }
        Update: {
          created_at?: string
          event_data?: Json
          event_type?: string
          id?: string
          processed?: boolean | null
          processed_at?: string | null
          source?: string
        }
        Relationships: []
      }
      webhooks: {
        Row: {
          created_at: string
          created_by: string | null
          events: string[] | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          events?: string[] | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          events?: string[] | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      website_settings: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_type: string | null
          setting_value: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_type?: string | null
          setting_value?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_type?: string | null
          setting_value?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      agent1_records_dedupe_cleanup: { Args: never; Returns: number }
      agent2_records_dedupe_cleanup: { Args: never; Returns: number }
      agent3_records_dedupe_cleanup: { Args: never; Returns: number }
      apply_tag_to_lead: {
        Args: { _lead_id: string; _tag_name: string }
        Returns: undefined
      }
      calculate_deal_score: { Args: { deal_id: string }; Returns: number }
      fetch_and_mark_visited: {
        Args: { limit_count?: number }
        Returns: {
          id: number
          query: string
          visited_r: boolean
        }[]
      }
      fetch_one_unvisited: {
        Args: never
        Returns: {
          id: number
          query: string
          visited_r: boolean
        }[]
      }
      get_next_leads_to_call: {
        Args: { _batch_size?: number }
        Returns: {
          current_stage: string
          last_outcome: string
          lead_id: string
          next_action_at: string
        }[]
      }
      get_next_leads_to_email: {
        Args: { _batch_size?: number }
        Returns: {
          current_stage: string
          last_outcome: string
          lead_id: string
          next_action_at: string
        }[]
      }
      get_next_leads_to_sms: {
        Args: { _batch_size?: number }
        Returns: {
          current_stage: string
          last_outcome: string
          lead_id: string
          next_action_at: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      initialize_default_pipeline_stages: { Args: never; Returns: undefined }
      log_call_attempt_and_update: {
        Args: { _ai_call_id: string; _lead_id: string; _notes?: string }
        Returns: undefined
      }
      log_contact_activity: {
        Args: {
          _activity_type: string
          _contact_id: string
          _description?: string
          _metadata?: Json
          _title: string
        }
        Returns: undefined
      }
      log_email_attempt_and_update: {
        Args: { _lead_id: string; _notes?: string; _outcome: string }
        Returns: undefined
      }
      log_sms_attempt_and_update: {
        Args: { _lead_id: string; _notes?: string; _outcome: string }
        Returns: undefined
      }
      mark_lead_as_email_pending: {
        Args: { p_lead_id: string }
        Returns: undefined
      }
      mark_visited:
        | {
            Args: { _id: number }
            Returns: {
              error: true
            } & "Could not choose the best candidate function between: public.mark_visited(_id => int2), public.mark_visited(_id => int4). Try renaming the parameters or the function itself in the database so function overloading can be resolved"
          }
        | {
            Args: { _id: number }
            Returns: {
              error: true
            } & "Could not choose the best candidate function between: public.mark_visited(_id => int2), public.mark_visited(_id => int4). Try renaming the parameters or the function itself in the database so function overloading can be resolved"
          }
      match_rag_documents: {
        Args: { match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          similarity: number
          source: string
        }[]
      }
      populate_contact_fields_from_arrays: { Args: never; Returns: undefined }
      populate_contact_fields_from_arrays2: { Args: never; Returns: undefined }
      remove_tag_from_lead: {
        Args: { _lead_id: string; _tag_name: string }
        Returns: undefined
      }
      update_lead_outcome: {
        Args: { _ai_call_id: string; _ai_call_successful: boolean }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "client"
      contact_type: "lead" | "prospect" | "customer" | "inactive"
      funnel_stage:
        | "awareness"
        | "interest"
        | "consideration"
        | "intent"
        | "evaluation"
        | "purchase"
        | "retention"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "client"],
      contact_type: ["lead", "prospect", "customer", "inactive"],
      funnel_stage: [
        "awareness",
        "interest",
        "consideration",
        "intent",
        "evaluation",
        "purchase",
        "retention",
      ],
    },
  },
} as const
