import { ReactNode } from 'react';
import '../css/Popup.css';
import { createPortal } from 'react-dom';

type Props = {
  isOpen: boolean;
  positionTo: HTMLElement | null;
  onClose: () => void;
  children: ReactNode;
};

export function Popup({ isOpen, positionTo, onClose, children }: Props) {
  if (!isOpen) {
    return null;
  }
  const r = positionTo?.getBoundingClientRect();
  const top = r ? r.top + r.height + 1 : '50%';
  const left = r ? r.left : '0';

  return createPortal(
    <>
      <div onClick={onClose} className="backdrop"></div>
      <div style={{ top: top, left: left, position: 'absolute' }}>
        {children}
      </div>
    </>,
    document.body
  );
}
