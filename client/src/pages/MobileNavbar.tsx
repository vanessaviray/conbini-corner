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
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { Popup } from '../components/Popup';
import { CartContext } from '../components/CartContext';
import { UserContext } from '../components/UserContext';
import { useUser } from '../lib/useUser';
import { Modal } from '../components/Modal';
import { IoClose } from 'react-icons/io5';

export function MobileNavbar() {
  const [isSnacksOpen, setIsSnacksOpen] = useState(false);
  const [isPantryOpen, setIsPantryOpen] = useState(false);
  const [isDrinksOpen, setIsDrinksOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginDisplay, setIsLoginDisplay] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { handleGuest } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const { handleSignIn, handleSignOut } = useUser();
  const navigate = useNavigate();

  const snacksPosition = useRef<HTMLDivElement>(null);
  const pantryPosition = useRef<HTMLDivElement>(null);
  const drinksPosition = useRef<HTMLDivElement>(null);

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

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData);
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-up', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const user = await res.json();
      console.log('Registered', user);
      alert(`Successfully registered new account.`);
      setIsLoginDisplay(true);
    } catch (err) {
      alert(`Error registering user: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData);
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = await res.json();
      handleSignIn(user, token);
      setIsLoggedIn(true);
      setIsOpen(false);
      navigate('/');
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogOut() {
    handleSignOut();
    setIsLoggedIn(false);
    handleGuest();
    navigate('/');
    alert('You have successfully logged out.');
  }

  return (
    <nav>
      <div className="user-logo-cart row">
        {!isLoggedIn ? (
          <div
            className="ml-1"
            onClick={() => {
              setIsOpen(true);
              setIsLoginDisplay(true);
            }}>
            <RiAccountCircleLine size="1.5em" />
          </div>
        ) : (
          <button className="ml-2 underline text-sm" onClick={handleLogOut}>
            Log Out
          </button>
        )}
        <Modal
          modalContainer="account-modal-container"
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}>
          <div
            className="flex justify-end relative top-3 right-3"
            onClick={() => {
              setIsOpen(false);
            }}>
            <IoClose size="1.5em" />
          </div>
          <div className="modal-contents">
            {isLoginDisplay ? (
              <div className="column flex items-start justify-between w-full">
                <p className="modal-header w-full">Login</p>
                <form className="w-full" onSubmit={handleLogin}>
                  <div className="mb-6 relative top-2 w-full">
                    <p className="mb-2">Email Address</p>
                    <input
                      required
                      name="emailAddress"
                      className="block border border-gray-300 rounded p-2 h-8 w-full mb-2"
                    />
                  </div>
                  <div className="mb-10 relative top-1">
                    <p className="mb-2">Password</p>
                    <input
                      required
                      name="password"
                      type="password"
                      className="block border border-gray-300 rounded p-2 h-8 w-full mb-2"
                    />
                  </div>
                  <button
                    className="form-button relative bottom-2"
                    disabled={isLoading}>
                    LOGIN
                  </button>
                </form>
                <div className="row">
                  <p>Don't have an account?</p>
                  <button
                    className="pl-2 modal-display-button"
                    onClick={() => {
                      setIsLoginDisplay(!isLoginDisplay);
                    }}>
                    Sign up.
                  </button>
                </div>
              </div>
            ) : (
              <div className="column flex items-start justify-between w-full">
                <p className="modal-header w-full">Create Account</p>
                <form className="w-full" onSubmit={handleSignUp}>
                  <div className="mb-6 relative top-2 w-full">
                    <p className="mb-2">Email Address</p>
                    <input
                      required
                      name="emailAddress"
                      className="block border border-gray-300 rounded p-2 h-8 w-full mb-2"
                    />
                  </div>
                  <div className="mb-10 relative top-1">
                    <p className="mb-2">Password</p>
                    <input
                      required
                      name="password"
                      type="password"
                      className="block border border-gray-300 rounded p-2 h-8 w-full mb-2"
                    />
                  </div>
                  <button className="form-button relative bottom-2">
                    CREATE ACCOUNT
                  </button>
                </form>
                <div className="row">
                  <p>Already have an account?</p>
                  <button
                    className="pl-2 modal-display-button"
                    onClick={() => {
                      setIsLoginDisplay(!isLoginDisplay);
                    }}>
                    Sign In.
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
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
              <ul className="navbar-popup">
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
              <ul className="navbar-popup">
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
              <ul className="navbar-popup-right">
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
