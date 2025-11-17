
import React from 'react';
import { TimelineItem, Skill } from '../types.ts';
import { EDUCATION, EXPERIENCE, SKILLS, TECH_STACK } from '../constants.tsx';

const PageTitle: React.FC<{ title: string }> = React.memo(({ title }) => (
    <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white relative inline-block">
            {title}
            <span className="absolute bottom-[-10px] left-0 w-1/2 h-1 bg-yellow-400"></span>
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

const Resume: React.FC = () => {
    return (
        <section>
            <PageTitle title="Resume" />
            
            <div>
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">My Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {SKILLS.map((skill, index) => (
                        <SkillBar key={index} skill={skill} />
                    ))}
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Tech Stack</h3>
                <div className="space-y-8">
                    {TECH_STACK.map(category => (
                        <div key={category.title}>
                            <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{category.title}</h4>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
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