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
import { Popup } from '../components/Popup';
import { useRef, useState } from 'react';

export function DesktopNavbar() {
  const [isSnacksOpen, setIsSnacksOpen] = useState(false);
  const [isPantryOpen, setIsPantryOpen] = useState(false);
  const [isDrinksOpen, setIsDrinksOpen] = useState(false);

  const snacksPosition = useRef<HTMLDivElement>(null);
  const pantryPosition = useRef<HTMLDivElement>(null);
  const drinksPosition = useRef<HTMLDivElement>(null);

  return (
    <nav>
      <div className="navbar-wrapper">
        <div className="navbar-contents row">
          <div className="logo-categories row items-center">
            <p>COMBINI CORNER</p>
            <div className="categories row">
              <div
                className="snacks-category row m-2 items-center"
                ref={snacksPosition}
                onClick={() => {
                  setIsSnacksOpen(!isSnacksOpen);
                }}>
                <LuLollipop size="1.25rem" />
                <button>Snacks</button>
                <Popup
                  isOpen={isSnacksOpen}
                  positionTo={snacksPosition.current}
                  onClose={() => {
                    setIsSnacksOpen(false);
                  }}>
                  <ul>
                    <li>Chocolate</li>
                    <li>Candy</li>
                    <li>Chips</li>
                  </ul>
                </Popup>
                <MdOutlineKeyboardArrowDown color="#B0B0B0" />
              </div>
              <div
                className="pantry-category row m-2 items-center"
                ref={pantryPosition}
                onClick={() => {
                  setIsPantryOpen(!isPantryOpen);
                }}>
                <TbBowlChopsticks size="1.25rem" />
                <button>Pantry</button>
                <Popup
                  isOpen={isPantryOpen}
                  positionTo={pantryPosition.current}
                  onClose={() => {
                    setIsPantryOpen(false);
                  }}>
                  <ul>
                    <li>Noodles</li>
                    <li>Packaged Foods</li>
                    <li>Condiments</li>
                  </ul>
                </Popup>
                <MdOutlineKeyboardArrowDown color="#B0B0B0" />
              </div>
              <div
                className="drinks-category row m-2 items-center"
                ref={drinksPosition}
                onClick={() => {
                  setIsDrinksOpen(!isDrinksOpen);
                }}>
                <RiDrinks2Line size="1.25rem" />
                <button>Drinks</button>
                <Popup
                  isOpen={isDrinksOpen}
                  positionTo={drinksPosition.current}
                  onClose={() => {
                    setIsDrinksOpen(false);
                  }}>
                  <ul>
                    <li>Chocolate</li>
                    <li>Candy</li>
                    <li>Chips</li>
                  </ul>
                </Popup>
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
