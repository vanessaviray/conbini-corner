import { Link, useLocation } from 'react-router-dom';
import { toDollars } from '../lib/functions.ts';
import { Item, Product } from '../lib/data.ts';
import { useContext, useState } from 'react';
import { CartContext } from './CartContext.tsx';
import { insertItem, updateItem } from '../lib/read.ts';
import '../css/LandingPage.css';
import Alert from './Alert.tsx';
import { UserContext } from './UserContext.tsx';

type Props = {
  product: Product;
  currentPage: string;
};

export function ProductCard({ product, currentPage }: Props) {
  const [showAlert, setShowAlert] = useState(false);
  const { productId, name, price, defaultImageUrl } = product;
  const { addToCart, cart, updateCart } = useContext(CartContext);
  const { user, handleGuest } = useContext(UserContext);
  const location = useLocation();

  async function handleAddToCart() {
    if (!user) {
      handleGuest();
    }

    if (!product) throw new Error('product is undefined');
    try {
      const newItem: Item = {
        quantity: 1,
        ...product,
      };

      let itemExists = false;

      for (let i = 0; i < cart.length; i++) {
        if (productId && +productId === cart[i].productId) {
          newItem.quantity = cart[i].quantity + 1;
          updateCart(newItem);
          await updateItem(newItem);
          handleShowAlert();
          itemExists = true;
          break;
        }
      }

      if (!itemExists) {
        await insertItem(newItem);
        addToCart(newItem);
        handleShowAlert();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1000);
  };

  let productCardClass = '';

  if (currentPage === 'LandingPage') {
    productCardClass = 'product-container';
  } else {
    productCardClass = 'product-container-category';
  }

  const detailsLink = location.pathname.includes('category')
    ? `/category/details/${productId}`
    : `/details/${productId}`;

  return (
    <div className={productCardClass}>
      <Link to={detailsLink}>
        <div className="image-wrapper">
          <img src={defaultImageUrl} className="product-image" alt={name} />
        </div>
      </Link>
      <div className="product-text-and-button">
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          ADD TO CART
        </button>
        {showAlert && (
          <Alert message={'Item was added to cart.'} duration={1500} />
        )}
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
