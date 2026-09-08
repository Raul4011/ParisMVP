import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  // lock scroll + restore state
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow || 'auto';
    };
  }, [isOpen]);

  // ESC close handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* overlay */}
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />

      {/* bottom sheet */}
      <div
        className="relative bg-white rounded-t-2xl p-4 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* handle */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

        {children}
      </div>
    </div>
  );
};

export default Modal;
