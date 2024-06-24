import { Item, Product } from './data';

export async function readAllProducts(): Promise<Product[]> {
  const response = await fetch('/api/allProducts');
  if (!response.ok) throw new Error(`fetch error, ${response.status}`);
  return await response.json();
}

export async function readFeaturedProductsPreview(): Promise<Product[]> {
  const response = await fetch('/api/featuredProductsPreview');
  if (!response.ok) throw new Error(`fetch error, ${response.status}`);
  return await response.json();
}

export async function readFeaturedProductsAll(): Promise<Product[]> {
  const response = await fetch('/api/featuredProductsAll');
  if (!response.ok) throw new Error(`fetch error, ${response.status}`);
  return await response.json();
}

export async function readCategory(category): Promise<Product[]> {
  const response = await fetch(`/api/${category}`);
  if (!response.ok) throw new Error(`fetch error, ${response.status}`);
  return await response.json();
}

export async function readSubcategory(subcategory): Promise<Product[]> {
  const response = await fetch(`/api/subcategory/${subcategory}`);
  if (!response.ok) throw new Error(`fetch error, ${response.status}`);
  return await response.json();
}

export async function readProduct(productId: number): Promise<Product> {
  const response = await fetch(`/api/products/${productId}`);
  if (!response.ok) throw new Error(`fetch error, ${response.status}`);
  return await response.json();
}

export async function readInitialCart() {
  const response = await fetch('/api/initialCart');
  if (!response.ok) throw new Error(`fetch error, ${response.status}`);
  return await response.json();
}

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

export async function deleteItem(productId: number): Promise<void> {
  const req = {
    method: 'DELETE',
  };
  const res = await fetch(`/api/shoppingCartItems/${productId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
