/**
 * CEC Educational Consults - Universal API Client
 * 
 * Designed for immediate backend handover.
 * Configured with environment variable fallback, token authorization header interceptor,
 * and unified error normalization for REST API endpoints.
 */

const API_BASE_URL = ((import.meta as any).env?.VITE_API_BASE_URL as string) || '/api';

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    // Auto load token from localStorage if present
    if (typeof window !== 'undefined') {
      try {
        this.token = localStorage.getItem('cec_auth_token');
      } catch {
        this.token = null;
      }
    }
  }

  public setToken(token: string | null) {
    this.token = token;
    try {
      if (token) {
        localStorage.setItem('cec_auth_token', token);
      } else {
        localStorage.removeItem('cec_auth_token');
      }
    } catch {
      // Storage unavailable in sandbox
    }
  }

  public getToken(): string | null {
    return this.token;
  }

  private getHeaders(customHeaders: HeadersInit = {}): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...((customHeaders as Record<string, string>) || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  public async get<T>(endpoint: string, headers: HeadersInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
      headers: this.getHeaders(headers),
    });
  }

  public async post<T>(endpoint: string, body?: any, headers: HeadersInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      headers: this.getHeaders(headers),
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public async put<T>(endpoint: string, body?: any, headers: HeadersInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      headers: this.getHeaders(headers),
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public async patch<T>(endpoint: string, body?: any, headers: HeadersInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      headers: this.getHeaders(headers),
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public async delete<T>(endpoint: string, headers: HeadersInit = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      headers: this.getHeaders(headers),
    });
  }

  public async uploadFile<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const headers: Record<string, string> = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'File upload failed' }));
      throw new Error(errorData.message || `Upload failed with status ${response.status}`);
    }

    return response.json();
  }

  private async request<T>(endpoint: string, options: RequestInit): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        let errorMessage = `HTTP Error ${response.status}`;
        try {
          const errData = await response.json();
          errorMessage = errData.message || errorMessage;
        } catch {
          // ignore parsing error
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (err: any) {
      // In development / demo mode, client falls back gracefully
      console.warn(`[ApiClient] Request to ${endpoint} failed:`, err.message);
      throw err;
    }
  }
}

export const apiClient = new ApiClient();
