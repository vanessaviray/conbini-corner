import '../css/App.css';
import '../css/ShoppingCart.css';
import { ShoppingCartItem } from '../components/ShoppingCartItem';
import { useContext } from 'react';
import { CartContext } from '../components/CartContext';

export function ShoppingCart() {
  const { cart } = useContext(CartContext);

  console.log('cart:', cart);

  let totalQty = 0;

  for (let i = 0; i < cart.length; i++) {
    totalQty += cart[i].quantity;
  }

  return (
    <div className="container">
      <p className="shopping-cart-title">Shopping Cart</p>
      <div className="line"></div>
      <div className="products-order-summary row flex flex-wrap">
        <div className="products">
          {cart.map((item) => (
            <div key={item.productId}>
              <ShoppingCartItem
                productId={item.productId}
                quantity={item.quantity}
              />
            </div>
          ))}
        </div>
        <div className="order-summary-container">
          <div className="text-content">
            <div className="row flex justify-between">
              <p>Order Summary</p>
              <p>{totalQty} Item(s)</p>
            </div>
            <div className="row flex justify-between">
              <p>Item(s) subtotal</p>
              <p>price</p>
            </div>
            <div className="row flex justify-between">
              <p>Shipping</p>
              <p>TBD</p>
            </div>
            <div className="row flex justify-between">
              <p>Subtotal</p>
              <p>price</p>
            </div>
            <div className="row flex justify-between">
              <p>Estimated Tax</p>
              <p>TBD</p>
            </div>
            <div className="row flex justify-between">
              <p>Order total</p>
              <p>price</p>
            </div>
          </div>
          <button className="checkout-button">CHECKOUT</button>
        </div>
      </div>
    </div>
  );
}
