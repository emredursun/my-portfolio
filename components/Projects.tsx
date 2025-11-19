
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Project } from '../types.ts';
import { PROJECTS } from '../constants.tsx';
import ProjectModal from './ProjectModal.tsx';

const PageTitle: React.FC<{ title: string }> = React.memo(({ title }) => (
    <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white relative inline-block">
            {title}
            <span className="absolute bottom-[-10px] left-0 w-full h-1 bg-yellow-400 rounded-full"></span>
        </h2>
    </div>
));

const ProjectCard: React.FC<{ project: Project; onOpen: () => void; }> = ({ project, onOpen }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        setRotation({ x: yPct * -10, y: xPct * 10 });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setIsHovering(false);
    };

    return (
        <div className="perspective-1000 h-full">
            <div
                ref={cardRef}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 shadow-md transition-all duration-200 ease-out cursor-pointer animate-fade-in-up flex flex-col h-full"
                onClick={onOpen}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen()}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={handleMouseLeave}
                role="button"
                tabIndex={0}
                style={{
                    transform: isHovering ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)` : 'rotateX(0) rotateY(0) scale3d(1, 1, 1)',
                    transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
                }}
            >
                <div className="relative overflow-hidden h-56 transform-style-3d">
                    <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                    
                    {/* Dynamic Glare Effect */}
                    <div 
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none"
                        style={{
                            transform: `translate(${rotation.y * 2}%, ${rotation.x * 2}%)`
                        }}
                    ></div>

                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                        loading="lazy"
                        width="400"
                        height="300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 backdrop-blur-[2px]">
                        <div className="text-yellow-400 text-4xl p-4 bg-white/10 rounded-full backdrop-blur-md transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-xl border border-white/20">
                            <i className="fas fa-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="p-6 flex-1 flex flex-col transform-style-3d">
                    <p className="text-xs font-bold text-yellow-500 uppercase tracking-wider mb-2 transform translate-z-10">{project.category}</p>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-yellow-500 mb-2 transform translate-z-20">{project.title}</h3>
                    <div className="mt-auto pt-4 flex flex-wrap gap-2 transform translate-z-10">
                        {project.technologies.slice(0,3).map(tech => (
                            <span key={tech} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                                +{project.technologies.length - 3}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

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
            
            <div className="mb-10 p-4 md:p-6 bg-gray-50 dark:bg-[#1e1e1e] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category Filter */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category-btn" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Category</label>
                        <div className="relative" ref={categoryDropdownRef}>
                            <button
                                id="category-btn"
                                onClick={() => setIsCategoryDropdownOpen(prev => !prev)}
                                className={`w-full flex items-center justify-between px-4 py-3.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-medium transition-all duration-300 border border-transparent hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm ${isCategoryDropdownOpen ? 'ring-2 ring-yellow-400 border-transparent' : ''}`}
                                aria-haspopup="listbox"
                                aria-expanded={isCategoryDropdownOpen}
                            >
                                <span>
                                    {activeCategories.length === 0 ? 'All Categories' : `${activeCategories.length} selected`}
                                </span>
                                <i className={`fas fa-chevron-down ml-2 text-xs transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180 text-yellow-400' : 'text-gray-400'}`}></i>
                            </button>
                            {isCategoryDropdownOpen && (
                                <div className="absolute top-full mt-2 w-full z-30 bg-white dark:bg-[#2a2a2a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto animate-fade-in">
                                    <ul className="p-2" role="listbox">
                                        {categories.map(cat => (
                                            <li key={cat} role="option" aria-selected={activeCategories.includes(cat)}>
                                                <label className="flex items-center w-full px-3 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-0 dark:focus:ring-offset-gray-800"
                                                        checked={activeCategories.includes(cat)}
                                                        onChange={() => handleCategoryToggle(cat)}
                                                    />
                                                    <span className="ml-3 text-sm font-medium">{cat}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                    {activeCategories.length > 0 && (
                                         <div className="border-t border-gray-200 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                                             <button
                                                 onClick={() => setActiveCategories([])}
                                                 className="w-full text-center px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg font-bold transition-colors"
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
                    <div className="flex flex-col gap-2">
                        <label htmlFor="tech-btn" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Technology</label>
                        <div className="relative" ref={techDropdownRef}>
                            <button
                                id="tech-btn"
                                onClick={() => setIsTechDropdownOpen(prev => !prev)}
                                className={`w-full flex items-center justify-between px-4 py-3.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-medium transition-all duration-300 border border-transparent hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm ${isTechDropdownOpen ? 'ring-2 ring-yellow-400 border-transparent' : ''}`}
                                aria-haspopup="listbox"
                                aria-expanded={isTechDropdownOpen}
                            >
                                <span>
                                    {activeTechnologies.length === 0 ? 'All Technologies' : `${activeTechnologies.length} selected`}
                                </span>
                                <i className={`fas fa-chevron-down ml-2 text-xs transition-transform duration-300 ${isTechDropdownOpen ? 'rotate-180 text-yellow-400' : 'text-gray-400'}`}></i>
                            </button>
                            
                            {isTechDropdownOpen && (
                                <div className="absolute top-full mt-2 w-full z-30 bg-white dark:bg-[#2a2a2a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto animate-fade-in">
                                    <ul className="p-2" role="listbox">
                                        {technologies.map(tech => (
                                            <li key={tech} role="option" aria-selected={activeTechnologies.includes(tech)}>
                                                <label className="flex items-center w-full px-3 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-0 dark:focus:ring-offset-gray-800"
                                                        checked={activeTechnologies.includes(tech)}
                                                        onChange={() => handleTechnologyToggle(tech)}
                                                    />
                                                    <span className="ml-3 text-sm font-medium">{tech}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                    {activeTechnologies.length > 0 && (
                                         <div className="border-t border-gray-200 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                                             <button
                                                 onClick={() => {
                                                     setActiveTechnologies([]);
                                                 }}
                                                 className="w-full text-center px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg font-bold transition-colors"
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
                <div className="text-center py-20 bg-gray-50 dark:bg-[#1e1e1e] rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                    <i className="fas fa-search text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
                    <p className="text-xl font-medium text-gray-500 dark:text-gray-400">No projects match the selected filters.</p>
                    <button 
                        onClick={() => {setActiveCategories([]); setActiveTechnologies([])}}
                        className="mt-4 text-yellow-500 hover:text-yellow-600 font-bold underline decoration-2 underline-offset-4"
                    >
                        Clear all filters
                    </button>
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
