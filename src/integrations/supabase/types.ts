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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string | null
          content: string | null
          cover_image: string | null
          created_at: string
          excerpt: string | null
          id: string
          published: boolean
          published_at: string | null
          slug: string
          title: string
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          title: string
        }
        Update: {
          author_id?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      brand_inquiries: {
        Row: {
          budget: string | null
          company: string
          contact_name: string
          created_at: string
          email: string
          id: string
          message: string
          phone: string | null
        }
        Insert: {
          budget?: string | null
          company: string
          contact_name: string
          created_at?: string
          email: string
          id?: string
          message: string
          phone?: string | null
        }
        Update: {
          budget?: string | null
          company?: string
          contact_name?: string
          created_at?: string
          email?: string
          id?: string
          message?: string
          phone?: string | null
        }
        Relationships: []
      }
      child_profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          created_at: string
          id: string
          name: string
          notes: string | null
          parent_id: string
          updated_at: string
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          parent_id: string
          updated_at?: string
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          parent_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      dentist_profiles: {
        Row: {
          avg_rating: number | null
          bio: string | null
          city: string | null
          clinic_name: string | null
          country: string | null
          created_at: string
          full_name: string
          id: string
          license_number: string | null
          reviews_count: number
          specialty: string | null
          subscription_active: boolean
          updated_at: string
          user_id: string
          verified: boolean
          website: string | null
        }
        Insert: {
          avg_rating?: number | null
          bio?: string | null
          city?: string | null
          clinic_name?: string | null
          country?: string | null
          created_at?: string
          full_name: string
          id?: string
          license_number?: string | null
          reviews_count?: number
          specialty?: string | null
          subscription_active?: boolean
          updated_at?: string
          user_id: string
          verified?: boolean
          website?: string | null
        }
        Update: {
          avg_rating?: number | null
          bio?: string | null
          city?: string | null
          clinic_name?: string | null
          country?: string | null
          created_at?: string
          full_name?: string
          id?: string
          license_number?: string | null
          reviews_count?: number
          specialty?: string | null
          subscription_active?: boolean
          updated_at?: string
          user_id?: string
          verified?: boolean
          website?: string | null
        }
        Relationships: []
      }
      forum_categories: {
        Row: {
          audience: Database["public"]["Enums"]["audience_type"]
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          audience?: Database["public"]["Enums"]["audience_type"]
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          audience?: Database["public"]["Enums"]["audience_type"]
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      forum_comments: {
        Row: {
          author_id: string
          body: string
          created_at: string
          id: string
          post_id: string
        }
        Insert: {
          author_id: string
          body: string
          created_at?: string
          id?: string
          post_id: string
        }
        Update: {
          author_id?: string
          body?: string
          created_at?: string
          id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_posts: {
        Row: {
          author_id: string
          body: string
          category_id: string
          created_at: string
          id: string
          title: string
        }
        Insert: {
          author_id: string
          body: string
          category_id: string
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          author_id?: string
          body?: string
          category_id?: string
          created_at?: string
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "forum_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_modules: {
        Row: {
          audience: Database["public"]["Enums"]["audience_type"]
          content: string | null
          cover_image: string | null
          created_at: string
          id: string
          level: string | null
          published: boolean
          slug: string
          summary: string | null
          title: string
        }
        Insert: {
          audience?: Database["public"]["Enums"]["audience_type"]
          content?: string | null
          cover_image?: string | null
          created_at?: string
          id?: string
          level?: string | null
          published?: boolean
          slug: string
          summary?: string | null
          title: string
        }
        Update: {
          audience?: Database["public"]["Enums"]["audience_type"]
          content?: string | null
          cover_image?: string | null
          created_at?: string
          id?: string
          level?: string | null
          published?: boolean
          slug?: string
          summary?: string | null
          title?: string
        }
        Relationships: []
      }
      live_sessions: {
        Row: {
          audience: Database["public"]["Enums"]["audience_type"] | null
          created_at: string
          dentist_id: string
          description: string | null
          duration_minutes: number | null
          external_link: string
          id: string
          scheduled_at: string
          title: string
        }
        Insert: {
          audience?: Database["public"]["Enums"]["audience_type"] | null
          created_at?: string
          dentist_id: string
          description?: string | null
          duration_minutes?: number | null
          external_link: string
          id?: string
          scheduled_at: string
          title: string
        }
        Update: {
          audience?: Database["public"]["Enums"]["audience_type"] | null
          created_at?: string
          dentist_id?: string
          description?: string | null
          duration_minutes?: number | null
          external_link?: string
          id?: string
          scheduled_at?: string
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          audience: Database["public"]["Enums"]["audience_type"] | null
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          audience?: Database["public"]["Enums"]["audience_type"] | null
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          audience?: Database["public"]["Enums"]["audience_type"] | null
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      session_reviews: {
        Row: {
          created_at: string
          id: string
          rating: number
          review: string | null
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          rating: number
          review?: string | null
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          rating?: number
          review?: string | null
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_reviews_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "live_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_rsvps: {
        Row: {
          created_at: string
          id: string
          joined: boolean
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          joined?: boolean
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          joined?: boolean
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_rsvps_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "live_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "dentist" | "admin"
      audience_type: "kids" | "adults" | "pregnant" | "general"
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
      app_role: ["user", "dentist", "admin"],
      audience_type: ["kids", "adults", "pregnant", "general"],
    },
  },
} as const
