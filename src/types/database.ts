export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          date_of_birth: string | null;
          is_vip: boolean;
          vip_credits: number;
          delivery_count: number;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          date_of_birth?: string | null;
          is_vip?: boolean;
          vip_credits?: number;
          delivery_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          date_of_birth?: string | null;
          is_vip?: boolean;
          vip_credits?: number;
          delivery_count?: number;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          brand: string;
          category: string;
          subcategory: string | null;
          price: number;
          thc: string | null;
          type: string;
          description: string | null;
          image_url: string | null;
          is_preorder: boolean;
          in_stock: boolean;
          featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          brand: string;
          category: string;
          subcategory?: string | null;
          price: number;
          thc?: string | null;
          type: string;
          description?: string | null;
          image_url?: string | null;
          is_preorder?: boolean;
          in_stock?: boolean;
          featured?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          brand?: string;
          category?: string;
          subcategory?: string | null;
          price?: number;
          thc?: string | null;
          type?: string;
          description?: string | null;
          image_url?: string | null;
          is_preorder?: boolean;
          in_stock?: boolean;
          featured?: boolean;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          order_number: string;
          type: string;
          items: Json;
          subtotal: number;
          delivery_fee: number;
          total: number;
          status: string;
          payment_method: string;
          customer_email: string;
          customer_name: string;
          customer_phone: string;
          delivery_address: Json;
          delivery_date: string | null;
          is_vip_order: boolean;
          vip_credit_used: number;
          notes: string | null;
          cancellation_reason: string | null;
          cancelled_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          order_number: string;
          type: string;
          items: Json;
          subtotal: number;
          delivery_fee: number;
          total: number;
          status?: string;
          payment_method?: string;
          customer_email: string;
          customer_name: string;
          customer_phone: string;
          delivery_address: Json;
          delivery_date?: string | null;
          is_vip_order?: boolean;
          vip_credit_used?: number;
          notes?: string | null;
          cancellation_reason?: string | null;
          cancelled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          order_number?: string;
          type?: string;
          items?: Json;
          subtotal?: number;
          delivery_fee?: number;
          total?: number;
          status?: string;
          payment_method?: string;
          customer_email?: string;
          customer_name?: string;
          customer_phone?: string;
          delivery_address?: Json;
          delivery_date?: string | null;
          is_vip_order?: boolean;
          vip_credit_used?: number;
          notes?: string | null;
          cancellation_reason?: string | null;
          cancelled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_status_history: {
        Row: {
          id: string;
          order_id: string;
          from_status: string | null;
          to_status: string;
          changed_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          from_status?: string | null;
          to_status: string;
          changed_by?: string | null;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          order_id: string | null;
          user_id: string | null;
          type: string;
          recipient_email: string;
          status: string;
          message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id?: string | null;
          user_id?: string | null;
          type: string;
          recipient_email: string;
          status?: string;
          message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string | null;
          user_id?: string | null;
          type?: string;
          recipient_email?: string;
          status?: string;
          message?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
