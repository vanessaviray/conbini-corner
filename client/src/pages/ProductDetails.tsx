import { useEffect, useState } from 'react';
import { Product, readProduct } from '../lib/read';
import { useParams, Link } from 'react-router-dom';
import '../css/App.css';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import '../css/ProductDetails.css';
import { toDollars } from '../lib/to-dollars';

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
      <div className="breadcrumbs row">
        <Link to={'/'}>
          <button>Home</button>
        </Link>
        <MdOutlineKeyboardArrowRight />
        <button>{category}</button>
        <MdOutlineKeyboardArrowRight />
        <button>{subcategory}</button>
        <MdOutlineKeyboardArrowRight />
        <button className="name-breadcrumb">{name}</button>
      </div>
      <div className="large-img-wrapper">
        <img className="defaultImg" src={defaultImageUrl} />
      </div>
      <p className="subcategory">{subcategory}</p>
      <p className="name">{name}</p>
      <p>{toDollars(price)}</p>
      <div className="buttons row">
        <div className="quantity-container row">
          <button>+</button>
          <div className="number-container">
            <p>1</p>
          </div>
          <button>-</button>
        </div>
        <button className="add-to-cart-btn">ADD TO CART</button>
      </div>
      <p className="description-heading">Description</p>
      <p>{description}</p>
    </div>
  );
}
