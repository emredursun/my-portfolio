
import React, { useState } from 'react';
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
            
            {/* Avatar Section with Status Indicator */}
            <div className={`relative group ${isMobileView ? 'mt-12' : 'mt-0'}`}>
                <div className="relative overflow-hidden rounded-3xl border-4 border-white dark:border-gray-600 shadow-2xl shadow-black/5 dark:shadow-black/30 group-hover:shadow-yellow-400/20 transition-all duration-500">
                    <img
                        src={PERSONAL_INFO.avatar}
                        alt={PERSONAL_INFO.name}
                        className="w-40 h-40 object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-2"
                    />
                    {/* Glass overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
                
                {/* Live Status Indicator */}
                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-[#2a2a2a] p-1.5 rounded-full z-20">
                    <div className="relative flex items-center justify-center w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-[#2a2a2a]">
                         <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                         <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </div>
                </div>
            </div>

            <div className="mt-6 mb-6 w-full">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2 group-hover:text-yellow-500 transition-colors duration-300">{PERSONAL_INFO.name}</h1>
                <div className="inline-block bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5 border border-gray-200 dark:border-gray-700">
                     <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{PERSONAL_INFO.title}</p>
                </div>
            </div>
            
            <div className="w-full border-t border-gray-200 dark:border-gray-700 mb-6"></div>

            {/* Smart Contact List */}
            <ul className="space-y-5 text-left text-sm w-full">
                <InfoItem 
                    icon={<i className="fas fa-envelope"></i>} 
                    label="EMAIL" 
                    value={PERSONAL_INFO.email} 
                    type="copy"
                    copyValue={PERSONAL_INFO.email}
                />
                <InfoItem 
                    icon={<i className="fas fa-phone"></i>} 
                    label="PHONE" 
                    value={PERSONAL_INFO.phone} 
                    type="copy"
                    copyValue={PERSONAL_INFO.phone}
                />
                <InfoItem 
                    icon={<i className="fas fa-map-marker-alt"></i>} 
                    label="LOCATION" 
                    value={PERSONAL_INFO.location} 
                    type="static"
                />
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
                            className="group/icon w-10 h-10 md:w-11 md:h-11 bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-lg md:text-xl shadow-sm text-gray-500 dark:text-gray-400 hover:text-white hover:bg-yellow-400 dark:hover:bg-yellow-500 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-400/30 relative overflow-hidden"
                            aria-label={`Follow on ${link.name.charAt(0).toUpperCase() + link.name.slice(1)}`}
                        >
                            <span className="relative z-10 transition-transform duration-300 group-hover/icon:scale-110">{link.icon}</span>
                        </a>
                    ))}
                </div>

                <a 
                    href={PERSONAL_INFO.resumeUrl} 
                    download 
                    className="mt-8 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_-6px_rgba(250,204,21,0.6)] group overflow-hidden relative border border-yellow-300"
                >
                    <span className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl"></span>
                    <i className="fas fa-download transition-transform group-hover:animate-bounce relative z-10"></i>
                    <span className="relative z-10">Download Resume</span>
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
    type: 'static' | 'copy';
    copyValue?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, type, copyValue }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (type === 'copy' && copyValue) {
            navigator.clipboard.writeText(copyValue);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const Content = () => (
        <>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm transition-all duration-300 border shrink-0
                ${copied 
                    ? 'bg-green-100 border-green-200 text-green-600 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400 scale-110' 
                    : 'bg-gray-50 dark:bg-[#1e1e1e] border-gray-200 dark:border-gray-700 text-yellow-400 group-hover:border-yellow-400 group-hover:bg-yellow-50 dark:group-hover:bg-yellow-900/10'
                }`}>
                {copied ? <i className="fas fa-check"></i> : icon}
            </div>
            <div className="flex-1 min-w-0 flex flex-col items-start">
                <span className="text-gray-400 dark:text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-0.5">{label}</span>
                <div className="relative w-full">
                    <p className={`text-gray-900 dark:text-white font-medium text-sm truncate transition-opacity duration-200 ${type === 'copy' ? 'group-hover:opacity-0' : ''}`} title={value}>
                        {value}
                    </p>
                    {type === 'copy' && (
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center">
                            <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 rounded flex items-center gap-1">
                                <i className="far fa-copy"></i> {copied ? 'Copied!' : 'Copy'}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );

    return (
        <li className="group">
            {type === 'copy' ? (
                <button 
                    onClick={handleCopy} 
                    className="flex items-center gap-3 w-full text-left p-2 -ml-2 rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
                    aria-label={`Copy ${label}`}
                >
                   <Content />
                </button>
            ) : (
                <div className="flex items-center gap-3 w-full p-2 -ml-2">
                    <Content />
                </div>
            )}
        </li>
    );
};

export default Sidebar;
