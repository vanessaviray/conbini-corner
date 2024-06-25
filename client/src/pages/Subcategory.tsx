import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { readSubcategory } from '../lib/read';
import { Product } from '../lib/data';
import { useParams } from 'react-router-dom';
import '../css/Results.css';

export function Subcategory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  const { subcategoryName } = useParams<{ subcategoryName: string }>();

  useEffect(() => {
    async function loadSubcategory() {
      try {
        const products = await readSubcategory(subcategoryName);
        setProducts(products);
      } catch (err) {
        console.error('read error', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSubcategory();
  }, [subcategoryName]);

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
      <div className="section-name">{subcategoryName}</div>
      <div className="number-of-results">{numberOfResults} Results</div>
      <div className="products-container-category">
        {products?.map((product) => (
          <div key={product.productId} className="product-card">
            <ProductCard product={product} currentPage="Subcategory" />
          </div>
        ))}
      </div>
    </div>
  );
}
