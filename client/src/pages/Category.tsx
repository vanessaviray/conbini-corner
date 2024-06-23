import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { readCategory } from '../lib/read';
import { Product } from '../lib/data';
import { useParams } from 'react-router-dom';

export function Category() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  const { categoryName } = useParams<{ categoryName: string }>();

  useEffect(() => {
    async function loadSnacks() {
      try {
        const products = await readCategory(categoryName);
        setProducts(products);
      } catch (err) {
        console.error('read error', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSnacks();
  }, [products]);

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
    <div>
      <div className="section-name">{categoryName}</div>
      <div className="number-of-results">{numberOfResults} Results</div>
      <div className="products-container">
        {products?.map((product) => (
          <div key={product.productId}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
