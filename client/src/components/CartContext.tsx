import { createContext } from 'react';
import { Item } from '../lib/data.ts';

export type CartValue = {
  cart: Item[];
  addToCart: (item: Item) => void;
  updateCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
};

const defaultCartValue: CartValue = {
  cart: [],
  addToCart: () => undefined,
  updateCart: () => undefined,
  removeFromCart: () => undefined,
};

export const CartContext = createContext(defaultCartValue);
