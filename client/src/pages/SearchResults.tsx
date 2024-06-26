import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../lib/data';
import { useParams } from 'react-router-dom';
import '../css/Results.css';
import { readSearchResults } from '../lib/read';

export function SearchResults() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  const { searchInput } = useParams<{ searchInput: string }>();

  useEffect(() => {
    async function loadSearchResults() {
      try {
        const products = await readSearchResults(searchInput);
        setProducts(products);
      } catch (err) {
        console.error('read error', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSearchResults();
  }, [searchInput]);

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
      <div className="section-name">Search Results</div>
      <p className="ml-4">for "{searchInput}"</p>
      <div className="number-of-results">{numberOfResults} Results</div>
      <div className="products-container-category">
        {products?.map((product) => (
          <div key={product.productId} className="product-card">
            <ProductCard product={product} currentPage="Category" />
          </div>
        ))}
      </div>
    </div>
  );
}
