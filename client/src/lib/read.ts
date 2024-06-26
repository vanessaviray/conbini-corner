import { Item, Product } from './data';
import { User } from '../components/UserContext';

const authKey = 'um.auth';

export function saveAuth(user: User, token: string): void {
  localStorage.setItem(authKey, JSON.stringify({ user, token }));
}

export function removeAuth(): void {
  localStorage.removeItem(authKey);
}

export function readUser(): User | undefined {
  const auth = localStorage.getItem(authKey);
  if (!auth) return undefined;
  return JSON.parse(auth).user;
}

export function readToken(): string | undefined {
  const auth = localStorage.getItem(authKey);
  if (!auth) return undefined;
  return JSON.parse(auth).token;
}

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
  const response = await fetch(`/api/category/${category}`);
  if (!response.ok) throw new Error(`fetch error, ${response.status}`);
  return await response.json();
}

export async function readSubcategory(subcategory): Promise<Product[]> {
  const response = await fetch(`/api/subcategory/${subcategory}`);
  if (!response.ok) throw new Error(`fetch error, ${response.status}`);
  return await response.json();
}

export async function readSearchResults(searchInput): Promise<Product[]> {
  const response = await fetch(`/api/searchResults/${searchInput}`);
  if (!response.ok) throw new Error(`fetch error, ${response.status}`);
  return await response.json();
}

export async function readProduct(productId: number): Promise<Product> {
  const response = await fetch(`/api/products/${productId}`);
  if (!response.ok) throw new Error(`fetch error, ${response.status}`);
  return await response.json();
}

export async function readInitialCart() {
  const token = readToken();
  const req = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch('/api/initialCart', req);
  if (!response.ok) throw new Error(`fetch error, ${response.status}`);
  return await response.json();
}

export async function insertItem(item: Item): Promise<Item> {
  const token = readToken();
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  };
  const res = await fetch('/api/shoppingCartItems', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function updateItem(item: Item): Promise<Item> {
  const token = readToken();
  const req = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  };
  const res = await fetch('/api/shoppingCartItems', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function deleteItem(productId: number): Promise<void> {
  const token = readToken();
  const req = {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await fetch(`/api/shoppingCartItems/${productId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
}
