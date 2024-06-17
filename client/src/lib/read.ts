export type Product = {
  productId: number;
  category: string;
  subcategory: string;
  name: string;
  price: number;
  description: string;
  defaultImageUrl: string;
  secondaryImageUrl: string;
  featuredProduct: boolean;
};

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
