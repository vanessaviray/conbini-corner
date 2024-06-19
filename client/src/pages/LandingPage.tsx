import { useEffect, useState } from 'react';
import { readFeaturedProductsPreview } from '../lib/read.ts';
import { Product } from '../lib/data.ts';
import { ProductCard } from '../components/ProductCard.tsx';
import { Carousel } from '../components/Carousel.tsx';
import '../css/ProductCard.css';
import { images } from '../lib/data.ts';

export function LandingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function loadFeaturedProductsPreview() {
      try {
        const products = await readFeaturedProductsPreview();
        setProducts(products);
      } catch (err) {
        console.error('read error', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadFeaturedProductsPreview();
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

  return (
    <div className="landing-page">
      <div className="hero-section row">
        <div className="card-one">
          <img src="/images/marketing/card-1.png" />
        </div>
        <div className="carousel">
          <Carousel images={images} />
        </div>
        <div className="cards-two-and-three">
          <div className="card-two">
            <img src="/images/marketing/card-2.png" />
          </div>
          <div className="card-three">
            <img className="object-cover" src="/images/marketing/card-3.png" />
          </div>
        </div>
      </div>
      <div className="row section-heading">
        <p className="section-name">Featured Products</p>
        <button className="view-all-button">VIEW ALL</button>
      </div>
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
