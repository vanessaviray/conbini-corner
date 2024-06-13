import { Outlet } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { LuLollipop } from 'react-icons/lu';
import { TbBowlChopsticks } from 'react-icons/tb';
import { RiDrinks2Line } from 'react-icons/ri';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { RiAccountCircleLine } from 'react-icons/ri';
import '../css/DesktopNavbar.css';
import '../css/App.css';

export function DesktopNavbar() {
  return (
    <nav>
      <div className="navbar-wrapper">
        <div className="navbar-contents row">
          <div className="logo-categories row items-center">
            <p>COMBINI CORNER</p>
            <div className="categories row">
              <div className="snacks-category row m-2 items-center">
                <LuLollipop size="1.25rem" />
                <button>Snacks</button>
                <MdOutlineKeyboardArrowDown color="#B0B0B0" />
              </div>
              <div className="pantry-category row m-2 items-center">
                <TbBowlChopsticks size="1.25rem" />
                <button>Pantry</button>
                <MdOutlineKeyboardArrowDown color="#B0B0B0" />
              </div>
              <div className="drinks-category row m-2 items-center">
                <RiDrinks2Line size="1.25rem" />
                <button>Drinks</button>
                <MdOutlineKeyboardArrowDown color="#B0B0B0" />
              </div>
            </div>
          </div>
          <div className="row items-center">
            <SearchBar />
            <div className="row">
              <div className="ml-10">
                <RiAccountCircleLine size="1.5em" />
              </div>
              <div className="ml-4">
                <MdOutlineShoppingCart size="1.5em" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="outline"></div>
      <Outlet />
    </nav>
  );
}
