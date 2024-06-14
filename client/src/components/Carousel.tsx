import '../css/Carousel.css';
import { GoDot } from 'react-icons/go';
import { GoDotFill } from 'react-icons/go';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { type Image } from '../lib/data.ts';
import { useCallback, useEffect, useState } from 'react';

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
    const timerId = setInterval(nextImage, 3000);
    return () => clearTimeout(timerId);
  }, [nextImage]);

  const handleDots = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className="displayed-img-wrapper">
        <img
          className="displayed-img"
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
        />
      </div>
      <div className="row carousel-controls">
        <button onClick={prevImage}>
          <IoIosArrowBack />
        </button>
        <div className="row dots">
          {images.map((_, index) => (
            <span key={index} onClick={() => handleDots(index)}>
              {index === activeIndex ? <GoDotFill /> : <GoDot />}
            </span>
          ))}
        </div>
        <button onClick={nextImage}>
          <IoIosArrowForward />
        </button>
      </div>
    </>
  );
}
