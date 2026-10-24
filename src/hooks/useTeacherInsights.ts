import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

/** The signed-in teacher's real profile views (last 30 days) and how many schools requested them */
export const useTeacherInsights = () => {
  const { session } = useAuth();
  const [viewDates, setViewDates] = useState<string[]>([]);
  const [requestCount, setRequestCount] = useState<number | null>(null);

  useEffect(() => {
    const userId = session?.user?.id;
    if (!supabase || !userId) return;
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    supabase
      .from('teacher_profile_views')
      .select('viewed_at')
      .eq('teacher_id', userId)
      .gte('viewed_at', since)
      .then(({ data }) => setViewDates((data ?? []).map((r) => r.viewed_at as string)));

    supabase.rpc('my_school_request_count').then(({ data, error }) => {
      if (!error) setRequestCount((data as number) ?? 0);
    });
  }, [session?.user?.id]);

  // Views per day for the last 7 days, oldest first
  const weekStart = new Date();
  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(weekStart.getDate() - 6);
  const dailyViews = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    const next = new Date(day);
    next.setDate(day.getDate() + 1);
    return {
      day: day.toLocaleDateString('en-GB', { weekday: 'short' }),
      views: viewDates.filter((d) => {
        const t = new Date(d).getTime();
        return t >= day.getTime() && t < next.getTime();
      }).length
    };
  });

  return {
    views30Days: viewDates.length,
    views7Days: dailyViews.reduce((sum, d) => sum + d.views, 0),
    dailyViews,
    requestCount
  };
};
