import React from 'react';

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="bg-white p-4">
          <button onClick={onClose} className="text-gray-700 float-right">
            &times;
          </button>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
