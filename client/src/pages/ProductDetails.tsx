import { useEffect, useState } from 'react';
import { Product, readProduct } from '../lib/read';
import { useParams } from 'react-router-dom';
import '../css/App.css';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

export function ProductDetails() {
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  const { productId } = useParams();

  useEffect(() => {
    async function loadProduct(productId: number) {
      try {
        const product = await readProduct(productId);
        setProduct(product);
      } catch (err) {
        console.error('read error', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (productId) loadProduct(Number(productId));
  }, [productId]);

  if (isLoading) return <div>Loading...</div>;

  if (error || !product) {
    return (
      <div>
        Error Loading Item {productId}:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  const { category, subcategory, name, price, description, defaultImageUrl } =
    product;

  return (
    <div className="container">
      <div className="breadcrumbs row items-center">
        <button>Home</button>
        <button>{category}</button>
        <MdOutlineKeyboardArrowRight />
        <button>{subcategory}</button>
        <MdOutlineKeyboardArrowRight />
        <button>{name}</button>
      </div>
      <img src={defaultImageUrl} />
      <p>{subcategory}</p>
      <p>{name}</p>
      <p>{price}</p>
      <div className="buttons row">
        <div className="quantity-container row">
          <button>+</button>
          <div className="number-container">
            <p>1</p>
          </div>
          <button>-</button>
        </div>
        <button>ADD TO CART</button>
      </div>
      <p>Description</p>
      <p>{description}</p>
    </div>
  );
}
