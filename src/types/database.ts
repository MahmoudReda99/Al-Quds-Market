/**
 * Placeholder Database types for Phase 1.
 * Will be replaced in Phase 2 with:
 *   supabase gen types typescript --project-id <ref> > src/types/database.ts
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: Record<string, {
      Row: Record<string, Json>;
      Insert: Record<string, Json>;
      Update: Record<string, Json>;
    }>;
    Views: Record<string, { Row: Record<string, Json> }>;
    Functions: Record<string, { Args: Record<string, Json>; Returns: Json }>;
    Enums: Record<string, string>;
  };
};
