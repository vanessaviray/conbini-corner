import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage.tsx';
import { DesktopNavbar } from './pages/DesktopNavbar.tsx';
import { ProductDetails } from './pages/ProductDetails.tsx';
import { useEffect, useState } from 'react';
import { MobileNavbar } from './pages/MobileNavbar.tsx';
import { CartProvider } from './components/CartContext.tsx';
import { ShoppingCart } from './pages/ShoppingCart.tsx';
import { Category } from './pages/Category.tsx';
import { Subcategory } from './pages/Subcategory.tsx';
import { AllProducts } from './pages/AllProducts.tsx';
import { AllFeaturedProducts } from './pages/AllFeaturedProducts.tsx';
import { UserProvider } from './components/UserContext';
import { SearchResults } from './pages/SearchResults.tsx';
import { Checkout } from './pages/Checkout.tsx';

export default function App() {
  const [isMobile, setMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  function updateMedia() {
    setMobile(window.innerWidth < 768);
  }

  return (
    <UserProvider>
      <CartProvider>
        <Routes>
          {isMobile ? (
            <Route path="/" element={<MobileNavbar />}>
              <Route index element={<LandingPage />} />
              <Route path="details/:productId" element={<ProductDetails />} />
              <Route
                path="/category/details/:productId"
                element={<ProductDetails />}
              />
              <Route path="shoppingCart" element={<ShoppingCart />} />
              <Route path="category/:categoryName" element={<Category />} />
              <Route
                path="subcategory/:subcategoryName"
                element={<Subcategory />}
              />
              <Route path="allProducts" element={<AllProducts />} />
              <Route
                path="allFeaturedProducts"
                element={<AllFeaturedProducts />}
              />
              <Route
                path="searchResults/:searchInput"
                element={<SearchResults />}
              />
              <Route path="checkout" element={<Checkout />} />
            </Route>
          ) : (
            <Route path="/" element={<DesktopNavbar />}>
              <Route index element={<LandingPage />} />
              <Route path="details/:productId" element={<ProductDetails />} />
              <Route
                path="/category/details/:productId"
                element={<ProductDetails />}
              />
              <Route path="shoppingCart" element={<ShoppingCart />} />
              <Route path="category/:categoryName" element={<Category />} />
              <Route
                path="subcategory/:subcategoryName"
                element={<Subcategory />}
              />
              <Route path="allProducts" element={<AllProducts />} />
              <Route
                path="allFeaturedProducts"
                element={<AllFeaturedProducts />}
              />
              <Route
                path="searchResults/:searchInput"
                element={<SearchResults />}
              />
              <Route path="checkout" element={<Checkout />} />
            </Route>
          )}
        </Routes>
      </CartProvider>
    </UserProvider>
  );
}
