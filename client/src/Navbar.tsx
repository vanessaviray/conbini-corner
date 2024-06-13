import { Outlet } from 'react-router-dom';

export function Navbar() {
  return (
    <div>
      <nav></nav>
      <Outlet />
    </div>
  );
}
