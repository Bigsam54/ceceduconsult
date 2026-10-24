import { supabase } from '../lib/supabaseClient';

export type InquiryKind = 'consultation' | 'workshop' | 'contact' | 'teacher_request' | 'product';
export type InquiryStatus = 'new' | 'in_progress' | 'scheduled' | 'completed' | 'closed';

export interface InquiryRow {
  id: string;
  kind: InquiryKind;
  status: InquiryStatus;
  name: string;
  email: string;
  phone: string;
  organization: string;
  subject: string;
  message: string;
  preferred_date: string;
  meeting_format: string;
  reference_id: string;
  quantity: number;
  admin_notes: string;
  created_at: string;
  updated_at: string;
}

export interface InquiryInput {
  kind: InquiryKind;
  name?: string;
  email?: string;
  phone?: string;
  organization?: string;
  subject?: string;
  message?: string;
  preferredDate?: string;
  meetingFormat?: string;
  referenceId?: string;
  quantity?: number;
}

/**
 * Saves a public form submission to the admin inbox. Never throws: the public
 * flow (thank-you screen, WhatsApp hand-off) carries on even if saving fails.
 */
export const submitInquiry = async (input: InquiryInput): Promise<{ error: string | null }> => {
  if (!supabase) return { error: 'Backend not connected.' };

  const { error } = await supabase.from('inquiries').insert({
    kind: input.kind,
    name: input.name?.trim() ?? '',
    email: input.email?.trim() ?? '',
    phone: input.phone?.trim() ?? '',
    organization: input.organization?.trim() ?? '',
    subject: input.subject?.trim() ?? '',
    message: input.message?.trim() ?? '',
    preferred_date: input.preferredDate ?? '',
    meeting_format: input.meetingFormat ?? '',
    reference_id: input.referenceId ?? '',
    quantity: Math.min(Math.max(input.quantity ?? 1, 1), 100)
  });

  if (error) {
    console.error('Could not save inquiry', error);
    return { error: error.message };
  }
  return { error: null };
};

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Counts a public profile view for registered teachers (sample profiles are skipped) */
export const recordProfileView = (teacherId: string) => {
  if (!supabase || !UUID_PATTERN.test(teacherId)) return;
  supabase.from('teacher_profile_views').insert({ teacher_id: teacherId }).then(({ error }) => {
    if (error) console.error('Could not record profile view', error);
  });
};
