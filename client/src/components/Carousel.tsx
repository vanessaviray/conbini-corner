import '../css/Carousel.css';
import { GoDot } from 'react-icons/go';
import { GoDotFill } from 'react-icons/go';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { type Image } from '../lib/data.ts';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type CarouselProps = {
  images: Image[];
};

export function Carousel({ images }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevImage = useCallback(() => {
    setActiveIndex((index) => (index - 1 + images.length) % images.length);
  }, [images.length]);

  const nextImage = useCallback(() => {
    setActiveIndex((index) => (index + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timerId = setInterval(nextImage, 4000);
    return () => clearTimeout(timerId);
  }, [nextImage]);

  const handleDots = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <Link to={'allProducts'}>
        <div className="displayed-img-wrapper">
          <div className="promotion-text-container">
            <p className="promotion-subtext">{images[activeIndex].subtext}</p>
            <p className="promotion-text">{images[activeIndex].text}</p>
          </div>
          <div className="carousel-overlay"></div>
          <img
            className="displayed-img"
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
          />
        </div>
      </Link>
      <div className="row carousel-controls">
        <button onClick={prevImage}>
          <IoIosArrowBack color="B0B0B0" />
        </button>
        <div className="row dots">
          {images.map((_, index) => (
            <span key={index} onClick={() => handleDots(index)}>
              {index === activeIndex ? (
                <GoDotFill color="B0B0B0" />
              ) : (
                <GoDot color="B0B0B0" />
              )}
            </span>
          ))}
        </div>
        <button onClick={nextImage}>
          <IoIosArrowForward color="B0B0B0" />
        </button>
      </div>
    </>
  );
}
