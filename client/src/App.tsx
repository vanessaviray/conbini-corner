import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage.tsx';
import { DesktopNavbar } from './pages/DesktopNavbar.tsx';
import { ProductDetails } from './pages/ProductDetails.tsx';
import { useEffect, useState } from 'react';
import { MobileNavbar } from './pages/MobileNavbar.tsx';
import { type CartValue, CartContext } from './components/CartContext.tsx';
import { ShoppingCart } from './pages/ShoppingCart.tsx';
import { Item } from './lib/read.ts';

export default function App() {
  const [isMobile, setMobile] = useState(window.innerWidth < 768);
  const [cartContext, setCartContext] = useState<Item[]>([]);

  function updateMedia() {
    setMobile(window.innerWidth < 768);
  }

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }),
    [];

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

  const cartValue: CartValue = {
    cart: cartContext,
    addToCart: addToCart,
    updateCart: updateCart,
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
