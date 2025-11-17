
import React, { Suspense, lazy } from 'react';
import { Page } from '../types.ts';

// Lazy load page components for code-splitting
const About = lazy(() => import('./About.tsx'));
const Resume = lazy(() => import('./Resume.tsx'));
const Projects = lazy(() => import('./Projects.tsx'));
const Contact = lazy(() => import('./Contact.tsx'));

interface MainContentProps {
  activePage: Page;
  isMobileView: boolean;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent border-solid rounded-full animate-spin"></div>
  </div>
);

const MainContent: React.FC<MainContentProps> = ({ activePage, isMobileView }) => {
  const renderPage = () => {
    switch (activePage) {
      case 'About':
        return <About />;
      case 'Resume':
        return <Resume />;
      case 'Projects':
        return <Projects />;
      case 'Contact':
        return <Contact />;
      default:
        return <About />;
    }
  };

  return (
    <div className={`bg-white dark:bg-[#2a2a2a] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg ${isMobileView ? 'p-8 pb-40' : 'p-12'}`}>
      <div key={activePage} className="animate-fade-in">
        <Suspense fallback={<LoadingSpinner />}>
          {renderPage()}
        </Suspense>
      </div>
    </div>
  );
};

export default MainContent;