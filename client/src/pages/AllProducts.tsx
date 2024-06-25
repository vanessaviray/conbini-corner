import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { readAllProducts } from '../lib/read';
import { Product } from '../lib/data';

export function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function loadAllProducts() {
      try {
        const products = await readAllProducts();
        setProducts(products);
      } catch (err) {
        console.error('read error', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAllProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error! {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  const numberOfResults = products.length;

  return (
    <div className="results-container">
      <div className="section-name">Shop All Products</div>
      <div className="number-of-results">{numberOfResults} Results</div>
      <div className="products-container-category">
        {products?.map((product) => (
          <div key={product.productId} className="product-card">
            <ProductCard product={product} currentPage="AllProducts" />
          </div>
        ))}
      </div>
    </div>
  );
}
