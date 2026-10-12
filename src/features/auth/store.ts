import { create } from 'zustand';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types';

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalView: 'login' | 'signup' | 'forgot_password';
  
  // Actions
  initialize: () => Promise<void>;
  openAuthModal: (view?: 'login' | 'signup' | 'forgot_password') => void;
  closeAuthModal: () => void;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  isAuthModalOpen: false,
  authModalView: 'login',

  openAuthModal: (view = 'login') => {
    set({ isAuthModalOpen: true, authModalView: view });
  },

  closeAuthModal: () => {
    set({ isAuthModalOpen: false });
  },

  initialize: async () => {
    try {
      set({ isLoading: true });
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        set({ user: session.user, session });
        await get().refreshProfile();
      } else {
        set({ user: null, session: null, profile: null });
      }

      // Listen for auth state changes (sign in, sign out, token refresh)
      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          set({ user: session.user, session });
          await get().refreshProfile();
        } else {
          set({ user: null, session: null, profile: null });
        }
      });
    } catch (err) {
      console.error('[auth] Initialization error:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  refreshProfile: async () => {
    const { user } = get();
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        set({ profile: data as unknown as Profile });
      }
    } catch (err) {
      console.error('[auth] Failed to fetch profile:', err);
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, profile: null });
  },
}));
