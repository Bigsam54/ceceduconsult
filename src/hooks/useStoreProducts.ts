import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { LearningProduct } from '../types';

interface ProductRow {
  id: string;
  name: string;
  category: string;
  price: number;
  price_display: string | null;
  rating: number;
  reviews: number;
  image: string;
  images: string[] | null;
  description: string;
  in_stock: boolean;
  age_group: string;
  is_featured: boolean;
  specs: string | null;
}

const rowToProduct = (r: ProductRow): LearningProduct => ({
  id: r.id,
  name: r.name,
  category: r.category,
  price: r.price,
  priceDisplay: r.price_display ?? undefined,
  rating: r.rating,
  reviews: r.reviews,
  image: r.image,
  images: r.images ?? undefined,
  description: r.description,
  inStock: r.in_stock,
  ageGroup: r.age_group,
  isFeatured: r.is_featured,
  specs: r.specs ?? undefined
});

export type ProductInput = Omit<LearningProduct, 'id'>;

const toRow = (p: ProductInput) => ({
  name: p.name,
  category: p.category,
  price: p.price,
  price_display: p.priceDisplay ?? null,
  rating: p.rating,
  reviews: p.reviews,
  image: p.image,
  images: p.images ?? [],
  description: p.description,
  in_stock: p.inStock,
  age_group: p.ageGroup,
  is_featured: p.isFeatured,
  specs: p.specs ?? null
});

export const useStoreProducts = () => {
  const [products, setProducts] = useState<LearningProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('store_products')
      .select('*')
      .order('created_at', { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setError(null);
      setProducts((data as ProductRow[]).map(rowToProduct));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createProduct = useCallback(async (input: ProductInput) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { error: insertError } = await supabase.from('store_products').insert(toRow(input));
    if (insertError) return { error: insertError.message };
    await refresh();
    return { error: null };
  }, [refresh]);

  const updateProduct = useCallback(async (id: string, input: ProductInput) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { error: updateError } = await supabase.from('store_products').update(toRow(input)).eq('id', id);
    if (updateError) return { error: updateError.message };
    await refresh();
    return { error: null };
  }, [refresh]);

  const deleteProduct = useCallback(async (id: string) => {
    if (!supabase) return { error: 'Backend not connected yet.' };
    const { error: deleteError } = await supabase.from('store_products').delete().eq('id', id);
    if (deleteError) return { error: deleteError.message };
    await refresh();
    return { error: null };
  }, [refresh]);

  return { products, loading, error, createProduct, updateProduct, deleteProduct };
};
