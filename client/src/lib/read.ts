import { Product } from './data';

export async function readFeaturedProductsPreview(): Promise<Product[]> {
  const response = await fetch('/api/featuredProductsPreview');
  if (!response.ok) throw new Error(`fetch error, ${response.status}`);
  return await response.json();
}

export async function readProduct(productId: number): Promise<Product> {
  const response = await fetch(`/api/products/${productId}`);
  if (!response.ok) throw new Error(`fetch error, ${response.status}`);
  return await response.json();
}

export type Item = {
  productId: number;
  quantity: number;
};

export async function insertItem(item: Item): Promise<Item> {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  };
  const res = await fetch('/api/shoppingCartItems', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function updateItem(item: Item): Promise<Item> {
  const req = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  };
  const res = await fetch('/api/shoppingCartItems', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
