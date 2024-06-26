import { ReactNode, useEffect, useRef } from 'react';
import '../css/Modal.css';

type Props = {
  modalContainer: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export function Modal({ children, isOpen, onClose, modalContainer }: Props) {
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    isOpen ? modal.current?.showModal() : modal.current?.close();
  });

  function handleKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
    event.key === 'Escape' && onClose();
  }

  return (
    <dialog ref={modal} onKeyDown={handleKeyDown} className={modalContainer}>
      {children}
    </dialog>
  );
}
