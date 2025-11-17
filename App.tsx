
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar.tsx';
import MainContent from './components/MainContent.tsx';
import Navbar from './components/Navbar.tsx';
import ScrollToTopButton from './components/ScrollToTopButton.tsx';
import { Page } from './types.ts';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('About');
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      let scrollTop = 0;
      if (isMobileView) {
        scrollTop = window.scrollY;
      } else if (contentRef.current) {
        scrollTop = contentRef.current.scrollTop;
      }
      
      if (scrollTop > window.innerHeight / 2) {
        setIsScrollButtonVisible(true);
      } else {
        setIsScrollButtonVisible(false);
      }
    };

    const scrollableElement = isMobileView ? window : contentRef.current;
    if (scrollableElement) {
      scrollableElement.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobileView]);

  const scrollToContentTop = useCallback(() => {
    if (contentRef.current) {
      if (isMobileView) {
        const topOffset = contentRef.current.offsetTop;
        window.scrollTo({
          top: topOffset,
          behavior: 'smooth',
        });
      } else {
        contentRef.current.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }
  }, [isMobileView]);
  
  const scrollToWindowTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigation = (page: Page) => {
    setActivePage(page);

    if (isMobileView) {
      if (page === 'About') {
        scrollToWindowTop();
      } else {
        scrollToContentTop();
      }
    } else {
      scrollToContentTop();
    }
  };

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <main className={`relative bg-gray-100 dark:bg-[#1e1e1e] text-gray-800 dark:text-white font-sans transition-all duration-300 ${isMobileView ? 'min-h-screen p-4' : 'h-screen overflow-hidden p-8'}`}>
      <div className={`max-w-7xl mx-auto flex gap-8 ${isMobileView ? 'flex-col' : 'flex-row h-full'}`}>
        <Sidebar
          theme={theme}
          toggleTheme={toggleTheme}
          activePage={activePage}
          onNavigate={handleNavigation}
          isMobileView={isMobileView}
        />
        <div ref={contentRef} className={`flex-1 ${!isMobileView ? 'overflow-y-auto' : ''}`}>
          <MainContent activePage={activePage} isMobileView={isMobileView} />
        </div>
      </div>
      {isMobileView && (
        <Navbar 
          activePage={activePage}
          onNavigate={handleNavigation}
        />
      )}
      {isScrollButtonVisible && <ScrollToTopButton onClick={isMobileView ? scrollToWindowTop : scrollToContentTop} />}
    </main>
  );
};

export default App;