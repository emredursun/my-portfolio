
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
      
      {/* Container acts as the page with manual margins since @page margin is 0 */}
      <div className="p-[15mm] max-w-[210mm] mx-auto min-h-screen">
          {/* Header */}
          <header className="border-b-2 border-gray-800 pb-6 mb-8 flex justify-between items-end">
            <div>
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-2 text-gray-900">{PERSONAL_INFO.name}</h1>
                <h2 className="text-xl font-medium text-gray-600">{PERSONAL_INFO.title}</h2>
            </div>
            <div className="text-right text-sm text-gray-600 space-y-1">
                <div className="flex items-center justify-end gap-2">
                    {PERSONAL_INFO.email} <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <div className="flex items-center justify-end gap-2">
                    {PERSONAL_INFO.phone} <i className="fas fa-phone text-gray-400"></i>
                </div>
                <div className="flex items-center justify-end gap-2">
                    {PERSONAL_INFO.location} <i className="fas fa-map-marker-alt text-gray-400"></i>
                </div>
            </div>
          </header>

          {/* Summary */}
          <section className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 mb-3 pb-1">Professional Summary</h3>
            <p className="text-sm leading-relaxed text-gray-800 text-justify">{ABOUT_TEXT}</p>
          </section>

          <div className="flex gap-8">
              {/* Left Column: Experience & Education (Main Content) */}
              <div className="flex-1">
                  {/* Experience */}
                  <section className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 mb-4 pb-1">Professional Experience</h3>
                    <div className="space-y-6">
                        {EXPERIENCE.map((job, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-base text-gray-900">{job.title}</h4>
                                    <span className="text-xs font-medium text-gray-500 whitespace-nowrap ml-4">{job.date}</span>
                                </div>
                                <div className="text-sm font-semibold text-gray-700 mb-2">{job.company}</div>
                                <p className="text-xs text-gray-600 leading-relaxed text-justify">{job.description}</p>
                            </div>
                        ))}
                    </div>
                  </section>

                  {/* Education */}
                  <section>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 mb-4 pb-1">Education</h3>
                    <div className="space-y-4">
                        {EDUCATION.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-sm text-gray-900">{edu.title}</h4>
                                    <span className="text-xs font-medium text-gray-500 whitespace-nowrap ml-4">{edu.date}</span>
                                </div>
                                <div className="text-sm text-gray-700">{edu.company}</div>
                                <p className="text-xs text-gray-500 mt-1">{edu.description}</p>
                            </div>
                        ))}
                    </div>
                  </section>
              </div>

              {/* Right Column: Skills, Languages, Tech (Sidebar) */}
              <div className="w-1/3 shrink-0">
                  {/* Skills */}
                  <section className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 mb-4 pb-1">Core Skills</h3>
                    <ul className="text-xs space-y-2">
                        {SKILLS.map(skill => (
                            <li key={skill.name} className="flex justify-between items-center">
                                <span className="font-medium text-gray-800">{skill.name}</span>
                                <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden print:bg-gray-200">
                                    <div className="h-full bg-gray-400 print:bg-gray-500" style={{ width: `${skill.level}%` }}></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                  </section>

                  {/* Tech Stack */}
                  <section className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 mb-4 pb-1">Technical Stack</h3>
                    <div className="space-y-4">
                        {TECH_STACK.map((cat, idx) => (
                            <div key={idx}>
                                <h5 className="text-xs font-bold text-gray-700 mb-2">{cat.title}</h5>
                                <div className="flex flex-wrap gap-1.5">
                                    {cat.technologies.map(tech => (
                                        <span key={tech.name} className="text-[10px] border border-gray-300 px-2 py-0.5 rounded text-gray-600 bg-gray-50 print:bg-gray-50 print:border-gray-300">
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                  </section>

                  {/* Languages */}
                  <section>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 mb-4 pb-1">Languages</h3>
                    <ul className="text-xs space-y-2">
                        {LANGUAGES.map(lang => (
                            <li key={lang.name} className="flex flex-col">
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-800">{lang.name}</span>
                                    <span className="text-gray-500">{lang.level}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                  </section>
              </div>
          </div>
          
          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-400">Generated from {PERSONAL_INFO.name}'s Portfolio • {new Date().getFullYear()}</p>
          </footer>
      </div>
    </div>
  );
};

export default PrintableResume;
