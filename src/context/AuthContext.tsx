import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export type AccountRole = 'teacher' | 'admin';

interface AuthContextType {
  session: Session | null;
  role: AccountRole | null;
  loading: boolean;
  roleLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: (intendedPortal: AccountRole) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

export const INTENDED_PORTAL_KEY = 'cec_intended_portal';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AccountRole | null>(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Look up this user's role whenever the session changes.
  useEffect(() => {
    if (!supabase || !session?.user) {
      setRole(null);
      setRoleLoading(false);
      return;
    }
    let cancelled = false;
    setRoleLoading(true);
    supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) {
          setRole((data?.role as AccountRole) ?? 'teacher');
          setRoleLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [session?.user?.id]);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) {
      return { error: 'Backend not connected yet. Add your Supabase URL and key to enable real logins.' };
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? error.message : null };
  }, []);

  const signInWithGoogle = useCallback(async (intendedPortal: AccountRole) => {
    if (!supabase) {
      return { error: 'Backend not connected yet. Add your Supabase URL and key to enable real logins.' };
    }
    localStorage.setItem(INTENDED_PORTAL_KEY, intendedPortal);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
    if (error) {
      localStorage.removeItem(INTENDED_PORTAL_KEY);
    }
    return { error: error ? error.message : null };
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  }, []);

  return (
    <AuthContext.Provider value={{ session, role, loading, roleLoading, isConfigured: isSupabaseConfigured, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
