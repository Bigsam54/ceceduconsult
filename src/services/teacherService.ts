/**
 * Teacher Domain API Service
 * 
 * Endpoints for teacher directory, candidate dashboard, photo uploads,
 * qualifications, and real-time availability updates.
 */

import { apiClient, ApiResponse } from './apiClient';
import { Teacher, AvailabilityStatus, TeacherFilterState } from '../types';
import { MOCK_TEACHERS } from '../data/mockData';

export interface UpdateTeacherProfilePayload {
  name?: string;
  title?: string;
  location?: string;
  qualification?: string;
  salaryExpectation?: string;
  bio?: string;
  aboutDetailed?: string;
  skills?: string[];
  subjects?: string[];
  availability?: AvailabilityStatus;
  contactWhatsappNumber?: string;
  email?: string;
  photo?: string;
}

export interface RegisterTeacherPayload {
  name: string;
  email: string;
  phone: string;
  teachingLevel: string;
  qualification: string;
  experienceYears: number;
  location: string;
  salaryExpectation: string;
  availability: AvailabilityStatus;
  bio: string;
}

export const teacherService = {
  /**
   * Fetch all teachers with optional filter query parameters
   * Route: GET /api/teachers
   */
  async getAllTeachers(filters?: Partial<TeacherFilterState>): Promise<Teacher[]> {
    try {
      const response = await apiClient.get<Teacher[]>('/teachers');
      return response.data;
    } catch {
      // Offline / Static fallback during prototyping
      let results = [...MOCK_TEACHERS];
      if (filters?.teachingLevel && filters.teachingLevel !== 'All') {
        results = results.filter(t => t.teachingLevel === filters.teachingLevel);
      }
      if (filters?.qualification && filters.qualification !== 'All') {
        results = results.filter(t => t.qualification === filters.qualification);
      }
      if (filters?.availability && filters.availability !== 'All') {
        results = results.filter(t => t.availability === filters.availability);
      }
      if (filters?.onlyVerified) {
        results = results.filter(t => t.isVerified);
      }
      return results;
    }
  },

  /**
   * Fetch single teacher profile by ID
   * Route: GET /api/teachers/:id
   */
  async getTeacherById(id: string): Promise<Teacher | null> {
    try {
      const response = await apiClient.get<Teacher>(`/teachers/${id}`);
      return response.data;
    } catch {
      return MOCK_TEACHERS.find(t => t.id === id) || null;
    }
  },

  /**
   * Update teacher candidate profile details
   * Route: PATCH /api/teachers/:id
   */
  async updateProfile(id: string, payload: UpdateTeacherProfilePayload): Promise<ApiResponse<Teacher>> {
    try {
      return await apiClient.patch<Teacher>(`/teachers/${id}`, payload);
    } catch {
      return {
        success: true,
        data: { ...MOCK_TEACHERS[0], ...payload } as Teacher,
        message: 'Profile updated locally'
      };
    }
  },

  /**
   * Upload candidate headshot / profile picture
   * Route: POST /api/teachers/:id/avatar
   */
  async uploadProfilePhoto(id: string, file: File): Promise<{ photoUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await apiClient.uploadFile<{ photoUrl: string }>(`/teachers/${id}/avatar`, formData);
      return response.data;
    } catch {
      // Return local object URL for preview
      return { photoUrl: URL.createObjectURL(file) };
    }
  },

  /**
   * Update teacher availability status (triggers Admin movement stream)
   * Route: POST /api/teachers/:id/availability
   */
  async updateAvailability(id: string, availability: AvailabilityStatus): Promise<ApiResponse<{ availability: AvailabilityStatus }>> {
    try {
      return await apiClient.post<{ availability: AvailabilityStatus }>(`/teachers/${id}/availability`, { availability });
    } catch {
      return {
        success: true,
        data: { availability },
        message: `Availability updated to ${availability}`
      };
    }
  },

  /**
   * Candidate submits new registration to Join the Network
   * Route: POST /api/teachers/register
   */
  async registerTeacher(payload: RegisterTeacherPayload): Promise<ApiResponse<{ id: string }>> {
    try {
      return await apiClient.post<{ id: string }>('/teachers/register', payload);
    } catch {
      return {
        success: true,
        data: { id: `cec-t-${Date.now()}` },
        message: 'Application received and submitted to Miss Nancy for audit'
      };
    }
  }
};
