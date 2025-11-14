
import React from 'react';
import { Page } from '../types';

interface NavbarProps {
    activePage: Page;
    onNavigate: (page: Page) => void;
}

const pages: { label: Page; icon: React.ReactNode }[] = [
    { label: 'About', icon: <i className="far fa-user"></i> },
    { label: 'Resume', icon: <i className="far fa-file-alt"></i> },
    { label: 'Projects', icon: <i className="far fa-folder-open"></i> },
    { label: 'Contact', icon: <i className="far fa-envelope"></i> },
];

const NavButton: React.FC<{
  page: { label: Page; icon: React.ReactNode };
  isActive: boolean;
  onNavigate: (page: Page) => void;
}> = React.memo(({ page, isActive, onNavigate }) => (
    <li className="w-full">
        <button
            onClick={() => onNavigate(page.label)}
            className={`flex flex-col items-center justify-center w-full p-2 rounded-lg transition-all duration-300 ${isActive ? 'text-yellow-400 scale-110' : 'text-gray-500 dark:text-gray-400 hover:text-yellow-400 hover:scale-110'}`}
            aria-current={isActive ? 'page' : undefined}
        >
            <span className="text-2xl">{page.icon}</span>
            <span className="text-xs font-medium">{page.label}</span>
        </button>
    </li>
));

const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
    return (
        <nav className="fixed bottom-4 left-0 right-0 z-50 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/80 dark:bg-[#2a2a2a]/80 backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.3)] rounded-2xl">
                <ul className="flex justify-around p-1">
                    {pages.map((page) => (
                        <NavButton
                            key={page.label}
                            page={page}
                            isActive={activePage === page.label}
                            onNavigate={onNavigate}
                        />
                    ))}
                </ul>
            </div>
          </div>
        </nav>
    );
};

export default Navbar;