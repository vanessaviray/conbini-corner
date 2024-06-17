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
import { useEffect, useRef, useState } from 'react';
import { Popup } from '../components/Popup';

export function MobileNavbar() {
  const [isSnacksOpen, setIsSnacksOpen] = useState(false);
  const [isPantryOpen, setIsPantryOpen] = useState(false);
  const [isDrinksOpen, setIsDrinksOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowSize]);

  const snacksPosition = useRef<HTMLDivElement>(null);
  const pantryPosition = useRef<HTMLDivElement>(null);
  const drinksPosition = useRef<HTMLDivElement>(null);

  return (
    <nav>
      <div className="user-logo-cart row">
        <RiAccountCircleLine size="1.5em" />
        <p>COMBINI CORNER</p>
        <MdOutlineShoppingCart size="1.5em" />
      </div>
      <div className="categories-search-bar">
        <div className="categories row">
          <div className="snacks-category row" ref={snacksPosition}>
            <LuLollipop />
            <button>Snacks</button>
            <div
              onClick={() => {
                setIsSnacksOpen(!isSnacksOpen);
              }}>
              <MdOutlineKeyboardArrowDown />
            </div>
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
          </div>
          <div className="pantry-category row" ref={pantryPosition}>
            <TbBowlChopsticks />
            <button>Pantry</button>
            <div
              onClick={() => {
                setIsPantryOpen(!isPantryOpen);
              }}>
              <MdOutlineKeyboardArrowDown />
            </div>
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
          </div>
          <div className="drinks-category row" ref={drinksPosition}>
            <RiDrinks2Line />
            <button>Drinks</button>
            <div
              onClick={() => {
                setIsDrinksOpen(!isDrinksOpen);
              }}>
              <MdOutlineKeyboardArrowDown />
            </div>
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
          </div>
        </div>
        <SearchBar />
      </div>
      <Outlet />
    </nav>
  );
}
