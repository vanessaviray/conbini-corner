import { useContext, useEffect, useState } from 'react';
import { Product, Item } from '../lib/data';
import { readProduct } from '../lib/read';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../css/App.css';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import '../css/ProductDetails.css';
import { toDollars } from '../lib/functions';
import { LuPlus } from 'react-icons/lu';
import { LuMinus } from 'react-icons/lu';
import { CartContext } from '../components/CartContext';
import Alert from '../components/Alert';

export function ProductDetails() {
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();
  const [displayedImageUrl, setDisplayedImageUrl] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [showAlert, setShowAlert] = useState(false);

  const { productId } = useParams();
  const { addToCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

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

  function handleIncrementQty() {
    const addQty = quantity + 1;
    setQuantity(addQty);
    updateQuantity(productId, addQty);
    handleShowAlert();
  }

  function handleDecrementQty() {
    let subtractQty = quantity - 1;
    if (subtractQty < 1) {
      subtractQty = 1;
    }
    setQuantity(subtractQty);
    updateQuantity(productId, subtractQty);
    handleShowAlert();          
  }

  async function handleAddToCart() {
    if (!product) throw new Error('product is undefined');
    try {
      const newItem: Item = {
        quantity,
        ...product,
      };

      addToCart(newItem);
      handleShowAlert();

      setQuantity(1);
    } catch (err) {
      console.error('Error adding item to cart:', err);
      setError(err);
    }
  }

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

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
    <div className="product-details-container">
      <div className="breadcrumbs row">
        <Link to={'/'}>
          <button className="breadcrumb-button">Home</button>
        </Link>
        <div className="breadcrumb-arrow">
          <MdOutlineKeyboardArrowRight />
        </div>
        <button
          className="breadcrumb-button"
          onClick={() => navigate(`/category/${category}`)}>
          {category}
        </button>
        <div className="breadcrumb-arrow">
          <MdOutlineKeyboardArrowRight />
        </div>
        <button
          className="breadcrumb-button"
          onClick={() => navigate(`/subcategory/${subcategory}`)}>
          {subcategory}
        </button>
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
              <div className="minus-icon" onClick={handleDecrementQty}>
                <LuMinus />
              </div>
              <div className="number-container">
                <p>{quantity}</p>
              </div>
              <div className="plus-icon" onClick={handleIncrementQty}>
                <LuPlus />
              </div>
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              ADD TO CART
            </button>
            {showAlert && (
              <Alert message={'Item was added to cart.'} duration={1500} />
            )}
          </div>
          <p className="description-heading">Description</p>
          <p className="description">{description}</p>
        </div>
      </div>
    </div>
  );
}
