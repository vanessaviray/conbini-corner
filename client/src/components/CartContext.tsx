import { createContext } from 'react';
import { Item } from '../lib/read.ts';

export type CartValue = {
  cart: Item[];
  addToCart: (item: Item) => void;
  updateCart: (item: Item) => void;
};

const defaultCartValue: CartValue = {
  cart: [],
  addToCart: () => undefined,
  updateCart: () => undefined,
};

export const CartContext = createContext(defaultCartValue);
