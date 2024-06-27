export type Image = {
  src: string;
  alt: string;
  subtext: string;
  text: string;
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

export type Item = Product & {
  quantity: number;
};

export const images: Image[] = [
  {
    src: '/images/carousel/carousel-img-1.jpg',
    alt: 'assorted japanese snacks',
    subtext: 'LIMITED TIME ONLY',
    text: 'SPEND $100, GET $20 OFF YOUR NEXT ORDER',
  },
  {
    src: '/images/carousel/carousel-img-2.webp',
    alt: 'a bowl of japanese snacks',
    subtext: `FATHER'S DAY PROMOTION`,
    text: 'FREE GIFT WRAPPING FOR ORDERS OVER $5O',
  },
  {
    src: '/images/carousel/carousel-img-3.avif',
    alt: 'assorted japanese snacks',
    subtext: '4TH OF JULY SALE',
    text: `FREE SHIPPING USING CODE "JULY4"`,
  },
];
