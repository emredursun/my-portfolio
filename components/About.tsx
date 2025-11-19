
import React from 'react';
import { Service } from '../types.ts';
import { ABOUT_TEXT, SERVICES, ABOUT_INTRO, ABOUT_STORY } from '../constants.tsx';

const PageTitle: React.FC<{ title: string }> = React.memo(({ title }) => (
    <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white relative inline-block group">
            {title}
            <span className="absolute bottom-[-10px] left-0 w-full h-1 bg-yellow-400 rounded-full transition-all duration-500 group-hover:w-3/4"></span>
        </h2>
    </div>
));

const ServiceCard: React.FC<{ service: Service }> = React.memo(({ service }) => (
    <div className="group relative h-full perspective-1000">
        <div className="relative h-full bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-400/10 hover:border-yellow-400/50 hover:-translate-y-2 hover:scale-[1.02] flex flex-col">
            
            {/* Animated Background Pattern (Dot Matrix) */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                 style={{
                     backgroundImage: 'radial-gradient(#808080 1px, transparent 1px)',
                     backgroundSize: '20px 20px',
                     transform: 'scale(1.1)'
                 }}>
            </div>
            
            {/* Gradient Glow Effect */}
            <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-yellow-400/20 blur-[60px] rounded-full transition-all duration-500 group-hover:w-80 group-hover:h-80 group-hover:bg-yellow-400/10"></div>

            {/* Card Header: Icon & Decoration */}
            <div className="relative z-10 flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-[#252525] flex items-center justify-center text-3xl text-yellow-400 border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-500 group-hover:bg-yellow-400 group-hover:text-gray-900 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-lg shrink-0">
                    {service.icon}
                </div>
                {/* Decorative Tech Lines */}
                <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-yellow-400 transition-colors delay-75 duration-300"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-yellow-400 transition-colors delay-100 duration-300"></div>
                    <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-yellow-400 transition-colors delay-150 duration-300"></div>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors group-hover:text-yellow-500">
                    {service.title}
                </h3>
                
                {/* Overlapping Content Grid - Allows dynamic height based on tallest content */}
                <div className="grid grid-cols-1">
                    {/* Description (Fades out on hover) */}
                    <div className="col-start-1 row-start-1 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:-translate-y-4 group-hover:pointer-events-none">
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            {service.description}
                        </p>
                    </div>

                    {/* Tags (Slide up on hover) */}
                    <div className="col-start-1 row-start-1 transition-all duration-500 ease-out opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
                         <div className="flex flex-wrap gap-2">
                            {service.tags?.map((tag, idx) => (
                                <span key={idx} className="px-3 py-1 text-xs font-bold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-600 rounded-full shadow-sm hover:bg-yellow-400 hover:text-gray-900 hover:border-yellow-400 transition-colors cursor-default">
                                    {tag}
                                </span>
                            ))}
                         </div>
                         <div className="mt-4 flex items-center gap-2 text-yellow-600 dark:text-yellow-400 text-sm font-bold">
                            <span>View Details</span>
                            <i className="fas fa-arrow-right transform group-hover:translate-x-2 transition-transform"></i>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
));

const About: React.FC = () => {
    return (
        <section>
            <PageTitle title="About Me" />
            
            <div className="mb-12 space-y-8">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    I build reliable automation systems that help teams ship faster
                </h3>

                <div className="relative pl-6 border-l-4 border-yellow-400 py-1">
                    <p className="text-xl font-medium text-gray-800 dark:text-gray-200 italic leading-relaxed hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                        "{ABOUT_INTRO}"
                    </p>
                </div>

                <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                        {ABOUT_STORY}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                        {ABOUT_TEXT}
                    </p>
                </div>
            </div>

            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                    <i className="fas fa-layer-group"></i>
                </div>
                What I'm Doing
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SERVICES.map((service, index) => (
                    <ServiceCard key={index} service={service} />
                ))}
            </div>
        </section>
    );
};

export default About;
