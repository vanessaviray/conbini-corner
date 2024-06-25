import { Outlet, Link, useNavigate } from 'react-router-dom';
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
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from '../components/CartContext';
import { Modal } from '../components/Modal.tsx';
import { IoClose } from 'react-icons/io5';
import { useUser } from '../lib/useUser.ts';

export function DesktopNavbar() {
  const [isSnacksOpen, setIsSnacksOpen] = useState(false);
  const [isPantryOpen, setIsPantryOpen] = useState(false);
  const [isDrinksOpen, setIsDrinksOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginDisplay, setIsLoginDisplay] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const { handleSignIn } = useUser();
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      }),
        [];
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

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      console.log('formData:', formData);
      const userData = Object.fromEntries(formData);
      console.log('userData:', userData);
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-up', req);
      console.log('res:', res);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const user = await res.json();
      console.log('Registered', user);
      alert(
        `Successfully registered ${user.username} as userId ${user.userId}.`
      );
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
      console.log('Signed In', user);
      console.log('Received token:', token);
      setIsOpen(false);
      setIsSignedIn(true);
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  // const { cart } = useContext(CartContext);

  return (
    <nav>
      <div className="navbar-wrapper">
        <div className="navbar-contents row">
          <div className="logo-categories row items-center">
            <Link to={'/'}>
              <div className="logo-wrapper">
                <img
                  src="/images/marketing/conbini-corner-logo.png"
                  alt="conbini corner logo"
                />
              </div>
            </Link>
            <div className="nav-categories row">
              <div
                className="snacks-category row items-center"
                ref={snacksPosition}>
                <LuLollipop size="1.25rem" />
                <button value="Snacks" onClick={handleCategoryClick}>
                  Snacks
                </button>
                <div
                  onClick={() => {
                    setIsSnacksOpen(!isSnacksOpen);
                  }}>
                  <div className="down-arrow-icon">
                    <MdOutlineKeyboardArrowDown color="#B0B0B0" />
                  </div>
                </div>
                <Popup
                  isOpen={isSnacksOpen}
                  positionTo={snacksPosition.current}
                  onClose={() => {
                    setIsSnacksOpen(false);
                  }}>
                  <ul>
                    <li>
                      <button
                        value="Chocolate"
                        onClick={handleSubcategoryClick}>
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
              <div
                className="pantry-category row items-center"
                ref={pantryPosition}>
                <TbBowlChopsticks size="1.25rem" />
                <button value="Pantry" onClick={handleCategoryClick}>
                  Pantry
                </button>
                <div
                  onClick={() => {
                    setIsPantryOpen(!isPantryOpen);
                  }}>
                  <div className="down-arrow-icon">
                    <MdOutlineKeyboardArrowDown color="#B0B0B0" />
                  </div>
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
                      <button
                        value="Condiments"
                        onClick={handleSubcategoryClick}>
                        Condiments
                      </button>
                    </li>
                  </ul>
                </Popup>
              </div>
              <div
                className="drinks-category row items-center"
                ref={drinksPosition}>
                <RiDrinks2Line size="1.25rem" />
                <button value="Drinks" onClick={handleCategoryClick}>
                  Drinks
                </button>
                <div
                  onClick={() => {
                    setIsDrinksOpen(!isDrinksOpen);
                  }}>
                  <div className="down-arrow-icon">
                    <MdOutlineKeyboardArrowDown color="#B0B0B0" />
                  </div>
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
          </div>
          <div className="row items-center">
            <SearchBar />
            <div className="row">
              {!isSignedIn ? (
                <div
                  className="ml-10"
                  onClick={() => {
                    setIsOpen(true);
                    setIsLoginDisplay(true);
                  }}>
                  <RiAccountCircleLine size="1.5em" />
                </div>
              ) : (
                <button>Log Out</button>
              )}
              <Modal
                isOpen={isOpen}
                onClose={() => {
                  setIsOpen(false);
                }}>
                <div
                  className="flex justify-end"
                  onClick={() => {
                    setIsOpen(false);
                  }}>
                  <IoClose size="1.5em" />
                </div>
                <div className="modal-contents">
                  {isLoginDisplay ? (
                    <div className="column flex items-start justify-between">
                      <p>Login</p>
                      <form onSubmit={handleLogin}>
                        <p>Email Address</p>
                        <input
                          required
                          name="emailAddress"
                          className="block border border-gray-600 rounded p-2 h-8 w-full mb-2"
                        />
                        <p>Password</p>
                        <input
                          required
                          name="password"
                          className="block border border-gray-600 rounded p-2 h-8 w-full mb-2"
                        />
                        <button disabled={isLoading}>Login</button>
                      </form>
                      <div className="row">
                        <p>Don't have an account?</p>
                        <button
                          onClick={() => {
                            setIsLoginDisplay(!isLoginDisplay);
                          }}>
                          Sign up.
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="column flex items-start">
                      <p>Create Account</p>
                      <form onSubmit={handleSignUp}>
                        <p>Email Address</p>
                        <input
                          required
                          name="emailAddress"
                          className="block border border-gray-600 rounded p-2 h-8 w-full mb-2"
                        />
                        <p>Password</p>
                        <input
                          required
                          name="password"
                          className="block border border-gray-600 rounded p-2 h-8 w-full mb-2"
                        />
                        <button>Create Account</button>
                      </form>
                      <div className="row">
                        <p>Already have an account?</p>
                        <button
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
              <div className="shopping-cart-icon ml-4">
                <Link to={'shoppingCart'}>
                  <MdOutlineShoppingCart size="1.5em" />
                  <span className="badge rounded-full">{cart.length}</span>
                </Link>
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

{
  /* <button
  onClick={() => {
    alert('Item was added to cart.');
    setIsOpen(false);
  }}>
  Delete
</button> */
}
