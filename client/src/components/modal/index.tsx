import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface IModal {
  children: ReactNode;
  isOpen: boolean;
  onClickOutside?: () => void;
}

export const Modal = ({ isOpen, children, onClickOutside }: IModal) => {
  return createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center z-50
    ${isOpen ? 'pointer-events-auto' : 'invisible opacity-0 pointer-events-none'}`}
    >
      <div
        onClick={onClickOutside}
        className={`absolute w-full h-full bg-black z-40 transition 
        ${isOpen ? 'opacity-80' : 'opacity-0'}`}
      />
      <div className="z-50 p-2">{isOpen && children}</div>
    </div>,
    document.body
  );
};
