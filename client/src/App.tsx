import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage.tsx';
import { DesktopNavbar } from './pages/DesktopNavbar.tsx';
import { ProductDetails } from './pages/ProductDetails.tsx';
import { useEffect, useState } from 'react';
import { MobileNavbar } from './pages/MobileNavbar.tsx';

export default function App() {
  const [isMobile, setMobile] = useState(window.innerWidth < 768);

  function updateMedia() {
    setMobile(window.innerWidth < 768);
  }

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }),
    [];

  return (
    <Routes>
      {isMobile ? (
        <Route path="/" element={<MobileNavbar />}>
          <Route index element={<LandingPage />} />
          <Route path="details/:productId" element={<ProductDetails />} />
        </Route>
      ) : (
        <Route path="/" element={<DesktopNavbar />}>
          <Route index element={<LandingPage />} />
          <Route path="details/:productId" element={<ProductDetails />} />
        </Route>
      )}
    </Routes>
  );
}
