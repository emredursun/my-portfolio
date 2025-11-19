
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
            className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-all duration-300 font-medium group relative overflow-hidden
                ${isActive
                    ? 'bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/20 translate-x-2'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:translate-x-2 hover:shadow-md'
                }`
            }
            aria-current={isActive ? 'page' : undefined}
        >
            <span className={`text-xl w-6 text-center transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-125 group-hover:rotate-6'}`}>{page.icon}</span>
            <span className="relative z-10">{page.label}</span>
        </button>
    </li>
));

const Sidebar: React.FC<SidebarProps> = ({ theme, toggleTheme, activePage, onNavigate, isMobileView }) => {
    return (
        <aside className={`relative bg-white dark:bg-[#2a2a2a] rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg flex flex-col ${isMobileView ? 'w-full items-center text-center' : 'w-[320px] items-start text-left'}`}>
            <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
            <div className={`relative group ${isMobileView ? 'mt-12' : 'mt-0'}`}>
                <div className="overflow-hidden rounded-2xl border-4 border-gray-300 dark:border-gray-600 group-hover:border-yellow-400 transition-all duration-500 shadow-md group-hover:shadow-yellow-400/20">
                    <img
                        src={PERSONAL_INFO.avatar}
                        alt={PERSONAL_INFO.name}
                        className="w-40 h-40 object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-2"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 mt-6 group-hover:text-yellow-500 transition-colors duration-300">{PERSONAL_INFO.name}</h1>
            <p className="bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded-lg px-4 py-1.5 text-sm font-medium mb-6 border border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">{PERSONAL_INFO.title}</p>
            
            <div className="w-full border-t border-gray-200 dark:border-gray-700 my-6"></div>

            <ul className="space-y-4 text-left text-sm w-full">
                <InfoItem icon={<i className="fas fa-envelope text-yellow-400"></i>} label="EMAIL" value={PERSONAL_INFO.email} isLink href={`mailto:${PERSONAL_INFO.email}`} />
                <InfoItem icon={<i className="fas fa-phone text-yellow-400"></i>} label="PHONE" value={PERSONAL_INFO.phone} isLink href={`tel:${PERSONAL_INFO.phone}`} />
                <InfoItem icon={<i className="fas fa-map-marker-alt text-yellow-400"></i>} label="LOCATION" value={PERSONAL_INFO.location} />
            </ul>

            <div className="w-full border-t border-gray-200 dark:border-gray-700 my-6"></div>

            <div className="w-full">
                <div className="flex w-full space-x-3 justify-center">
                    {SOCIAL_LINKS.map(link => (
                        <a 
                            key={link.name} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-lg md:text-xl shadow-sm text-gray-500 dark:text-gray-400 hover:text-white hover:bg-yellow-400 dark:hover:bg-yellow-500 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-400/30"
                            aria-label={`Follow on ${link.name.charAt(0).toUpperCase() + link.name.slice(1)}`}
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                <a 
                    href={PERSONAL_INFO.resumeUrl} 
                    download 
                    className="mt-8 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_-6px_rgba(250,204,21,0.6)] group overflow-hidden relative"
                >
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl"></span>
                    <i className="fas fa-download transition-transform group-hover:animate-bounce"></i>
                    <span className="relative">Download Resume</span>
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
    icon: React.ReactNode;
    label: string;
    value: string;
    isLink?: boolean;
    href?: string;
}
const InfoItem: React.FC<InfoItemProps> = React.memo(({ icon, label, value, isLink, href }) => {
    const Content = () => (
        <>
            <div className="bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:border-yellow-400 group-hover:shadow-md">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <span className="text-gray-400 dark:text-gray-500 text-xs font-bold tracking-wider block mb-0.5">{label}</span>
                <p className="text-gray-900 dark:text-white font-medium truncate transition-colors duration-300 group-hover:text-yellow-500" title={value}>{value}</p>
            </div>
        </>
    );

    return (
        <li className="flex items-center gap-4 group transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 -mx-2 rounded-lg">
            {isLink ? (
                <a href={href} className="flex items-center gap-4 w-full">
                   <Content />
                </a>
            ) : (
                <Content />
            )}
        </li>
    );
});

export default Sidebar;
