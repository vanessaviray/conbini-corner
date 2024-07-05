import { useState, useEffect } from 'react';
import { BsCartCheck } from 'react-icons/bs';
import '../css/Alert.css';

type AlertProps = {
  message: string;
  duration: number;
};

export function Alert({ message, duration }: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="row alert">
      <BsCartCheck size="1.5em" />
      <p className="alert-message ml-2">{message}</p>
    </div>
  );
}

export default Alert;
