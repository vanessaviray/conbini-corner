import { Link, Outlet, useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { LuLollipop } from 'react-icons/lu';
import { TbBowlChopsticks } from 'react-icons/tb';
import { RiDrinks2Line } from 'react-icons/ri';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { RiAccountCircleLine } from 'react-icons/ri';
import '../css/MobileNavbar.css';
import '../css/App.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { Popup } from '../components/Popup';
import { CartContext } from '../components/CartContext';

export function MobileNavbar() {
  const [isSnacksOpen, setIsSnacksOpen] = useState(false);
  const [isPantryOpen, setIsPantryOpen] = useState(false);
  const [isDrinksOpen, setIsDrinksOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const navigate = useNavigate();

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

  function handleCategoryClick(event) {
    const buttonValue = event.target.value;
    navigate(`/category/${buttonValue}`);
  }

  function handleSubcategoryClick(event) {
    setIsSnacksOpen(false);
    setIsPantryOpen(false);
    setIsDrinksOpen(false);
    const buttonValue = event.target.value;
    navigate(`/subcategory/${buttonValue}`);
  }

  const { cart } = useContext(CartContext);

  return (
    <nav>
      <div className="user-logo-cart row">
        <RiAccountCircleLine size="1.5em" />
        <p onClick={() => navigate('/')}>COMBINI CORNER</p>
        <div className="shopping-cart-icon ml-4">
          <Link to={'shoppingCart'}>
            <MdOutlineShoppingCart size="1.5em" />
            <span className="badge rounded-full">{cart.length}</span>
          </Link>
        </div>
      </div>
      <div className="categories-search-bar">
        <div className="categories row">
          <div className="snacks-category row" ref={snacksPosition}>
            <LuLollipop />
            <button value="Snacks" onClick={handleCategoryClick}>
              Snacks
            </button>
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
                <li>
                  <button value="Chocolate" onClick={handleSubcategoryClick}>
                    Chocolate
                  </button>
                </li>
                <li>
                  <button value="Candy" onClick={handleSubcategoryClick}>
                    Candy
                  </button>
                </li>
                <li>
                  <button value="Chips" onClick={handleSubcategoryClick}>
                    Chips
                  </button>
                </li>
              </ul>
            </Popup>
          </div>
          <div className="pantry-category row" ref={pantryPosition}>
            <TbBowlChopsticks />
            <button value="Pantry" onClick={handleCategoryClick}>
              Pantry
            </button>
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
                <li>
                  <button value="Noodles" onClick={handleSubcategoryClick}>
                    Noodles
                  </button>
                </li>
                <li>
                  <button
                    value="Packaged Foods"
                    onClick={handleSubcategoryClick}>
                    Packaged Foods
                  </button>
                </li>
                <li>
                  <button value="Condiments" onClick={handleSubcategoryClick}>
                    Condiments
                  </button>
                </li>
              </ul>
            </Popup>
          </div>
          <div className="drinks-category row" ref={drinksPosition}>
            <RiDrinks2Line />
            <button value="Drinks" onClick={handleCategoryClick}>
              Drinks
            </button>
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
                <li>
                  <button
                    value="Bottled Drinks"
                    onClick={handleSubcategoryClick}>
                    Bottled Drinks
                  </button>
                </li>
                <li>
                  <button
                    value="Canned Drinks"
                    onClick={handleSubcategoryClick}>
                    Canned Drinks
                  </button>
                </li>
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
