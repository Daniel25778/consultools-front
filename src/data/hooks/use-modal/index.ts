import { useState } from 'react';

export interface useModalProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModal = (): useModalProps => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    document.body.scrollTop = 0;
    setIsOpen(false);
  };

  return { closeModal, isOpen, openModal };
};
