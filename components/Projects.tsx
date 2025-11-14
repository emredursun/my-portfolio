import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../constants';
import ProjectModal from './ProjectModal';

const PageTitle: React.FC<{ title: string }> = React.memo(({ title }) => (
    <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white relative inline-block">
            {title}
            <span className="absolute bottom-[-10px] left-0 w-1/2 h-1 bg-yellow-400"></span>
        </h2>
    </div>
));

const ProjectCard: React.FC<{ project: Project; onOpen: () => void; }> = ({ project, onOpen }) => (
    <div
        className="group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/20 hover:-translate-y-2 hover:border-yellow-400/50 cursor-pointer animate-fade-in-up"
        onClick={onOpen}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen()}
        role="button"
        tabIndex={0}
    >
        <img
            src={project.image}
            alt={project.title}
            className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            width="400"
            height="300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white text-3xl p-3 bg-yellow-400/20 rounded-full">
                <i className="fas fa-plus"></i>
            </div>
        </div>
        <div className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{project.category}</p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-yellow-400">{project.title}</h3>
        </div>
    </div>
);

const Projects: React.FC = () => {
    const [activeCategories, setActiveCategories] = useState<string[]>([]);
    const [activeTechnologies, setActiveTechnologies] = useState<string[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isTechDropdownOpen, setIsTechDropdownOpen] = useState(false);

    const categoryDropdownRef = useRef<HTMLDivElement>(null);
    const techDropdownRef = useRef<HTMLDivElement>(null);

    const categories = useMemo(() => [...new Set(PROJECTS.map(p => p.category))].sort(), []);
    
    const technologies = useMemo(() => {
        const allTechs = PROJECTS.flatMap(p => p.technologies);
        return [...new Set(allTechs)].sort();
    }, []);

    const filteredProjects = useMemo(() => {
        return PROJECTS.filter(project => {
            const categoryMatch = activeCategories.length === 0 || activeCategories.some(cat => project.category === cat);
            const technologyMatch = activeTechnologies.length === 0 || activeTechnologies.every(tech => project.technologies.includes(tech));
            return categoryMatch && technologyMatch;
        });
    }, [activeCategories, activeTechnologies]);
    
    const handleCategoryToggle = (cat: string) => {
        setActiveCategories(prev =>
            prev.includes(cat)
                ? prev.filter(c => c !== cat)
                : [...prev, cat]
        );
    };

    const handleTechnologyToggle = (tech: string) => {
        setActiveTechnologies(prev =>
            prev.includes(tech)
                ? prev.filter(t => t !== tech)
                : [...prev, tech]
        );
    };
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
                setIsCategoryDropdownOpen(false);
            }
            if (techDropdownRef.current && !techDropdownRef.current.contains(event.target as Node)) {
                setIsTechDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <section>
            <PageTitle title="Projects" />
            
            <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1e1e1e] rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {/* Category Filter */}
                    <div className="grid grid-cols-[max-content_1fr] items-center gap-3">
                        <label htmlFor="category-btn" className="font-semibold text-gray-700 dark:text-gray-300">Category:</label>
                        <div className="relative" ref={categoryDropdownRef}>
                            <button
                                id="category-btn"
                                onClick={() => setIsCategoryDropdownOpen(prev => !prev)}
                                className="w-full flex items-center justify-between px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                aria-haspopup="listbox"
                                aria-expanded={isCategoryDropdownOpen}
                            >
                                <span>
                                    {activeCategories.length === 0 ? 'Select...' : `${activeCategories.length} selected`}
                                </span>
                                <i className={`fas fa-chevron-down ml-2 text-xs transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}></i>
                            </button>
                            {isCategoryDropdownOpen && (
                                <div className="absolute top-full mt-2 w-full z-20 bg-white dark:bg-[#2a2a2a] rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
                                    <ul className="p-2" role="listbox">
                                        {categories.map(cat => (
                                            <li key={cat} role="option" aria-selected={activeCategories.includes(cat)}>
                                                <label className="flex items-center w-full px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-0 dark:focus:ring-offset-gray-800"
                                                        checked={activeCategories.includes(cat)}
                                                        onChange={() => handleCategoryToggle(cat)}
                                                    />
                                                    <span className="ml-3 text-sm">{cat}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                    {activeCategories.length > 0 && (
                                         <div className="border-t border-gray-200 dark:border-gray-700 p-2">
                                             <button
                                                 onClick={() => setActiveCategories([])}
                                                 className="w-full text-center px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-md font-medium"
                                             >
                                                 Clear selection
                                             </button>
                                         </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Technology Filter */}
                    <div className="grid grid-cols-[max-content_1fr] items-center gap-3">
                        <label htmlFor="tech-btn" className="font-semibold text-gray-700 dark:text-gray-300">Technology:</label>
                        <div className="relative" ref={techDropdownRef}>
                            <button
                                id="tech-btn"
                                onClick={() => setIsTechDropdownOpen(prev => !prev)}
                                className="w-full flex items-center justify-between px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                aria-haspopup="listbox"
                                aria-expanded={isTechDropdownOpen}
                            >
                                <span>
                                    {activeTechnologies.length === 0 ? 'Select...' : `${activeTechnologies.length} selected`}
                                </span>
                                <i className={`fas fa-chevron-down ml-2 text-xs transition-transform duration-200 ${isTechDropdownOpen ? 'rotate-180' : ''}`}></i>
                            </button>
                            
                            {isTechDropdownOpen && (
                                <div className="absolute top-full mt-2 w-full z-20 bg-white dark:bg-[#2a2a2a] rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
                                    <ul className="p-2" role="listbox">
                                        {technologies.map(tech => (
                                            <li key={tech} role="option" aria-selected={activeTechnologies.includes(tech)}>
                                                <label className="flex items-center w-full px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-0 dark:focus:ring-offset-gray-800"
                                                        checked={activeTechnologies.includes(tech)}
                                                        onChange={() => handleTechnologyToggle(tech)}
                                                    />
                                                    <span className="ml-3 text-sm">{tech}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                    {activeTechnologies.length > 0 && (
                                         <div className="border-t border-gray-200 dark:border-gray-700 p-2">
                                             <button
                                                 onClick={() => {
                                                     setActiveTechnologies([]);
                                                 }}
                                                 className="w-full text-center px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-md font-medium"
                                             >
                                                 Clear selection
                                             </button>
                                         </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {filteredProjects.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard 
                            key={`${project.title}-${index}`} 
                            project={project} 
                            onOpen={() => setSelectedProject(project)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-500 dark:text-gray-400">No projects match the selected filters.</p>
                </div>
            )}

            {selectedProject && (
                <ProjectModal 
                    project={selectedProject} 
                    onClose={() => setSelectedProject(null)} 
                />
            )}
        </section>
    );
};

export default Projects;