import { Link } from 'react-router-dom';
import { toDollars } from '../lib/to-dollars.ts';
import { Product } from '../lib/read.ts';
import '../css/LandingPage.css';

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
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
