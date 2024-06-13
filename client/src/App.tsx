import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './Navbar.tsx';
import { LandingPage } from './LandingPage.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<LandingPage />} />
      </Route>
    </Routes>
  );
}
