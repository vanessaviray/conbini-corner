import { useContext, useEffect, useState } from 'react';
import { deleteItem, readProduct, updateItem } from '../lib/read';
import { Product, Item } from '../lib/data';
import '../css/ShoppingCartItem.css';
import { toDollars } from '../lib/functions';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { CartContext } from './CartContext';
import { Modal } from './Modal';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

type Props = {
  productId: number;
  quantity: number;
};

export function ShoppingCartItem({ productId, quantity }: Props) {
  const { removeFromCart, updateCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>();
  const [isOpen, setIsOpen] = useState(false);

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

  async function handleRemoveItem(product) {
    if (!product?.productId) throw new Error('Should never happen');
    try {
      await deleteItem(product.productId);
      removeFromCart(product);
    } catch (err) {
      console.log(err);
      alert('unable to delete the item');
    }
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
        setIsOpen(true);
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
    return <div className="ml-3">Your item is loading...</div>;
  }

  function handleConfirm() {
    handleRemoveItem(product);
    setIsOpen(false);
  }

  return (
    <div className="shopping-cart-container">
      <div className="row item-container">
        <div
          className="cart-image-wrapper cursor-pointer"
          onClick={() => {
            navigate(`/details/${productId}`);
          }}>
          <img className="cart-image" src={product.defaultImageUrl} />
        </div>
        <div className="item-info row">
          <div className="name-price-remove">
            <div
              className="cursor-pointer"
              onClick={() => {
                navigate(`/details/${productId}`);
              }}>
              <p className="item-name">{product.name}</p>
              <p className="item-price">{toDollars(product.price)}</p>
            </div>
            <button
              className="remove-item-button"
              onClick={() => {
                setIsOpen(true);
              }}>
              Remove
            </button>
            <Modal
              modalContainer="remove-modal-container"
              isOpen={isOpen}
              onClose={() => {
                setIsOpen(false);
              }}>
              <div
                className="flex justify-end relative top-3 right-3"
                onClick={() => {
                  setIsOpen(false);
                }}>
                <IoClose size="1.5em" />
              </div>
              <div className="modal-contents">
                <div className="column flex items-center justify-between text-center">
                  <p>
                    Are you sure you want to remove this item from your cart?
                  </p>
                  <div className="row">
                    <button
                      className="remove-confirmation-modal-buttons mr-2"
                      onClick={handleConfirm}>
                      Remove
                    </button>
                    <button
                      className="cancel-confirmation-modal-buttons ml-2"
                      onClick={() => {
                        setIsOpen(false);
                      }}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
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
    </div>
  );
}
