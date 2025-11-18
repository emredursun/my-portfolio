
import React from 'react';
import { Service, TimelineItem, Skill, Project, TechCategory } from './types.ts';

export const PERSONAL_INFO = {
    name: 'Emre Dursun',
    title: 'ISTQB® Certified Automation Engineer',
    email: 'info.emredursun@gmail.com',
    phone: '+31 6 2878 8948',
    location: 'Amsterdam, Netherlands',
    avatar: 'https://www.emredursun.nl/images/profile.png',
    resumeUrl: '#',
};

export const SOCIAL_LINKS = [
    { name: 'github', icon: <i className="fab fa-github"></i>, url: 'https://github.com/dursunemre' },
    { name: 'linkedin', icon: <i className="fab fa-linkedin-in"></i>, url: 'https://www.linkedin.com/in/dursunemre/' },
    { name: 'medium', icon: <i className="fab fa-medium"></i>, url: 'https://medium.com/@dursunemre' },
    { name: 'twitter', icon: <i className="fab fa-twitter"></i>, url: 'https://twitter.com/dursunemre' },
    { name: 'instagram', icon: <i className="fab fa-instagram"></i>, url: 'https://instagram.com/dursunemre' },
];

export const SERVICES: Service[] = [
    {
        icon: <i className="fas fa-code text-3xl text-yellow-400"></i>,
        title: 'Web Development',
        description: 'High-quality development of sites at the professional level.',
    },
    {
        icon: <i className="fas fa-mobile-alt text-3xl text-yellow-400"></i>,
        title: 'Mobile App Development',
        description: 'Professional development of applications for iOS and Android.',
    },
    {
        icon: <i className="fas fa-paint-brush text-3xl text-yellow-400"></i>,
        title: 'UI/UX Design',
        description: 'The most modern and high-quality design made at a professional level.',
    },
    {
        icon: <i className="fas fa-chalkboard-teacher text-3xl text-yellow-400"></i>,
        title: 'Mentoring',
        description: 'I can mentor you in software development and guide you in your career path.',
    },
];

export const ABOUT_TEXT = "ISTQB® Certified Full-Stack Automation Engineer with experience in UI, API, and database testing using Java, Selenium, Cucumber, Postman, and Rest Assured. Skilled in designing scalable automation frameworks and integrating them with CI/CD pipelines. Proven track record of contributing to high-quality releases in Agile teams across banking, healthcare, and e-commerce domains. Fluent in Dutch, English, and Turkish (native).";

export const EDUCATION: TimelineItem[] = [
    {
        date: 'June 2022 - June 2023',
        title: 'Bachelor of Engineering - Full-Stack Automation Engineering',
        company: 'TechPro Education - Online/Remote',
        description: 'Key Skills Developed: Test Automation (Selenium WebDriver, Cypress, Postman API, REST APIs, RESTful WebServices), CI/CD (Jenkins), Frameworks (Hybrid Framework, Cucumber/BDD), Languages/Tools (Java, Gherkin, SQL, Maven, TestNG, JUnit), Methodologies (Agile, Scrum, SDLC, QA Engineering, Test Planning), and more.',
    },
    {
        date: 'September 2019 - April 2020',
        title: 'Software Developer',
        company: 'ROC van Twente - Enschede, Netherlands',
        description: 'Key Skills Developed: Core Programming (C#, JavaScript), Database Management (SQL, T-SQL, MongoDB), Version Control (Git, GitHub), Web Fundamentals (HTML, CSS), and Object-Oriented Programming (OOP).',
    },
    {
        date: 'October 2017 - March 2018',
        title: 'Full-Stack Web Development',
        company: 'HackYourFuture - Amsterdam, Netherlands',
        description: 'Key Skills Developed: Web Technologies (HTML, CSS, JavaScript), API Testing, Version Control (Git, GitHub), C#, SQL, and Object-Oriented Programming (OOP).',
    },
    {
        date: 'September 2007 - July 2013',
        title: 'Bachelor of Applied Science - Mathematics',
        company: 'Istanbul University - Istanbul, Turkey',
        description: 'Relevant Coursework and Skills: Differential Equations, Complex Analysis, Probability & Statistics, Advanced Calculus, General Physics, and skills in Abstract Reasoning, Systematic Problem Solving, and Data Analysis.',
    },
];

export const EXPERIENCE: TimelineItem[] = [
    {
        date: 'Jun 2023 - Sep 2025',
        title: 'Automation Engineer (PSS/True International Payments/Ch Dovetail)',
        company: 'ING Bank - Amsterdam, North Holland, Netherlands · Hybrid',
        description: "As an Automation Test Engineer at ING's TIP Test Center (TTC), I designed and maintained automated end-to-end tests for real-time payment processing within the Dovetail system, a Fiserv payment platform, ensuring transaction accuracy across international branches. My responsibilities included designing test validations for various payment flows, managing and optimizing test data to accelerate deployment, and collaborating closely with development teams and stakeholders to ensure seamless integration with the automation framework.",
    },
    {
        date: 'Jun 2022 - Jun 2023',
        title: 'QA Automation Engineer (Part-Time)',
        company: 'TechPro Education - Remote',
        description: 'Developed and managed automation frameworks for the Medunna Health Project. Integrated test suites with Jenkins for CI/CD implementation and executed comprehensive functional and regression tests.',
    },
    {
        date: 'May 2021 - Jan 2023',
        title: 'Manual Tester & e-Commerce Specialist',
        company: 'BSG Auto Parts & Nerex Motors - Amsterdam, Netherlands',
        description: 'Conducted manual testing for in-house ERP systems. Improved product search performance and visibility across online sales channels. Boosted online sales through strategic sponsored ad campaigns.',
    },
];

export const SKILLS: Skill[] = [
    { name: 'QA Automation Tools', level: 95 },
    { name: 'UI/UX Design', level: 90 },
    { name: 'Mobile Development', level: 85 },
    { name: 'Frontend Development', level: 80 },
    { name: 'DevOps & Tools', level: 80 },
    { name: 'Backend Development', level: 75 },
    { name: 'Databases & Caching', level: 75 },
];

export const PROJECTS: Project[] = [
    {
        title: 'Pide',
        category: 'Mobile App',
        image: 'https://images.unsplash.com/photo-1580915411954-2823e176c827?w=500&auto=format&fit=crop&q=60',
        url: '#',
        description: "Pide is a mobile application that allows you to order food from your favorite restaurants. It has a simple and user-friendly interface that makes it easy to browse menus, customize your order, and pay securely. It also has a real-time order tracking feature.",
        technologies: ["React Native", "TypeScript", "Redux", "Node.js", "Express.js", "MongoDB"],
    },
    {
        title: 'Interactive Resume',
        category: 'Web Development',
        image: 'https://www.emredursun.nl/images/profile.png',
        url: 'https://github.com/emredursun/emredursun-portfolio',
        description: "The very site you're currently exploring. A dynamic and responsive digital resume designed to provide an engaging overview of my skills and experience, built with a modern tech stack for a seamless user experience.",
        technologies: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
        title: 'Realtime Chat',
        category: 'Web Development',
        image: 'https://images.unsplash.com/photo-1553484771-11998c592b9c?w=500&auto=format&fit=crop&q=60',
        url: 'https://github.com/dursunemre/realtime-chat',
        description: "A real-time chat application that allows users to send and receive messages instantly. It has a simple and intuitive interface that makes it easy to use. It is built with React, Node.js, and Socket.IO. It also has a feature that allows users to see who is currently online.",
        technologies: ["React", "Node.js", "Socket.IO", "Express.js", "MongoDB"],
    },
    {
        title: 'Weather App',
        category: 'Mobile App',
        image: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=500&auto=format&fit=crop&q=60',
        url: 'https://github.com/dursunemre/weather-app',
        description: "A weather application that provides real-time weather information for any city in the world. It has a simple and elegant design that makes it easy to use. It is built with React Native and Expo. It uses the OpenWeatherMap API to fetch weather data.",
        technologies: ["React Native", "Expo", "OpenWeatherMap API"],
    },
    {
        title: 'E-commerce',
        category: 'Web Development',
        image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=500&auto=format&fit=crop&q=60',
        url: 'https://github.com/dursunemre/e-commerce',
        description: "A full-featured e-commerce platform that allows users to browse products, add them to their cart, and checkout securely. It has a modern and responsive design that provides a great user experience on all devices. It is built with React, Node.js, and Stripe for payment processing.",
        technologies: ["React", "Node.js", "Express.js", "MongoDB", "Stripe"],
    },
    {
        title: 'Fitness App Concept',
        category: 'UI/UX Design',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=60',
        url: '#',
        description: "A UI/UX concept for a modern fitness tracking application. Focused on a clean, motivating, and user-friendly interface to help users achieve their fitness goals.",
        technologies: ["Figma", "Adobe XD", "User Research"],
    },
    {
        title: 'Contribute-OSS',
        category: 'Open Source',
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=500&auto=format&fit=crop&q=60',
        url: 'https://github.com/dursunemre/contribute-oss',
        description: "An open-source platform designed to help new contributors find projects and issues to work on. Aims to lower the barrier to entry for open-source participation.",
        technologies: ["React", "TypeScript", "Node.js", "GraphQL", "Docker"],
    },
    {
        title: 'CI/CD Pipeline Automation',
        category: 'DevOps',
        image: 'https://images.unsplash.com/photo-1593432336334-a69d2d7162d2?w=500&auto=format&fit=crop&q=60',
        url: '#',
        description: "Automated the build, test, and deployment process for a microservices-based application using Jenkins and Docker, significantly reducing deployment time and manual errors.",
        technologies: ["Jenkins", "Docker", "Kubernetes", "AWS", "Terraform"],
    },
];

export const TECH_STACK: TechCategory[] = [
    {
        title: "Languages & Core Tech",
        technologies: [
            { name: "Java", icon: <img src="https://www.emredursun.nl/images/java.png" alt="Java logo" width="64" height="64" className="object-contain" /> },
            { name: "TypeScript", icon: <img src="https://www.emredursun.nl/images/typescript.png" alt="TypeScript logo" width="64" height="64" className="object-contain" /> },
            { name: "SQL", icon: <img src="https://www.emredursun.nl/images/sql.png" alt="SQL logo" width="64" height="64" className="object-contain" /> },
            { name: "HTML", icon: <img src="https://www.emredursun.nl/images/html.png" alt="HTML logo" width="64" height="64" className="object-contain" /> },
            { name: "CSS", icon: <img src="https://www.emredursun.nl/images/css.png" alt="CSS logo" width="64" height="64" className="object-contain" /> },
        ],
    },
    {
        title: "Test Automation & Frameworks",
        technologies: [
            { name: "Playwright", icon: <img src="https://www.emredursun.nl/images/playwright.png" alt="Playwright logo" width="64" height="64" className="object-contain" /> },
            { name: "Cypress", icon: <img src="https://www.emredursun.nl/images/cypress.png" alt="Cypress logo" width="64" height="64" className="object-contain" /> },
            { name: "JUnit", icon: <img src="https://www.emredursun.nl/images/junit.png" alt="JUnit logo" width="64" height="64" className="object-contain" /> },
            { name: "TestNG", icon: <img src="https://www.emredursun.nl/images/testng.png" alt="TestNG logo" width="64" height="64" className="object-contain" /> },
            { name: "Selenium", icon: <img src="https://www.emredursun.nl/images/selenium.png" alt="Selenium logo" width="64" height="64" className="object-contain" /> },
            { name: "REST Assured", icon: <img src="https://www.emredursun.nl/images/restassured.png" alt="REST Assured logo" width="64" height="64" className="object-contain" /> },
            { name: "Cucumber", icon: <img src="https://www.emredursun.nl/images/cucumber.png" alt="Cucumber logo" width="64" height="64" className="object-contain" /> },
            { name: "Postman", icon: <img src="https://www.emredursun.nl/images/postman.png" alt="Postman logo" width="64" height="64" className="object-contain" /> },
        ],
    },
    {
        title: "CI/CD & DevOps Tools",
        technologies: [
            { name: "Azure DevOps", icon: <img src="https://www.emredursun.nl/images/azuredevops.png" alt="Azure DevOps logo" width="64" height="64" className="object-contain" /> },
            { name: "Jenkins", icon: <img src="https://www.emredursun.nl/images/jenkins.png" alt="Jenkins logo" width="64" height="64" className="object-contain" /> },
            { name: "Docker", icon: <img src="https://www.emredursun.nl/images/docker.png" alt="Docker logo" width="64" height="64" className="object-contain" /> },
            { name: "Git", icon: <img src="https://www.emredursun.nl/images/git.png" alt="Git logo" width="64" height="64" className="object-contain" /> },
            { name: "Maven", icon: <img src="https://www.emredursun.nl/images/maven.png" alt="Maven logo" width="64" height="64" className="object-contain" /> },
        ],
    },
];
