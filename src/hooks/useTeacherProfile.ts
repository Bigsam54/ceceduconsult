import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

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
  availability: 'Immediate'
});

export const useTeacherProfile = () => {
  const { session } = useAuth();
  const [profile, setProfile] = useState<TeacherProfileRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!supabase || !session?.user) {
        setLoading(false);
        return;
      }
      setLoading(true);

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
        setProfile(data as TeacherProfileRow);
        setLoading(false);
        return;
      }

      // First login ever for this account: create a blank profile row.
      const seed = emptyProfile(session.user.id, session.user.email ?? '');
      const { data: created, error: insertError } = await supabase
        .from('teacher_profiles')
        .insert(seed)
        .select('*')
        .single();

      if (cancelled) return;

      if (insertError) {
        setError(insertError.message);
      } else {
        setProfile(created as TeacherProfileRow);
      }
      setLoading(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [session?.user?.id]);

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
    setProfile(data as TeacherProfileRow);
    return { error: null };
  }, [session?.user?.id]);

  return { profile, loading, error, saveProfile };
};
