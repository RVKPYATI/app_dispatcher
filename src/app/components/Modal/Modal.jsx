import React, { useEffect, useRef } from "react";

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const closeModalOnOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", closeModalOnOutsideClick);
    } else {
      document.removeEventListener("click", closeModalOnOutsideClick);
    }

    return () => {
      document.removeEventListener("click", closeModalOnOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        className="max-w-[95%] max-h-[90%] overflow-y-auto bg-white p-4 rounded-3xl shadow-lg z-10"
        ref={modalRef}
      >
        <div className="flex justify-end">
          <div
            className="flex items-center justify-center w-8 h-8 pb-1 bg-red-500 hover:bg-red-600 text-white text-lg leading-none font-bold rounded-full  focus:outline-none focus:shadow-outline-red active:bg-red-700 cursor-pointer"
            onClick={onClose}
          >
            &times;
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export { Modal };
