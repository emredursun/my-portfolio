
import React from 'react';
import { TimelineItem, Skill, Language } from '../types.ts';
import { EDUCATION, EXPERIENCE, SKILLS, TECH_STACK, LANGUAGES } from '../constants.tsx';

const PageTitle: React.FC<{ title: string }> = React.memo(({ title }) => (
    <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white relative inline-block group">
            {title}
            <span className="absolute bottom-[-10px] left-0 w-full h-1 bg-yellow-400 rounded-full transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_10px_rgba(250,204,21,0.5)]"></span>
        </h2>
    </div>
));

const TimelineCard: React.FC<{ item: TimelineItem }> = React.memo(({ item }) => (
    <li className="relative pl-10 pb-10 border-l-2 border-gray-200 dark:border-gray-700 animate-fade-in-up group">
        <span className="absolute -left-[11px] top-6 w-5 h-5 bg-yellow-400 rounded-full border-4 border-white dark:border-[#2a2a2a] transition-all duration-500 group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(250,204,21,0.6)] z-10"></span>
        
        <div className="relative transition-all duration-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-2xl p-5 -ml-5 -mt-5 border border-transparent hover:border-gray-100 dark:hover:border-gray-700/50 hover:shadow-lg dark:hover:shadow-black/20 hover:translate-x-2 cursor-default">
            <p className="text-xs font-bold text-yellow-500 uppercase tracking-wide mb-2">{item.date}</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300 group-hover:text-yellow-500">{item.title}</h3>
            <p className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">{item.company}</p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{item.description}</p>
        </div>
    </li>
));

const SkillBar: React.FC<{ skill: Skill }> = React.memo(({ skill }) => (
    <div className="animate-fade-in-up group">
        <div className="flex justify-between mb-2">
            <span className="text-base font-bold text-gray-800 dark:text-gray-200 group-hover:text-yellow-500 transition-colors">{skill.name}</span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{skill.level}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
            <div className="bg-yellow-400 h-3 rounded-full skill-bar-fill relative group-hover:shadow-[0_0_10px_rgba(250,204,21,0.5)] transition-shadow duration-300" style={{ width: `${skill.level}%` }}>
                 <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite] skew-x-12"></div>
            </div>
        </div>
    </div>
));

const LanguageCard: React.FC<{ language: Language }> = React.memo(({ language }) => {
    const barCount = 5;
    const filledBars = Math.ceil((language.percentage / 100) * barCount);
    const bars = Array.from({ length: barCount }, (_, i) => i < filledBars);

    return (
        <div className="group relative overflow-hidden bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-400/10 hover:border-yellow-400/50 hover:-translate-y-2 min-h-[200px] flex flex-col">
            {/* Watermark Background */}
            <span className="absolute -right-4 -bottom-8 text-9xl font-black text-gray-100 dark:text-[#252525] opacity-50 pointer-events-none select-none transition-transform duration-500 group-hover:scale-110 group-hover:opacity-60 group-hover:rotate-[-10deg]">
                {language.code}
            </span>

            <div className="relative z-10 flex flex-col flex-1">
                {/* Header Section */}
                <div className="flex flex-col items-start gap-3 mb-2">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white leading-none group-hover:text-yellow-500 transition-colors">{language.name}</h4>
                    <div className="inline-flex items-center justify-center w-40 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 group-hover:bg-yellow-400 group-hover:text-gray-900 group-hover:border-yellow-500 group-hover:shadow-md transition-all duration-300 text-center whitespace-nowrap">
                        {language.level}
                    </div>
                </div>

                {/* Visualizer Section - Centered */}
                <div className="flex-1 flex items-center justify-center min-h-[60px]">
                     <div className="flex items-end gap-1.5 h-10">
                        {bars.map((isFilled, idx) => (
                            <div
                                key={idx}
                                className={`w-2.5 rounded-sm transition-all duration-300 ${
                                    isFilled 
                                        ? 'bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)] group-hover:bg-yellow-500 group-hover:animate-wave' 
                                        : 'bg-gray-100 dark:bg-gray-800'
                                }`}
                                style={{
                                    height: `${((idx + 1) / barCount) * 100}%`,
                                    animationDelay: `${idx * 0.1}s`
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Footer Section - Responsive Grid Stack for Animation */}
                <div className="relative w-full mt-2 grid grid-cols-1">
                    {/* Default State: Proficiency */}
                    <div className="col-start-1 row-start-1 flex items-center justify-start transition-all duration-500 ease-out transform group-hover:translate-y-[-150%] group-hover:opacity-0 group-hover:pointer-events-none">
                        <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
                            Proficiency: <span className="text-gray-600 dark:text-gray-300">{language.percentage}%</span>
                        </p>
                    </div>
                    
                    {/* Hover State: Greeting */}
                    <div className="col-start-1 row-start-1 flex items-center justify-start transition-all duration-500 ease-out transform translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                        <p className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <i className="far fa-comment-dots text-yellow-400 animate-pulse"></i>
                            "{language.greeting}"
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes wave {
                    0%, 100% { height: 30%; opacity: 0.7; }
                    50% { height: 100%; opacity: 1; transform: scaleY(1.1); }
                }
                .group:hover .group-hover\\:animate-wave {
                    animation: wave 0.8s ease-in-out infinite;
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%) skewX(-12deg); }
                    100% { transform: translateX(200%) skewX(-12deg); }
                }
            `}</style>
        </div>
    );
});

const Resume: React.FC = () => {
    return (
        <section>
            <PageTitle title="Resume" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Skills Section */}
                <div>
                    <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                            <i className="fas fa-code"></i>
                        </div>
                        My Skills
                    </h3>
                    <div className="space-y-8 bg-white dark:bg-[#1e1e1e] p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        {SKILLS.map((skill, index) => (
                            <SkillBar key={index} skill={skill} />
                        ))}
                    </div>
                </div>

                {/* Languages Section */}
                <div>
                     <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                            <i className="fas fa-language"></i>
                        </div>
                        Languages
                     </h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
                        {LANGUAGES.map((lang, index) => (
                            <LanguageCard key={index} language={lang} />
                        ))}
                     </div>
                </div>
            </div>

            <div className="mt-16">
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                        <i className="fas fa-layer-group"></i>
                    </div>
                    Tech Stack
                </h3>
                <div className="space-y-10">
                    {TECH_STACK.map(category => (
                        <div key={category.title} className="animate-fade-in-up">
                            <h4 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200 pl-4 border-l-4 border-yellow-400">{category.title}</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {category.technologies.map(tech => (
                                    <div key={tech.name} className="group bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:shadow-yellow-400/20 hover:border-yellow-400/50 min-h-[140px] relative overflow-hidden cursor-default">
                                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="w-16 h-16 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-full mb-1 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-sm">
                                            {tech.icon}
                                        </div>
                                        <p className="text-sm font-bold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors relative z-10">{tech.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
                <div>
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900 dark:text-white">
                        <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                            <i className="fas fa-briefcase"></i>
                        </div>
                        Experience
                    </h3>
                    <ul className="pl-2">
                        {EXPERIENCE.map((item, index) => (
                            <TimelineCard key={index} item={item} />
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900 dark:text-white">
                        <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                            <i className="fas fa-graduation-cap"></i>
                        </div>
                        Education
                    </h3>
                    <ul className="pl-2">
                        {EDUCATION.map((item, index) => (
                            <TimelineCard key={index} item={item} />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Resume;
