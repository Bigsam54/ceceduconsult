import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { MOCK_TEACHERS } from '../data/mockData';
import { Teacher } from '../types';
import { rowToTeacher, DirectoryTeacherRow } from '../utils/teacherMapping';

// Sample profiles are listed after the real ones until enough teachers are approved,
// then they disappear automatically. Set SHOW_SAMPLE_TEACHERS to false to hide them now.
export const SHOW_SAMPLE_TEACHERS = true;
export const HIDE_SAMPLES_AT_REAL_TEACHERS = 6;

/** Public directory: CEC-approved registered teachers first, then the sample profiles */
export const useDirectoryTeachers = () => {
  const [realTeachers, setRealTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;

    supabase
      .from('public_teacher_directory')
      .select('*')
      .order('verified_at', { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        // If the view isn't set up yet, quietly fall back to the samples
        if (!error && data) {
          setRealTeachers((data as DirectoryTeacherRow[]).map(rowToTeacher));
        }
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const showSamples = SHOW_SAMPLE_TEACHERS && realTeachers.length < HIDE_SAMPLES_AT_REAL_TEACHERS;
  const teachers = showSamples ? [...realTeachers, ...MOCK_TEACHERS] : realTeachers;
  return { teachers, realTeacherCount: realTeachers.length, loading };
};
