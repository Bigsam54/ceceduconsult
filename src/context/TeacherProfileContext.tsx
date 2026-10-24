import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';

export interface TeacherProfileRow {
  user_id: string;
  email: string;
  full_name: string;
  headline: string;
  teaching_level: string;
  location: string;
  qualification: string;
  salary_expectation: string;
  bio: string;
  skills: string[];
  availability: string;
  avatar_url: string;
  ghana_card_front_url: string;
  ghana_card_back_url: string;
  phone: string;
  experience_years: number;
  verification_status: 'pending' | 'approved' | 'rejected';
  verified_at: string | null;
  created_at?: string;
}

interface TeacherProfileContextType {
  profile: TeacherProfileRow | null;
  loading: boolean;
  error: string | null;
  saveProfile: (updates: Partial<TeacherProfileRow>) => Promise<{ error: string | null }>;
  /** The teacher's real name (never an email or ID); empty until they have set one */
  displayName: string;
  firstName: string;
  avatarUrl: string;
  initials: string;
}

const emptyProfile = (userId: string, email: string): TeacherProfileRow => ({
  user_id: userId,
  email,
  full_name: '',
  headline: '',
  teaching_level: '',
  location: '',
  qualification: '',
  salary_expectation: '',
  bio: '',
  skills: [],
  availability: 'Immediate',
  avatar_url: '',
  ghana_card_front_url: '',
  ghana_card_back_url: '',
  phone: '',
  experience_years: 0,
  verification_status: 'pending',
  verified_at: null
});

const TeacherProfileContext = createContext<TeacherProfileContextType | undefined>(undefined);

export const TeacherProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, role, roleLoading } = useAuth();
  const [profile, setProfile] = useState<TeacherProfileRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isTeacher = Boolean(session?.user) && !roleLoading && role === 'teacher';

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!supabase || !session?.user || !isTeacher) {
        setProfile(null);
        setLoading(roleLoading && Boolean(session?.user));
        return;
      }
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('teacher_profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (cancelled) return;

      if (fetchError) {
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      if (data) {
        setProfile({ ...emptyProfile(session.user.id, session.user.email ?? ''), ...data } as TeacherProfileRow);
        setLoading(false);
        return;
      }

      // First login ever for this account: create a blank profile row.
      const seed = emptyProfile(session.user.id, session.user.email ?? '');
      const { data: created, error: insertError } = await supabase
        .from('teacher_profiles')
        .insert({ user_id: seed.user_id, email: seed.email })
        .select('*')
        .single();

      if (cancelled) return;

      if (insertError) {
        setError(insertError.message);
      } else {
        setProfile({ ...seed, ...created } as TeacherProfileRow);
      }
      setLoading(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [session?.user?.id, isTeacher, roleLoading]);

  const saveProfile = useCallback(async (updates: Partial<TeacherProfileRow>) => {
    if (!supabase || !session?.user) {
      return { error: 'Backend not connected yet.' };
    }
    const { data, error: updateError } = await supabase
      .from('teacher_profiles')
      .update(updates)
      .eq('user_id', session.user.id)
      .select('*')
      .single();

    if (updateError) {
      return { error: updateError.message };
    }
    setProfile((prev) => ({ ...(prev ?? emptyProfile(session.user.id, session.user.email ?? '')), ...data }) as TeacherProfileRow);
    return { error: null };
  }, [session?.user?.id]);

  // Fall back to the name/photo given at sign-up (e.g. Google) until the profile has its own
  const metadata = (session?.user?.user_metadata ?? {}) as Record<string, string | undefined>;
  const displayName = (profile?.full_name || metadata.full_name || metadata.name || '').trim();
  const firstName = displayName.split(/\s+/)[0] ?? '';
  const avatarUrl = profile?.avatar_url || metadata.avatar_url || metadata.picture || '';
  // Without a name yet, use the email (e.g. "nancie@..." -> "N") rather than a generic letter
  const initials = (displayName || session?.user?.email || 'CEC')
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <TeacherProfileContext.Provider
      value={{ profile, loading, error, saveProfile, displayName, firstName, avatarUrl, initials }}
    >
      {children}
    </TeacherProfileContext.Provider>
  );
};

export const useTeacherProfile = () => {
  const context = useContext(TeacherProfileContext);
  if (!context) {
    throw new Error('useTeacherProfile must be used within a TeacherProfileProvider');
  }
  return context;
};
