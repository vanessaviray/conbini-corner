import { useEffect, useState } from 'react';
import { readFeaturedProductsPreview } from './lib/read.ts';
import { Product } from './lib/read.ts';
import { Link } from 'react-router-dom';
import { toDollars } from './lib/to-dollars.ts';
import './ProductCard.css';

type Props = {
  product: Product;
};

export function LandingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function loadFeaturedProducts() {
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
    loadFeaturedProducts();
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
      <div className="row category-heading">
        <p className="category-name">Featured Products</p>
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

function ProductCard({ product }: Props) {
  const { productId, name, price, defaultImageUrl } = product;

  return (
    <Link to={`details/${productId}`}>
      <div className="product-container">
        <div className="image-wrapper">
          <img src={defaultImageUrl} className="product-image" alt={name} />
        </div>
        <div className="product-text-and-button">
          <button className="add-to-cart-button">ADD TO CART</button>
          <div className="product-text">
            <h5 className="product-name">{name}</h5>
            <p className="product-price">{toDollars(price)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
