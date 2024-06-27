import { useEffect, useState } from 'react';
import { readFeaturedProductsPreview } from '../lib/read.ts';
import { Product } from '../lib/data.ts';
import { ProductCard } from '../components/ProductCard.tsx';
import { Carousel } from '../components/Carousel.tsx';
import '../css/ProductCard.css';
import { images } from '../lib/data.ts';
import { Link } from 'react-router-dom';

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
    return (
      <div className="container">
        <div>Loading...</div>
      </div>
    );
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
        <Link to={'subcategory/Noodles'} className="card-one">
          <img src="/images/marketing/card-1.png" />
        </Link>
        <div className="carousel">
          <Carousel images={images} />
        </div>
        <div className="cards-two-and-three">
          <Link to={'category/Drinks'} className="card-two">
            <img src="/images/marketing/card-2.png" />
          </Link>
          <Link to={'subcategory/Candy'} className="card-three">
            <img className="object-cover" src="/images/marketing/card-3.png" />
          </Link>
        </div>
      </div>
      <div className="row section-heading">
        <p className="section-name">Featured Products</p>
        <Link to={'allFeaturedProducts'}>
          <button className="view-all-button">VIEW ALL</button>
        </Link>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <div key={product.productId}>
            <ProductCard product={product} currentPage="LandingPage" />
          </div>
        ))}
      </div>
    </div>
  );
}
