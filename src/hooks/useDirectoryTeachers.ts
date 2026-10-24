import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { MOCK_TEACHERS } from '../data/mockData';
import { Teacher } from '../types';
import { rowToTeacher, DirectoryTeacherRow } from '../utils/teacherMapping';

// Keep the sample profiles listed after the real ones until enough teachers are approved.
// Set to false to show only real, CEC-approved teachers.
export const SHOW_SAMPLE_TEACHERS = true;

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

  const teachers = SHOW_SAMPLE_TEACHERS ? [...realTeachers, ...MOCK_TEACHERS] : realTeachers;
  return { teachers, realTeacherCount: realTeachers.length, loading };
};
