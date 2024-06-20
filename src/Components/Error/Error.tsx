"use client"
import React, { useState } from "react";

interface ErrorComponentProps {
  error: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 h-screen">
      <div className="bg-gray-800 text-white text-center rounded-lg p-8 shadow-lg relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h1 className="mb-4 text-xl font-semibold">An Error Occurred</h1>
        <p className="mb-4">Please fix the error and reload the page.</p>
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
