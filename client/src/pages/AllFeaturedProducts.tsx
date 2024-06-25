import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { readFeaturedProductsAll } from '../lib/read';
import { Product } from '../lib/data';

export function AllFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function loadAllFeaturedProducts() {
      try {
        const products = await readFeaturedProductsAll();
        setProducts(products);
      } catch (err) {
        console.error('read error', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAllFeaturedProducts();
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
      <div className="section-name">Featured Products</div>
      <div className="number-of-results">{numberOfResults} Results</div>
      <div className="products-container-category">
        {products?.map((product) => (
          <div key={product.productId} className="product-card">
            <ProductCard product={product} currentPage="FeaturedProducts" />
          </div>
        ))}
      </div>
    </div>
  );
}
