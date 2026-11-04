import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Workshop } from '../types';

interface WorkshopRow {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  price: string;
  available_seats: number;
  total_seats: number;
  description: string;
  image: string;
}

const rowToWorkshop = (r: WorkshopRow): Workshop => ({
  id: r.id,
  title: r.title,
  category: r.category as Workshop['category'],
  date: r.date,
  time: r.time,
  venue: r.venue,
  price: r.price,
  availableSeats: r.available_seats,
  totalSeats: r.total_seats,
  description: r.description,
  image: r.image
});

// meetingLink is private (admin only) and stored separately from the public workshop row
export type WorkshopInput = Omit<Workshop, 'id'> & { meetingLink?: string };

const toRow = (w: WorkshopInput) => ({
  title: w.title,
  category: w.category,
  date: w.date,
  time: w.time,
  venue: w.venue,
  price: w.price,
  available_seats: w.availableSeats,
  total_seats: w.totalSeats,
  description: w.description,
  image: w.image
});

export const useWorkshops = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('workshops')
      .select('*')
      .order('created_at', { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setError(null);
      setWorkshops((data as WorkshopRow[]).map(rowToWorkshop));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const saveMeetingLink = async (workshopId: string, meetingLink: string | undefined) => {
    if (!supabase || meetingLink === undefined) return null;
    const { error: linkError } = await supabase
      .from('workshop_meeting_links')
      .upsert({ workshop_id: workshopId, meeting_link: meetingLink.trim(), updated_at: new Date().toISOString() });
    return linkError ? linkError.message : null;
  };

  const createWorkshop = useCallback(async (input: WorkshopInput) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { data, error: insertError } = await supabase.from('workshops').insert(toRow(input)).select('id').single();
    if (insertError) return { error: insertError.message };
    const linkError = await saveMeetingLink((data as { id: string }).id, input.meetingLink);
    await refresh();
    return { error: linkError };
  }, [refresh]);

  const updateWorkshop = useCallback(async (id: string, input: WorkshopInput) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { error: updateError } = await supabase.from('workshops').update(toRow(input)).eq('id', id);
    if (updateError) return { error: updateError.message };
    const linkError = await saveMeetingLink(id, input.meetingLink);
    await refresh();
    return { error: linkError };
  }, [refresh]);

  const deleteWorkshop = useCallback(async (id: string) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { error: deleteError } = await supabase.from('workshops').delete().eq('id', id);
    if (deleteError) return { error: deleteError.message };
    await refresh();
    return { error: null };
  }, [refresh]);

  /** Admin only: the private meeting link for an online workshop */
  const getMeetingLink = useCallback(async (id: string) => {
    if (!supabase) return '';
    const { data } = await supabase.from('workshop_meeting_links').select('meeting_link').eq('workshop_id', id).maybeSingle();
    return (data?.meeting_link as string | undefined) ?? '';
  }, []);

  return { workshops, loading, error, createWorkshop, updateWorkshop, deleteWorkshop, getMeetingLink };
};

export interface WorkshopRegistration {
  name: string;
  email: string;
  phone: string;
  organization: string;
  quantity: number;
}

/**
 * Registers a visitor (saved to the admin inbox, seats reserved) and returns the
 * workshop's meeting link if it has one, so online attendees get it straight away.
 */
export const registerForWorkshop = async (
  workshopId: string,
  registration: WorkshopRegistration
): Promise<{ meetingLink: string; emailRequested: boolean; error: string | null }> => {
  if (!supabase) return { meetingLink: '', emailRequested: false, error: 'Backend not connected yet.' };
  const { data, error } = await supabase.rpc('register_for_workshop', {
    p_workshop_id: workshopId,
    p_name: registration.name,
    p_email: registration.email,
    p_phone: registration.phone,
    p_organization: registration.organization,
    p_quantity: registration.quantity
  });
  if (error) return { meetingLink: '', emailRequested: false, error: error.message };

  const result = (data ?? {}) as { registration_id?: string; meeting_link?: string };
  const meetingLink = result.meeting_link ?? '';

  // Ask the server to email the confirmation (and join link). It only ever emails the
  // address saved on this fresh registration, once; failures don't affect the registration.
  const emailRequested = Boolean(registration.email.trim() && result.registration_id);
  if (emailRequested) {
    fetch('/api/workshop-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registrationId: result.registration_id })
    }).catch((err) => console.error('Could not request confirmation email', err));
  }

  return { meetingLink, emailRequested, error: null };
};
