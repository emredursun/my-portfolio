
import React from 'react';
import { Service } from '../types.ts';
import { ABOUT_TEXT, SERVICES } from '../constants.tsx';

const PageTitle: React.FC<{ title: string }> = React.memo(({ title }) => (
    <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white relative inline-block">
            {title}
            <span className="absolute bottom-[-10px] left-0 w-1/2 h-1 bg-yellow-400"></span>
        </h2>
    </div>
));

const ServiceCard: React.FC<{ service: Service }> = React.memo(({ service }) => (
    <div className="bg-gray-100 dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex gap-4 items-start group hover:shadow-yellow-400/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400/50">
        <div>{service.icon}</div>
        <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-yellow-400">{service.title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{service.description}</p>
        </div>
    </div>
));

const About: React.FC = () => {
    return (
        <section>
            <PageTitle title="About Me" />
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-12">
                {ABOUT_TEXT}
            </p>
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">What I'm Doing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SERVICES.map((service, index) => (
                    <ServiceCard key={index} service={service} />
                ))}
            </div>
        </section>
    );
};

export default About;