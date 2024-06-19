import { Link } from 'react-router-dom';
import { toDollars } from '../lib/functions.ts';
import { Product } from '../lib/data.ts';
import { useContext } from 'react';
import { CartContext } from './CartContext.tsx';
import { Item, insertItem, updateItem } from '../lib/read.ts';
import '../css/LandingPage.css';

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const { productId, name, price, defaultImageUrl } = product;
  const { addToCart, cart, updateCart } = useContext(CartContext);

  async function handleAddToCart() {
    if (!product) throw new Error('product is undefined');
    try {
      const newItem: Item = {
        productId: product.productId,
        quantity: 1,
      };

      let itemExists = false;

      for (let i = 0; i < cart.length; i++) {
        if (productId && +productId === cart[i].productId) {
          newItem.quantity = cart[i].quantity + 1;
          updateCart(newItem);
          await updateItem(newItem);
          itemExists = true;
          break;
        }
      }

      if (!itemExists) {
        await insertItem(newItem);
        addToCart(newItem);
      }

      // await insertItem(newItem);
      // addToCart(newItem);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  return (
    <div className="product-container">
      <Link to={`details/${productId}`}>
        <div className="image-wrapper">
          <img src={defaultImageUrl} className="product-image" alt={name} />
        </div>
      </Link>
      <div className="product-text-and-button">
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          ADD TO CART
        </button>
        <Link to={`details/${productId}`}>
          <div className="product-text">
            <h5 className="product-name">{name}</h5>
            <p className="product-price">{toDollars(price)}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
