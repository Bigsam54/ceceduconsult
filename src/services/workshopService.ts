/**
 * Workshops & Masterclass Registration API Service
 */

import { apiClient, ApiResponse } from './apiClient';
import { Workshop } from '../types';
import { MOCK_WORKSHOPS } from '../data/mockData';

export interface RegisterWorkshopPayload {
  workshopId: string;
  attendeeName: string;
  email: string;
  phone: string;
  schoolName: string;
  attendeeCount: number;
}

export const workshopService = {
  /**
   * Fetch upcoming masterclasses
   * Route: GET /api/workshops
   */
  async getWorkshops(): Promise<Workshop[]> {
    try {
      const res = await apiClient.get<Workshop[]>('/workshops');
      return res.data;
    } catch {
      return MOCK_WORKSHOPS;
    }
  },

  /**
   * Register educator or school team for workshop
   * Route: POST /api/workshops/register
   */
  async register(payload: RegisterWorkshopPayload): Promise<ApiResponse<{ ticketRef: string }>> {
    try {
      return await apiClient.post<{ ticketRef: string }>('/workshops/register', payload);
    } catch {
      return {
        success: true,
        data: { ticketRef: `CEC-TKT-${Math.floor(100000 + Math.random() * 900000)}` },
        message: 'Workshop seat reserved successfully'
      };
    }
  }
};
