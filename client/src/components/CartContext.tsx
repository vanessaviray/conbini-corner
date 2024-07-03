import { ReactNode, createContext, useEffect, useState } from 'react';
import { Item } from '../lib/data.ts';

export type CartValue = {
  cart: Item[];
  addToCart: (item: Item) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  emptyOutCart: () => void;
};

const defaultCartValue: CartValue = {
  cart: [],
  addToCart: () => undefined,
  updateQuantity: () => undefined,
  removeFromCart: () => undefined,
  emptyOutCart: () => undefined,
};

export const CartContext = createContext(defaultCartValue);
  
type Props = {
  children: ReactNode;
};

export function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<Item[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  const addToCart = (addItem: Item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === addItem.productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === addItem.productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...addItem, quantity: 1 }];
    });
  };
  
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  function emptyOutCart() {
    const updatedCart = [];
    setCart(updatedCart);
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const cartValue: CartValue = {
    cart: cart,
    addToCart: addToCart,
    updateQuantity: updateQuantity,
    removeFromCart: removeFromCart,
    emptyOutCart: emptyOutCart,
  };

  return (
    <CartContext.Provider value={ cartValue }>{children}</CartContext.Provider>
  );
}
