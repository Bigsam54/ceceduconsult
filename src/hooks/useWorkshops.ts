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

export type WorkshopInput = Omit<Workshop, 'id'>;

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

  const createWorkshop = useCallback(async (input: WorkshopInput) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { error: insertError } = await supabase.from('workshops').insert(toRow(input));
    if (insertError) return { error: insertError.message };
    await refresh();
    return { error: null };
  }, [refresh]);

  const updateWorkshop = useCallback(async (id: string, input: WorkshopInput) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { error: updateError } = await supabase.from('workshops').update(toRow(input)).eq('id', id);
    if (updateError) return { error: updateError.message };
    await refresh();
    return { error: null };
  }, [refresh]);

  const deleteWorkshop = useCallback(async (id: string) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { error: deleteError } = await supabase.from('workshops').delete().eq('id', id);
    if (deleteError) return { error: deleteError.message };
    await refresh();
    return { error: null };
  }, [refresh]);

  return { workshops, loading, error, createWorkshop, updateWorkshop, deleteWorkshop };
};
