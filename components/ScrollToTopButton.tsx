import React from 'react';

interface ScrollToTopButtonProps {
  onClick: () => void;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed right-4 bottom-24 lg:bottom-12 lg:right-12 xl:right-[calc((100vw-80rem)/2+3rem)] z-40 w-14 h-14 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center text-xl shadow-lg border-2 border-yellow-500/50 hover:bg-yellow-500 transition-all duration-300 hover:scale-110 hover:-translate-y-1 animate-fade-in"
      aria-label="Scroll to top"
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};

export default ScrollToTopButton;
