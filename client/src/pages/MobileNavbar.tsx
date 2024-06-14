import { Outlet } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { LuLollipop } from 'react-icons/lu';
import { TbBowlChopsticks } from 'react-icons/tb';
import { RiDrinks2Line } from 'react-icons/ri';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { RiAccountCircleLine } from 'react-icons/ri';
import '../css/MobileNavbar.css';
import '../css/App.css';

export function MobileNavbar() {
  return (
    <nav>
      <div className="user-logo-cart row">
        <RiAccountCircleLine size="1.5em" />
        <p>COMBINI CORNER</p>
        <MdOutlineShoppingCart size="1.5em" />
      </div>
      <div className="categories-search-bar">
        <div className="categories row">
          <div className="snacks-category row">
            <LuLollipop />
            <button>Snacks</button>
            <MdOutlineKeyboardArrowDown />
          </div>
          <div className="pantry-category row">
            <TbBowlChopsticks />
            <button>Pantry</button>
            <MdOutlineKeyboardArrowDown />
          </div>
          <div className="drinks-category row">
            <RiDrinks2Line />
            <button>Drinks</button>
            <MdOutlineKeyboardArrowDown />
          </div>
        </div>
        <SearchBar />
      </div>
      <Outlet />
    </nav>
  );
}
