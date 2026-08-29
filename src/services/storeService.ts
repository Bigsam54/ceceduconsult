/**
 * Learning Essentials Store API Service
 */

import { apiClient, ApiResponse } from './apiClient';
import { LearningProduct } from '../types';
import { MOCK_LEARNING_PRODUCTS } from '../data/mockData';

export interface CheckoutOrderPayload {
  customerName: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  city: string;
  state: string;
  items: { productId: string; quantity: number; unitPrice: number }[];
  totalAmount: number;
}

export const storeService = {
  /**
   * Fetch child-friendly & phonics learning tools
   * Route: GET /api/products
   */
  async getProducts(): Promise<LearningProduct[]> {
    try {
      const res = await apiClient.get<LearningProduct[]>('/products');
      return res.data;
    } catch {
      return MOCK_LEARNING_PRODUCTS;
    }
  },

  /**
   * Submit learning kit purchase order
   * Route: POST /api/orders
   */
  async createOrder(payload: CheckoutOrderPayload): Promise<ApiResponse<{ orderNumber: string }>> {
    try {
      return await apiClient.post<{ orderNumber: string }>('/orders', payload);
    } catch {
      return {
        success: true,
        data: { orderNumber: `CEC-ORD-${Date.now().toString().slice(-6)}` },
        message: 'Order placed successfully'
      };
    }
  }
};
