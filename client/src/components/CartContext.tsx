import { ReactNode, createContext, useEffect, useState } from 'react';
import { Item } from '../lib/data.ts';
import { useUser } from '../lib/useUser.ts';
import { readInitialCart } from '../lib/read.ts';

export type CartValue = {
  cart: Item[];
  addToCart: (item: Item) => void;
  updateCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
  emptyOutCart: () => void;
};

const defaultCartValue: CartValue = {
  cart: [],
  addToCart: () => undefined,
  updateCart: () => undefined,
  removeFromCart: () => undefined,
  emptyOutCart: () => undefined,
};

export const CartContext = createContext(defaultCartValue);

type Props = {
  children: ReactNode;
};

export function CartProvider({ children }: Props) {
  const { user } = useUser();
  const [cartContext, setCartContext] = useState<Item[]>([]);

  useEffect(() => {
    async function loadInitialCart() {
      try {
        const initialCart = await readInitialCart();
        setCartContext(initialCart);
      } catch (err) {
        console.error('read error', err);
      }
    }
    if (user) {
      loadInitialCart();
    } else {
      setCartContext([]);
    }
  }, [user]);

  function addToCart(item: Item) {
    const updatedCart = [...cartContext, item];
    setCartContext(updatedCart);
  }

  function updateCart(item: Item) {
    const updatedCart = cartContext.map((cartItem) =>
      item.productId === cartItem.productId ? item : cartItem
    );
    setCartContext(updatedCart);
  }

  function removeFromCart(item: Item) {
    const updatedCart = cartContext.filter(
      (cartItem) => cartItem.productId !== item.productId
    );
    setCartContext(updatedCart);
  }

  function emptyOutCart() {
    const updatedCart = [];
    setCartContext(updatedCart);
  }

  const cartValue: CartValue = {
    cart: cartContext,
    addToCart: addToCart,
    updateCart: updateCart,
    removeFromCart: removeFromCart,
    emptyOutCart: emptyOutCart,
  };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}
