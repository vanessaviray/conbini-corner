import '../css/App.css';
import '../css/ShoppingCart.css';
import { ShoppingCartItem } from '../components/ShoppingCartItem';
import { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import { toDollars } from '../lib/functions';
import { useNavigate } from 'react-router-dom';
import { deleteCart } from '../lib/read';
import { UserContext } from '../components/UserContext';

export function ShoppingCart() {
  const { cart, emptyOutCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  let totalQty = 0;
  let subtotal = 0;

  for (let i = 0; i < cart.length; i++) {
    totalQty += cart[i].quantity;
    subtotal += cart[i].price * cart[i].quantity;
  }

  async function handleCheckout() {
    if (!user?.userId) throw new Error('cannot find userId');

    try {
      if (cart.length === 0) {
        alert('There are no items currently in your cart.');
      } else {
        await deleteCart(user.userId);
        emptyOutCart();
        navigate('/checkout');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="shopping-cart-container">
      <p className="shopping-cart-title">Shopping Cart</p>
      <div className="line"></div>
      <div className="products-order-summary row flex flex-wrap">
        <div className="products">
          {cart.length === 0 ? (
            <p>Your shopping cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.productId}>
                <ShoppingCartItem
                  productId={item.productId}
                  quantity={item.quantity}
                />
              </div>
            ))
          )}
        </div>
        <div className="order-summary-container">
          <div className="text-content mt-3 mb-5">
            <div className="order-summary-items row flex justify-between">
              <p>Order Summary</p>
              <p>{totalQty} Item(s)</p>
            </div>
            <div className="order-summary-line"></div>
            <div className="row flex justify-between pb-2">
              <p>Item(s) subtotal</p>
              <p>{toDollars(subtotal)}</p>
            </div>
            <div className="row flex justify-between pb-2">
              <p>Shipping</p>
              <p>TBD</p>
            </div>
            <div className="row flex justify-between pb-2">
              <p>Subtotal</p>
              <p>{toDollars(subtotal)}</p>
            </div>
            <div className="row flex justify-between">
              <p>Estimated Tax</p>
              <p>TBD</p>
            </div>
            <div className="order-summary-line mt-5"></div>
            <div className="row flex justify-between pb-8 font-extrabold">
              <p>Order total</p>
              <p>{toDollars(subtotal)}</p>
            </div>
          </div>
          <button onClick={handleCheckout} className="checkout-button">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
