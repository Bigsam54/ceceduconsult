import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { InquiryRow, InquiryStatus } from '../services/inquiryService';

// Admin-only data (RLS restricts every table here to admins).

export interface ActivityRow {
  id: string;
  teacher_id: string | null;
  teacher_name: string;
  event: 'registered' | 'availability_changed' | 'verification_changed' | 'note';
  previous_value: string;
  new_value: string;
  changed_by: string;
  note: string;
  created_at: string;
}

export interface AppointmentRow {
  id: string;
  title: string;
  client_name: string;
  organization: string;
  phone: string;
  appointment_date: string;
  start_time: string;
  kind: string;
  format: string;
  meeting_link: string;
  notes: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  inquiry_id: string | null;
  created_at: string;
}

export type AppointmentInput = Omit<AppointmentRow, 'id' | 'created_at'>;

export interface BroadcastRow {
  id: string;
  title: string;
  body: string;
  audience: 'teachers';
  created_at: string;
}

/** Loads a table ordered by a column, with a refresh function and a shared error state */
const useTable = <T,>(table: string, orderBy: string, ascending = false, limit?: number) => {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    let query = supabase.from(table).select('*').order(orderBy, { ascending });
    if (limit) query = query.limit(limit);
    const { data, error: fetchError } = await query;
    if (fetchError) {
      setError(fetchError.message);
    } else {
      setError(null);
      setRows((data ?? []) as T[]);
    }
    setLoading(false);
  }, [table, orderBy, ascending, limit]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { rows, setRows, loading, error, refresh };
};

export const useInquiries = () => {
  const { rows, setRows, loading, error, refresh } = useTable<InquiryRow>('inquiries', 'created_at');

  const updateInquiry = useCallback(async (id: string, updates: Partial<Pick<InquiryRow, 'status' | 'admin_notes'>>) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { data, error: updateError } = await supabase.from('inquiries').update(updates).eq('id', id).select('*').single();
    if (updateError) return { error: updateError.message };
    setRows((prev) => prev.map((r) => (r.id === id ? (data as InquiryRow) : r)));
    return { error: null };
  }, [setRows]);

  const deleteInquiry = useCallback(async (id: string) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { error: deleteError } = await supabase.from('inquiries').delete().eq('id', id);
    if (deleteError) return { error: deleteError.message };
    setRows((prev) => prev.filter((r) => r.id !== id));
    return { error: null };
  }, [setRows]);

  return { inquiries: rows, loading, error, refresh, updateInquiry, deleteInquiry };
};

export const useActivityLog = () => {
  const { rows, loading, error, refresh } = useTable<ActivityRow>('teacher_activity_log', 'created_at', false, 300);

  const addNote = useCallback(async (teacherId: string, teacherName: string, note: string) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { error: insertError } = await supabase.from('teacher_activity_log').insert({
      teacher_id: teacherId,
      teacher_name: teacherName,
      event: 'note',
      changed_by: 'admin',
      note
    });
    if (insertError) return { error: insertError.message };
    await refresh();
    return { error: null };
  }, [refresh]);

  return { activity: rows, loading, error, refresh, addNote };
};

export const useAppointments = () => {
  const { rows, setRows, loading, error, refresh } = useTable<AppointmentRow>('admin_appointments', 'appointment_date', true);

  const createAppointment = useCallback(async (input: AppointmentInput) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { error: insertError } = await supabase.from('admin_appointments').insert(input);
    if (insertError) return { error: insertError.message };
    await refresh();
    return { error: null };
  }, [refresh]);

  const updateAppointment = useCallback(async (id: string, updates: Partial<AppointmentInput>) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { data, error: updateError } = await supabase.from('admin_appointments').update(updates).eq('id', id).select('*').single();
    if (updateError) return { error: updateError.message };
    setRows((prev) => prev.map((r) => (r.id === id ? (data as AppointmentRow) : r)));
    return { error: null };
  }, [setRows]);

  const deleteAppointment = useCallback(async (id: string) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { error: deleteError } = await supabase.from('admin_appointments').delete().eq('id', id);
    if (deleteError) return { error: deleteError.message };
    setRows((prev) => prev.filter((r) => r.id !== id));
    return { error: null };
  }, [setRows]);

  return { appointments: rows, loading, error, refresh, createAppointment, updateAppointment, deleteAppointment };
};

/** Readable by any signed-in user (teacher dashboards show these); writable by admins */
export const useBroadcasts = () => {
  const { rows, setRows, loading, error, refresh } = useTable<BroadcastRow>('broadcasts', 'created_at');

  const sendBroadcast = useCallback(async (title: string, body: string) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { error: insertError } = await supabase.from('broadcasts').insert({ title, body, audience: 'teachers' });
    if (insertError) return { error: insertError.message };
    await refresh();
    return { error: null };
  }, [refresh]);

  const deleteBroadcast = useCallback(async (id: string) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { error: deleteError } = await supabase.from('broadcasts').delete().eq('id', id);
    if (deleteError) return { error: deleteError.message };
    setRows((prev) => prev.filter((r) => r.id !== id));
    return { error: null };
  }, [setRows]);

  return { broadcasts: rows, loading, error, refresh, sendBroadcast, deleteBroadcast };
};

/** Total public profile views across all teachers (admin) */
export const useProfileViewTotal = () => {
  const [total, setTotal] = useState<number | null>(null);
  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('teacher_profile_views')
      .select('id', { count: 'exact', head: true })
      .then(({ count }) => setTotal(count ?? 0));
  }, []);
  return total;
};

export const INQUIRY_STATUSES: InquiryStatus[] = ['new', 'in_progress', 'scheduled', 'completed', 'closed'];
