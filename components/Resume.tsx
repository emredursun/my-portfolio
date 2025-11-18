
import React from 'react';
import { TimelineItem, Skill, Language } from '../types.ts';
import { EDUCATION, EXPERIENCE, SKILLS, TECH_STACK, LANGUAGES } from '../constants.tsx';

const PageTitle: React.FC<{ title: string }> = React.memo(({ title }) => (
    <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white relative inline-block">
            {title}
            <span className="absolute bottom-[-10px] left-0 w-full h-1 bg-yellow-400 rounded-full"></span>
        </h2>
    </div>
));

const TimelineCard: React.FC<{ item: TimelineItem }> = React.memo(({ item }) => (
    <li className="relative pl-10 pb-10 border-l-2 border-gray-200 dark:border-gray-700 animate-fade-in-up group transition-colors duration-300 hover:border-yellow-400">
        <span className="absolute -left-[11px] top-1 w-5 h-5 bg-yellow-400 rounded-full border-4 border-white dark:border-[#2a2a2a] transition-transform duration-300 group-hover:scale-110"></span>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.date}</p>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300 group-hover:text-yellow-400">{item.title}</h3>
        <p className="text-md text-gray-600 dark:text-gray-300 mb-3">{item.company}</p>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{item.description}</p>
    </li>
));

const SkillBar: React.FC<{ skill: Skill }> = React.memo(({ skill }) => (
    <div className="animate-fade-in-up">
        <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-gray-900 dark:text-white">{skill.name}</span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{skill.level}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div className="bg-yellow-400 h-2.5 rounded-full skill-bar-fill" style={{ width: `${skill.level}%` }}></div>
        </div>
    </div>
));

const LanguageCard: React.FC<{ language: Language }> = React.memo(({ language }) => {
    const barCount = 5;
    // Calculate how many bars should be filled based on percentage (roughly)
    const filledBars = Math.ceil((language.percentage / 100) * barCount);
    const bars = Array.from({ length: barCount }, (_, i) => i < filledBars);

    return (
        <div className="group relative overflow-hidden bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/10 hover:border-yellow-400/50 hover:-translate-y-1 min-h-[200px]">
            {/* Watermark Background */}
            <span className="absolute -right-4 -bottom-8 text-9xl font-black text-gray-100 dark:text-[#252525] opacity-50 pointer-events-none select-none transition-transform duration-500 group-hover:scale-110 group-hover:opacity-60">
                {language.code}
            </span>

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">{language.name}</h4>
                        <div className="mt-1 inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-semibold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 group-hover:border-yellow-400/30 group-hover:text-yellow-500 transition-colors">
                            {language.level}
                        </div>
                    </div>
                    
                    {/* Signal Visualizer */}
                    <div className="flex items-end gap-1 h-10">
                        {bars.map((isFilled, idx) => (
                            <div
                                key={idx}
                                className={`w-2 rounded-sm transition-all duration-300 ${
                                    isFilled 
                                        ? 'bg-yellow-400 group-hover:animate-wave' 
                                        : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                                style={{
                                    height: `${((idx + 1) / barCount) * 100}%`,
                                    // Add staggering delay for wave animation
                                    animationDelay: `${idx * 0.1}s`
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Surprise Interaction: Reveal Greeting on Hover */}
                <div className="relative h-12 w-full overflow-hidden">
                    <div className="absolute inset-0 flex items-center transition-all duration-500 ease-out transform group-hover:-translate-y-full group-hover:opacity-0">
                        <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
                            Proficiency: {language.percentage}%
                        </p>
                    </div>
                    <div className="absolute inset-0 flex items-center transition-all duration-500 ease-out transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <i className="far fa-comment-dots text-yellow-400"></i>
                            "{language.greeting}"
                        </p>
                    </div>
                </div>
            </div>

            {/*ZS Add specific animation styles within the component for isolation */}
            <style>{`
                @keyframes wave {
                    0%, 100% { height: 30%; opacity: 0.7; }
                    50% { height: 100%; opacity: 1; }
                }
                .group:hover .group-hover\\:animate-wave {
                    animation: wave 0.8s ease-in-out infinite;
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
                        <i className="fas fa-code text-yellow-400"></i> My Skills
                    </h3>
                    <div className="space-y-6">
                        {SKILLS.map((skill, index) => (
                            <SkillBar key={index} skill={skill} />
                        ))}
                    </div>
                </div>

                {/* Languages Section - Modern Signal Design */}
                <div>
                     <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                        <i className="fas fa-language text-yellow-400"></i> Languages
                     </h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
                        {LANGUAGES.map((lang, index) => (
                            <LanguageCard key={index} language={lang} />
                        ))}
                     </div>
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                    <i className="fas fa-layer-group text-yellow-400"></i> Tech Stack
                </h3>
                <div className="space-y-8">
                    {TECH_STACK.map(category => (
                        <div key={category.title}>
                            <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 pl-4 border-l-4 border-yellow-400">{category.title}</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {category.technologies.map(tech => (
                                    <div key={tech.name} className="bg-gray-100 dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-lg p-3 flex flex-col items-center justify-center gap-2 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:shadow-yellow-400/20 hover:border-yellow-400/50 min-h-[120px]">
                                        <div className="w-16 h-16 flex items-center justify-center">
                                            {tech.icon}
                                        </div>
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">{tech.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white"><i className="fas fa-briefcase text-yellow-400"></i>Experience</h3>
                    <ul>
                        {EXPERIENCE.map((item, index) => (
                            <TimelineCard key={index} item={item} />
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white"><i className="fas fa-graduation-cap text-yellow-400"></i>Education</h3>
                    <ul>
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
