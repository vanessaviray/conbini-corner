import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage.tsx';
import { DesktopNavbar } from './pages/DesktopNavbar.tsx';
import { ProductDetails } from './pages/ProductDetails.tsx';
import { useEffect, useState } from 'react';
import { MobileNavbar } from './pages/MobileNavbar.tsx';
import { type CartValue, CartContext } from './components/CartContext.tsx';
import { ShoppingCart } from './pages/ShoppingCart.tsx';
import { Item } from './lib/data.ts';
import { readInitialCart } from './lib/read.ts';

export default function App() {
  const [isMobile, setMobile] = useState(window.innerWidth < 768);
  const [cartContext, setCartContext] = useState<Item[]>([]);

  useEffect(() => {
    async function loadInitialCart() {
      try {
        const initialCart = await readInitialCart();
        setCartContext(initialCart);
      } catch (err) {
        console.error('read error', err);
      }
    }
    loadInitialCart();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }),
    [];

  function updateMedia() {
    setMobile(window.innerWidth < 768);
  }

  function addToCart(item: Item) {
    const updatedCart = [...cartContext, item];
    setCartContext(updatedCart);
  }

  function updateCart(item: Item) {
    const updatedCart = cartContext.map((cartItem) =>
      item.productId === cartItem.productId ? item : cartItem
    );
    setCartContext(updatedCart);
  }

  function removeFromCart(item: Item) {
    const updatedCart = cartContext.filter(
      (cartItem) => cartItem.productId !== item.productId
    );
    setCartContext(updatedCart);
  }

  const cartValue: CartValue = {
    cart: cartContext,
    addToCart: addToCart,
    updateCart: updateCart,
    removeFromCart: removeFromCart,
  };

  return (
    <CartContext.Provider value={cartValue}>
      <Routes>
        {isMobile ? (
          <Route path="/" element={<MobileNavbar />}>
            <Route index element={<LandingPage />} />
            <Route path="details/:productId" element={<ProductDetails />} />
            <Route path="shoppingCart" element={<ShoppingCart />} />
          </Route>
        ) : (
          <Route path="/" element={<DesktopNavbar />}>
            <Route index element={<LandingPage />} />
            <Route path="details/:productId" element={<ProductDetails />} />
            <Route path="shoppingCart" element={<ShoppingCart />} />
          </Route>
        )}
      </Routes>
    </CartContext.Provider>
  );
}
