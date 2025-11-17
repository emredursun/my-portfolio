
import React from 'react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../constants.tsx';
import ThemeSwitcher from './ThemeSwitcher.tsx';
import { Page } from '../types.ts';

interface SidebarProps {
  theme: string;
  toggleTheme: () => void;
  activePage: Page;
  onNavigate: (page: Page) => void;
  isMobileView: boolean;
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
    <li>
        <button
            onClick={() => onNavigate(page.label)}
            className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-all duration-300 font-medium group
                ${isActive
                    ? 'bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/20'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                }`
            }
            aria-current={isActive ? 'page' : undefined}
        >
            <span className="text-xl w-6 text-center transition-transform duration-300 group-hover:scale-125">{page.icon}</span>
            <span>{page.label}</span>
        </button>
    </li>
));

const Sidebar: React.FC<SidebarProps> = ({ theme, toggleTheme, activePage, onNavigate, isMobileView }) => {
    return (
        <aside className={`relative bg-white dark:bg-[#2a2a2a] rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg flex flex-col ${isMobileView ? 'w-full items-center text-center' : 'w-[320px] items-start text-left'}`}>
            <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
            <div className={`relative group ${isMobileView ? 'mt-12' : 'mt-0'}`}>
                <img
                    src={PERSONAL_INFO.avatar}
                    alt={PERSONAL_INFO.name}
                    className="rounded-2xl w-40 h-40 object-cover mb-6 border-4 border-gray-300 dark:border-gray-600 group-hover:border-yellow-400 transition-colors duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-2xl transition-all duration-300"></div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{PERSONAL_INFO.name}</h1>
            <p className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md px-3 py-1 text-sm font-medium mb-6">{PERSONAL_INFO.title}</p>
            
            <div className="w-full border-t border-gray-200 dark:border-gray-700 my-6"></div>

            <ul className="space-y-4 text-left text-sm w-full">
                <InfoItem icon={<i className="fas fa-envelope text-yellow-400"></i>} label="EMAIL" value={PERSONAL_INFO.email} />
                <InfoItem icon={<i className="fas fa-phone text-yellow-400"></i>} label="PHONE" value={PERSONAL_INFO.phone} />
                <InfoItem icon={<i className="fas fa-map-marker-alt text-yellow-400"></i>} label="LOCATION" value={PERSONAL_INFO.location} />
            </ul>

            <div className="w-full border-t border-gray-200 dark:border-gray-700 my-6"></div>

            <div className="w-full">
                <div className="flex w-full space-x-4 justify-center">
                    {SOCIAL_LINKS.map(link => (
                        <a 
                            key={link.name} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-12 h-12 bg-gray-100 dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center text-xl shadow-md text-gray-500 dark:text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/50 hover:bg-yellow-400/10"
                            aria-label={`Follow on ${link.name.charAt(0).toUpperCase() + link.name.slice(1)}`}
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                <a href={PERSONAL_INFO.resumeUrl} download className="mt-8 w-full bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition-all duration-300 hover:-translate-y-1">
                    <i className="fas fa-download"></i>
                    Download Resume
                </a>

                {!isMobileView && (
                  <>
                    <div className="w-full border-t border-gray-200 dark:border-gray-700 my-6"></div>
                    <nav className="w-full" aria-label="Main navigation">
                        <ul className="space-y-2">
                            {pages.map((page) => (
                                <NavButton
                                    key={page.label}
                                    page={page}
                                    isActive={activePage === page.label}
                                    onNavigate={onNavigate}
                                />
                            ))}
                        </ul>
                    </nav>
                  </>
                )}
            </div>
        </aside>
    );
};

interface InfoItemProps {
    // Fix for: Cannot find namespace 'JSX'.
    icon: React.ReactNode;
    label: string;
    value: string;
}
const InfoItem: React.FC<InfoItemProps> = React.memo(({ icon, label, value }) => (
    <li className="flex items-center gap-4 group">
        <div className="bg-gray-100 dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 w-12 h-12 rounded-lg flex items-center justify-center text-xl shadow-md transition-all duration-300 group-hover:scale-110 group-hover:border-yellow-400/50 group-hover:bg-yellow-400/10">
            {icon}
        </div>
        <div>
            <span className="text-gray-500 dark:text-gray-400 text-xs block">{label}</span>
            <p className="text-gray-900 dark:text-white font-medium break-all transition-colors duration-300 group-hover:text-yellow-400">{value}</p>
        </div>
    </li>
));

export default Sidebar;