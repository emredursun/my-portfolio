
import React from 'react';
import { PERSONAL_INFO, ABOUT_TEXT, EXPERIENCE, EDUCATION, SKILLS, LANGUAGES, TECH_STACK } from '../constants.tsx';

const PrintableResume: React.FC = () => {
  return (
    <div className="hidden print:block bg-white text-black font-sans leading-normal">
      <style>{`
        @media print {
          @page {
            margin: 0;
            size: auto;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            margin: 0;
            padding: 0;
          }
          /* Ensure no other elements interfere */
          body > *:not(#root) {
            display: none;
          }
        }
      `}</style>
      
      {/* Page container with padding */}
      <div className="p-[15mm] max-w-[210mm] mx-auto min-h-screen">
          
          {/* 1. Header - Centered & Clean */}
          <header className="text-center border-b-2 border-gray-900 pb-6 mb-6">
            <h1 className="text-4xl font-bold uppercase tracking-tight text-gray-900 mb-2">{PERSONAL_INFO.name}</h1>
            <p className="text-xl font-medium text-gray-600 mb-3">{PERSONAL_INFO.title}</p>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <i className="fas fa-envelope text-gray-400"></i> {PERSONAL_INFO.email}
                </div>
                <div className="flex items-center gap-2">
                    <i className="fas fa-phone text-gray-400"></i> {PERSONAL_INFO.phone}
                </div>
                <div className="flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-gray-400"></i> {PERSONAL_INFO.location}
                </div>
                {/* Optional: Link to portfolio if printed physically */}
                <div className="flex items-center gap-2">
                     <i className="fas fa-globe text-gray-400"></i> emredursun.nl
                </div>
            </div>
          </header>

          {/* 2. Summary - Full Width */}
          <section className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 mb-3 pb-1">Professional Summary</h3>
            <p className="text-sm leading-relaxed text-gray-800 text-justify">{ABOUT_TEXT}</p>
          </section>

          {/* 3. Skills & Tech Grid - 3 Columns at the Top */}
          <section className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 mb-4 pb-1">Technical Expertise</h3>
            <div className="grid grid-cols-3 gap-6">
                
                {/* Column 1: Core Skills */}
                <div>
                    <h4 className="text-xs font-bold text-gray-700 uppercase mb-2">Core Competencies</h4>
                    <ul className="text-xs space-y-1.5">
                        {SKILLS.slice(0, 8).map(skill => (
                            <li key={skill.name} className="flex justify-between items-center">
                                <span className="font-medium text-gray-800">{skill.name}</span>
                                {/* Minimalist bar */}
                                <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden print:bg-gray-200">
                                    <div className="h-full bg-gray-600 print:bg-gray-600" style={{ width: `${skill.level}%` }}></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 2: Tech Stack */}
                <div>
                    <h4 className="text-xs font-bold text-gray-700 uppercase mb-2">Technologies & Tools</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {TECH_STACK.flatMap(cat => cat.technologies).map(tech => (
                             <span key={tech.name} className="text-[10px] border border-gray-300 px-2 py-0.5 rounded text-gray-700 bg-gray-50 print:bg-gray-50 print:border-gray-300">
                                {tech.name}
                             </span>
                        ))}
                    </div>
                </div>

                {/* Column 3: Languages & Key Domains */}
                <div>
                    <h4 className="text-xs font-bold text-gray-700 uppercase mb-2">Languages</h4>
                    <ul className="text-xs space-y-1 mb-4">
                        {LANGUAGES.map(lang => (
                            <li key={lang.name} className="flex justify-between">
                                <span className="font-medium text-gray-800">{lang.name}</span>
                                <span className="text-gray-500">{lang.level}</span>
                            </li>
                        ))}
                    </ul>
                     <h4 className="text-xs font-bold text-gray-700 uppercase mb-2">Key Domains</h4>
                     <div className="flex flex-wrap gap-1.5">
                        {['Test Automation', 'CI/CD Pipelines', 'API Testing', 'Agile/Scrum', 'Banking', 'E-commerce'].map(d => (
                            <span key={d} className="text-[10px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                                {d}
                            </span>
                        ))}
                     </div>
                </div>
            </div>
          </section>

          {/* 4. Experience - Full Width */}
          <section className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 mb-4 pb-1">Professional Experience</h3>
            <div className="space-y-5">
                {EXPERIENCE.map((job, index) => (
                    <div key={index} className="break-inside-avoid">
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-base text-gray-900">{job.title}</h4>
                            <span className="text-xs font-bold text-gray-600 whitespace-nowrap">{job.date}</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-700 mb-2 italic">{job.company}</div>
                        <p className="text-sm text-gray-700 leading-relaxed text-justify">{job.description}</p>
                    </div>
                ))}
            </div>
          </section>

          {/* 5. Education - Full Width */}
          <section className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 mb-4 pb-1">Education</h3>
            <div className="space-y-4">
                {EDUCATION.map((edu, index) => (
                    <div key={index} className="break-inside-avoid">
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-sm text-gray-900">{edu.title}</h4>
                            <span className="text-xs font-bold text-gray-600 whitespace-nowrap">{edu.date}</span>
                        </div>
                        <div className="text-sm text-gray-700 italic">{edu.company}</div>
                        <p className="text-xs text-gray-600 mt-1">{edu.description}</p>
                    </div>
                ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-auto pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-400">Generated from {PERSONAL_INFO.name}'s Portfolio • {new Date().getFullYear()}</p>
          </footer>
      </div>
    </div>
  );
};

export default PrintableResume;
