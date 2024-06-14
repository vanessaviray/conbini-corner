import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage.tsx';
import { DesktopNavbar } from './pages/DesktopNavbar.tsx';
import { ProductDetails } from './pages/ProductDetails.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DesktopNavbar />}>
        <Route index element={<LandingPage />} />
        <Route path="details/:productId" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
}
