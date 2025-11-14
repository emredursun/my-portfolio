import React from 'react';

interface ThemeSwitcherProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = React.memo(({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="absolute top-6 right-6 z-50 w-12 h-12 bg-gray-200 dark:bg-[#1e1e1e] text-gray-600 dark:text-yellow-400 rounded-lg flex items-center justify-center text-xl shadow-md border border-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:rotate-12"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
    </button>
  );
});

export default ThemeSwitcher;