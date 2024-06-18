import { useEffect, useState } from 'react';
import { Product, readProduct } from '../lib/read';
import { useParams, Link } from 'react-router-dom';
import '../css/App.css';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import '../css/ProductDetails.css';
import { toDollars } from '../lib/to-dollars';
import { LuPlus } from 'react-icons/lu';
import { LuMinus } from 'react-icons/lu';

export function ProductDetails() {
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [displayedImageUrl, setDisplayedImageUrl] = useState<string>('');

  const { productId } = useParams();

  useEffect(() => {
    async function loadProduct(productId: number) {
      try {
        const product = await readProduct(productId);
        setProduct(product);
        setDisplayedImageUrl(product.defaultImageUrl);
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

  const {
    category,
    subcategory,
    name,
    price,
    description,
    defaultImageUrl,
    secondaryImageUrl,
  } = product;

  return (
    <div className="container">
      <div className="breadcrumbs row">
        <Link to={'/'}>
          <button className="breadcrumb-button">Home</button>
        </Link>
        <div className="breadcrumb-arrow">
          <MdOutlineKeyboardArrowRight />
        </div>
        <button className="breadcrumb-button">{category}</button>
        <div className="breadcrumb-arrow">
          <MdOutlineKeyboardArrowRight />
        </div>
        <button className="breadcrumb-button">{subcategory}</button>
        <div className="breadcrumb-arrow">
          <MdOutlineKeyboardArrowRight />
        </div>
        <button className="name-breadcrumb">{name}</button>
      </div>
      <div className="image-and-text">
        <div className="large-img-wrapper">
          <img className="defaultImg" src={displayedImageUrl} />
        </div>
        {window.innerWidth > 768 && (
          <div className="small-images">
            <div
              className="small-img-wrapper"
              onClick={() => setDisplayedImageUrl(defaultImageUrl)}>
              <img src={defaultImageUrl} />
            </div>
            <div
              className="small-img-wrapper"
              onClick={() => setDisplayedImageUrl(secondaryImageUrl)}>
              <img src={secondaryImageUrl} />
            </div>
          </div>
        )}
        <div className="text-details">
          <p className="subcategory">{subcategory}</p>
          <p className="name">{name}</p>
          <p className="price">{toDollars(price)}</p>
          <div className="buttons row">
            <div className="quantity-container row">
              <div className="minus-icon">
                <LuMinus />
              </div>
              <div className="number-container">
                <p>1</p>
              </div>
              <div className="plus-icon">
                <LuPlus />
              </div>
            </div>
            <button className="add-to-cart-btn">ADD TO CART</button>
          </div>
          <p className="description-heading">Description</p>
          <p className="description">{description}</p>
        </div>
      </div>
    </div>
  );
}
