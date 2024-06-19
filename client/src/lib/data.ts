export type Image = {
  src: string;
  alt: string;
};

export type Product = {
  productId: number;
  category: string;
  subcategory: string;
  name: string;
  price: number;
  description: string;
  defaultImageUrl: string;
  secondaryImageUrl: string;
  featuredProduct: boolean;
};

export const images: Image[] = [
  {
    src: '/images/carousel/slide-1.png',
    alt: 'assorted japanese snacks',
  },
  {
    src: '/images/carousel/slide-2.png',
    alt: 'a bowl of japanese snacks',
  },
  {
    src: '/images/carousel/slide-3.png',
    alt: 'assorted japanese snacks',
  },
];
