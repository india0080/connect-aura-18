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
      coin_transactions: {
        Row: {
          balance_after: number
          bonus_coins: number
          coins: number
          created_at: string
          description: string | null
          id: string
          metadata: Json
          reference_id: string | null
          type: Database["public"]["Enums"]["coin_tx_type"]
          user_id: string
        }
        Insert: {
          balance_after: number
          bonus_coins?: number
          coins: number
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json
          reference_id?: string | null
          type: Database["public"]["Enums"]["coin_tx_type"]
          user_id: string
        }
        Update: {
          balance_after?: number
          bonus_coins?: number
          coins?: number
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json
          reference_id?: string | null
          type?: Database["public"]["Enums"]["coin_tx_type"]
          user_id?: string
        }
        Relationships: []
      }
      daily_checkins: {
        Row: {
          current_streak: number
          last_claimed_date: string | null
          longest_streak: number
          updated_at: string
          user_id: string
        }
        Insert: {
          current_streak?: number
          last_claimed_date?: string | null
          longest_streak?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          current_streak?: number
          last_claimed_date?: string | null
          longest_streak?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_reward_claims: {
        Row: {
          claimed_date: string
          coins_awarded: number
          created_at: string
          day_index: number
          id: string
          user_id: string
        }
        Insert: {
          claimed_date?: string
          coins_awarded: number
          created_at?: string
          day_index: number
          id?: string
          user_id: string
        }
        Update: {
          claimed_date?: string
          coins_awarded?: number
          created_at?: string
          day_index?: number
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      friend_requests: {
        Row: {
          created_at: string
          id: string
          receiver_id: string
          sender_id: string
          status: Database["public"]["Enums"]["request_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          receiver_id: string
          sender_id: string
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          receiver_id?: string
          sender_id?: string
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          chat_room_id: string
          created_at: string
          id: string
          message: string
          read: boolean
          receiver_id: string
          sender_id: string
        }
        Insert: {
          chat_room_id: string
          created_at?: string
          id?: string
          message: string
          read?: boolean
          receiver_id: string
          sender_id: string
        }
        Update: {
          chat_room_id?: string
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      payment_orders: {
        Row: {
          amount_inr: number
          created_at: string
          currency: string
          id: string
          kind: string
          metadata: Json
          package_id: string | null
          provider: string
          provider_session_id: string | null
          status: string
          updated_at: string
          user_id: string
          vip_plan_id: string | null
        }
        Insert: {
          amount_inr: number
          created_at?: string
          currency?: string
          id?: string
          kind: string
          metadata?: Json
          package_id?: string | null
          provider?: string
          provider_session_id?: string | null
          status?: string
          updated_at?: string
          user_id: string
          vip_plan_id?: string | null
        }
        Update: {
          amount_inr?: number
          created_at?: string
          currency?: string
          id?: string
          kind?: string
          metadata?: Json
          package_id?: string | null
          provider?: string
          provider_session_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          vip_plan_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_orders_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "recharge_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_orders_vip_plan_id_fkey"
            columns: ["vip_plan_id"]
            isOneToOne: false
            referencedRelation: "vip_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          full_name: string
          gender: Database["public"]["Enums"]["gender_type"] | null
          id: string
          interests: string[]
          languages: string[]
          location: string | null
          onboarding_complete: boolean
          preference: Database["public"]["Enums"]["preference_type"] | null
          relationship_status: string | null
          religion: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id: string
          interests?: string[]
          languages?: string[]
          location?: string | null
          onboarding_complete?: boolean
          preference?: Database["public"]["Enums"]["preference_type"] | null
          relationship_status?: string | null
          religion?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          interests?: string[]
          languages?: string[]
          location?: string | null
          onboarding_complete?: boolean
          preference?: Database["public"]["Enums"]["preference_type"] | null
          relationship_status?: string | null
          religion?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      recharge_packages: {
        Row: {
          active: boolean
          badge: string | null
          bonus_percent: number
          coins: number
          created_at: string
          highlight: boolean
          id: string
          name: string
          price_inr: number
          sort_order: number
          stripe_price_id: string | null
        }
        Insert: {
          active?: boolean
          badge?: string | null
          bonus_percent?: number
          coins: number
          created_at?: string
          highlight?: boolean
          id?: string
          name: string
          price_inr: number
          sort_order?: number
          stripe_price_id?: string | null
        }
        Update: {
          active?: boolean
          badge?: string | null
          bonus_percent?: number
          coins?: number
          created_at?: string
          highlight?: boolean
          id?: string
          name?: string
          price_inr?: number
          sort_order?: number
          stripe_price_id?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referred_id: string
          referrer_id: string
          reward_coins: number
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          referred_id: string
          referrer_id: string
          reward_coins?: number
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          referred_id?: string
          referrer_id?: string
          reward_coins?: number
          status?: string
        }
        Relationships: []
      }
      spin_history: {
        Row: {
          created_at: string
          id: string
          prize_coins: number
          prize_label: string | null
          spun_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          prize_coins: number
          prize_label?: string | null
          spun_date?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          prize_coins?: number
          prize_label?: string | null
          spun_date?: string
          user_id?: string
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
      vip_plans: {
        Row: {
          active: boolean
          badge: string | null
          bonus_coins: number
          created_at: string
          duration_days: number
          highlight: boolean
          id: string
          name: string
          perks: Json
          price_inr: number
          sort_order: number
          stripe_price_id: string | null
          tier: string
        }
        Insert: {
          active?: boolean
          badge?: string | null
          bonus_coins?: number
          created_at?: string
          duration_days: number
          highlight?: boolean
          id?: string
          name: string
          perks?: Json
          price_inr: number
          sort_order?: number
          stripe_price_id?: string | null
          tier: string
        }
        Update: {
          active?: boolean
          badge?: string | null
          bonus_coins?: number
          created_at?: string
          duration_days?: number
          highlight?: boolean
          id?: string
          name?: string
          perks?: Json
          price_inr?: number
          sort_order?: number
          stripe_price_id?: string | null
          tier?: string
        }
        Relationships: []
      }
      vip_subscriptions: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          payment_ref: string | null
          plan_id: string
          started_at: string
          status: string
          tier: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          payment_ref?: string | null
          plan_id: string
          started_at?: string
          status?: string
          tier: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          payment_ref?: string | null
          plan_id?: string
          started_at?: string
          status?: string
          tier?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vip_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "vip_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          bonus_coins: number
          coins: number
          created_at: string
          total_recharged: number
          total_spent: number
          updated_at: string
          user_id: string
        }
        Insert: {
          bonus_coins?: number
          coins?: number
          created_at?: string
          total_recharged?: number
          total_spent?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          bonus_coins?: number
          coins?: number
          created_at?: string
          total_recharged?: number
          total_spent?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      adjust_wallet: {
        Args: {
          _bonus_coins: number
          _coins: number
          _description: string
          _metadata?: Json
          _reference?: string
          _type: Database["public"]["Enums"]["coin_tx_type"]
          _user_id: string
        }
        Returns: {
          bonus_coins: number
          coins: number
          created_at: string
          total_recharged: number
          total_spent: number
          updated_at: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "wallets"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      coin_tx_type:
        | "recharge"
        | "spend"
        | "bonus"
        | "reward"
        | "refund"
        | "referral"
        | "vip_bonus"
      gender_type: "male" | "female" | "non-binary" | "prefer-not-to-say"
      preference_type: "men" | "women" | "everyone"
      request_status: "pending" | "accepted" | "rejected"
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
      app_role: ["admin", "moderator", "user"],
      coin_tx_type: [
        "recharge",
        "spend",
        "bonus",
        "reward",
        "refund",
        "referral",
        "vip_bonus",
      ],
      gender_type: ["male", "female", "non-binary", "prefer-not-to-say"],
      preference_type: ["men", "women", "everyone"],
      request_status: ["pending", "accepted", "rejected"],
    },
  },
} as const
