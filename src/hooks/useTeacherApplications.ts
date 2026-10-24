import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { TeacherProfileRow } from '../context/TeacherProfileContext';

export type VerificationStatus = TeacherProfileRow['verification_status'];

/**
 * Admin-only: every registered teacher profile, newest first, with the
 * ability to approve or reject their verification (RLS allows admins only).
 */
export const useTeacherApplications = () => {
  const [applications, setApplications] = useState<TeacherProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('teacher_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setError(null);
      setApplications((data ?? []) as TeacherProfileRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const setVerificationStatus = useCallback(async (userId: string, status: VerificationStatus) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { data, error: updateError } = await supabase
      .from('teacher_profiles')
      .update({
        verification_status: status,
        verified_at: status === 'approved' ? new Date().toISOString() : null
      })
      .eq('user_id', userId)
      .select('*')
      .single();

    if (updateError) return { error: updateError.message };
    setApplications((prev) => prev.map((a) => (a.user_id === userId ? (data as TeacherProfileRow) : a)));
    return { error: null };
  }, []);

  return { applications, loading, error, refresh, setVerificationStatus };
};
