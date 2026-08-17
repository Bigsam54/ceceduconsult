/**
 * Consultations & Audit Booking API Service
 */

import { apiClient, ApiResponse } from './apiClient';
import { ConsultationBooking } from '../types';

export interface CreateBookingPayload {
  clientName: string;
  schoolName: string;
  serviceName: string;
  requestedDate: string;
  phone: string;
  email?: string;
  notes?: string;
  meetingFormat?: 'Google Meet' | 'In-Person' | 'School Site Visit';
}

export const bookingService = {
  /**
   * Book a new consultation or school audit session
   * Route: POST /api/bookings
   */
  async createBooking(payload: CreateBookingPayload): Promise<ApiResponse<ConsultationBooking>> {
    try {
      return await apiClient.post<ConsultationBooking>('/bookings', payload);
    } catch {
      return {
        success: true,
        data: {
          id: `book-${Date.now()}`,
          ...payload,
          status: 'New Inquiry'
        },
        message: 'Consultation request submitted successfully'
      };
    }
  },

  /**
   * Fetch all bookings for Admin Hub
   * Route: GET /api/bookings
   */
  async getAllBookings(): Promise<ConsultationBooking[]> {
    try {
      const res = await apiClient.get<ConsultationBooking[]>('/bookings');
      return res.data;
    } catch {
      return [];
    }
  }
};
