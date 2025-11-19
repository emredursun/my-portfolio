
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar.tsx';
import MainContent from './components/MainContent.tsx';
import Navbar from './components/Navbar.tsx';
import ScrollToTopButton from './components/ScrollToTopButton.tsx';
import CustomCursor from './components/CustomCursor.tsx';
import PrintableResume from './components/PrintableResume.tsx';
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
  const [readingProgress, setReadingProgress] = useState(0);
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
  
  // Reading Progress Logic & Scroll Button Visibility
  useEffect(() => {
    const handleScroll = () => {
      let scrollTop = 0;
      let scrollHeight = 0;
      let clientHeight = 0;

      if (isMobileView) {
        scrollTop = window.scrollY;
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = window.innerHeight;
      } else if (contentRef.current) {
        scrollTop = contentRef.current.scrollTop;
        scrollHeight = contentRef.current.scrollHeight;
        clientHeight = contentRef.current.clientHeight;
      }

      // Calculate Progress
      const winScroll = scrollTop;
      const height = scrollHeight - clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadingProgress(isNaN(scrolled) ? 0 : scrolled);
      
      // Scroll Button Logic
      let showThreshold = 300; // Default for desktop (scroll inside container)

      if (isMobileView && contentRef.current) {
          // On mobile, the window scrolls. The content is stacked below the Sidebar.
          // We only want to show the "Scroll to Top" button if the user has scrolled
          // DEEP into the actual content section.
          // contentRef.current.offsetTop gives us the Y position where the MainContent starts.
          // We add a buffer (e.g., 300px) so the button doesn't appear if the user just 
          // sees the top of the content or if the content is short.
          const contentStart = contentRef.current.offsetTop;
          showThreshold = contentStart + 300;
      }

      if (scrollTop > showThreshold) {
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
    <>
      {/* Resume for Print - Visible only when printing */}
      <PrintableResume />

      {/* Main Web App - Hidden when printing */}
      <main className={`print:hidden relative bg-gray-100 dark:bg-[#121212] text-gray-800 dark:text-white font-sans transition-all duration-300 ${isMobileView ? 'min-h-screen p-4' : 'h-screen overflow-hidden p-8'}`}>
        
        {/* Custom Liquid Cursor (Desktop Only) */}
        <CustomCursor />

        {/* Ambient Aura Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-400/20 blur-[120px] animate-blob mix-blend-multiply dark:mix-blend-overlay"></div>
          <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] rounded-full bg-blue-400/20 blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-overlay"></div>
           <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-purple-400/20 blur-[120px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-overlay"></div>
        </div>

        {/* Reading Progress Bar */}
        <div 
          className={`fixed left-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 z-[100] transition-all duration-100 ease-out ${isMobileView ? 'top-0' : 'top-0'}`}
          style={{ width: `${readingProgress}%` }}
        ></div>

        <div className={`relative z-10 max-w-7xl mx-auto flex gap-8 ${isMobileView ? 'flex-col' : 'flex-row h-full'}`}>
          <Sidebar
            theme={theme}
            toggleTheme={toggleTheme}
            activePage={activePage}
            onNavigate={handleNavigation}
            isMobileView={isMobileView}
          />
          <div ref={contentRef} className={`flex-1 scroll-smooth ${!isMobileView ? 'overflow-y-auto no-scrollbar' : ''}`}>
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
    </>
  );
};

export default App;
