import { useContext, useEffect, useState } from 'react';
import { deleteItem, readProduct, updateItem } from '../lib/read';
import { Product, Item } from '../lib/data';
import '../css/ShoppingCartItem.css';
import { toDollars } from '../lib/functions';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { CartContext } from './CartContext';

type Props = {
  productId: number;
  quantity: number;
};

export function ShoppingCartItem({ productId, quantity }: Props) {
  const { removeFromCart, updateCart } = useContext(CartContext);

  const [product, setProduct] = useState<Product>();

  async function loadProduct(productId: number) {
    try {
      const product = await readProduct(productId);
      setProduct(product);
    } catch (err) {
      console.error('read error', err);
    }
  }

  useEffect(() => {
    if (productId) {
      loadProduct(productId);
    }
  }, [productId]);

  function handleRemoveItem(product) {
    if (!product?.productId) throw new Error('Should never happen');
    deleteItem(product.productId);
    removeFromCart(product);
  }

  async function handleIncrement(product) {
    try {
      quantity += 1;
      const newItem: Item = {
        quantity,
        ...product,
      };
      updateCart(newItem);
      await updateItem(newItem);
    } catch (err) {
      console.error('Error updating item in cart:', err);
    }
  }

  async function handleDecrement(product) {
    try {
      quantity -= 1;
      if (quantity === 0) {
        deleteItem(product.productId);
        removeFromCart(product);
      } else {
        const newItem: Item = {
          quantity,
          ...product,
        };
        updateCart(newItem);
        await updateItem(newItem);
      }
    } catch (err) {
      console.error('Error updating item in cart:', err);
    }
  }

  if (!product) {
    return <div>Your shopping cart is empty</div>;
  }

  return (
    <>
      <div className="row item-container">
        <div className="cart-image-wrapper">
          <img className="cart-image" src={product.defaultImageUrl} />
        </div>
        <div className="item-info row">
          <div className="name-price-remove">
            <p className="item-name">{product.name}</p>
            <p className="item-price">{toDollars(product.price)}</p>
            <button
              className="remove-item-button"
              onClick={() => handleRemoveItem(product)}>
              Remove
            </button>
          </div>
          <div className="quantity-button-subtotal">
            <p className="quantity-label">Quantity</p>
            <div className="quantity-container row">
              <div
                className="minus-icon"
                onClick={() => handleDecrement(product)}>
                <LuMinus />
              </div>
              <div className="number-container">
                <p>{quantity}</p>
              </div>
              <div
                className="plus-icon"
                onClick={() => handleIncrement(product)}>
                <LuPlus />
              </div>
            </div>
            <div className="subtotal-row row">
              <p>Subtotal:</p>
              <p className="item-subtotal">
                {toDollars(product.price * quantity)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="item-line"></div>
    </>
  );
}
