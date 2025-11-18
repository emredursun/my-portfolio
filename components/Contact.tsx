
import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../constants.tsx';

const PageTitle: React.FC<{ title: string }> = React.memo(({ title }) => (
    <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white relative inline-block">
            {title}
            <span className="absolute bottom-[-10px] left-0 w-full h-1 bg-yellow-400 rounded-full"></span>
        </h2>
    </div>
));

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
    const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        setSubmissionStatus('submitting');

        try {
            // Simulate an API call that might fail
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate a 50% chance of failure
                    if (Math.random() > 0.5) {
                        resolve('Success!');
                    } else {
                        reject(new Error('Failed to send message.'));
                    }
                }, 1500);
            });
            setSubmissionStatus('success');
            form.reset();
        } catch (error) {
            setSubmissionStatus('error');
        }
    };

    const renderFormContent = () => {
        switch (submissionStatus) {
            case 'success':
                return (
                    <div className="bg-gray-100 dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center text-center h-[436px]">
                        <i className="fas fa-check-circle text-5xl text-green-500 mb-4 animate-icon-pop-in"></i>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h4>
                        <p className="text-gray-600 dark:text-gray-300">Your message has been sent successfully. I will get back to you soon.</p>
                    </div>
                );
            case 'error':
                 return (
                    <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-8 flex flex-col items-center justify-center text-center h-[436px]">
                        <i className="fas fa-exclamation-triangle text-5xl text-red-500 mb-4"></i>
                        <h4 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-2">Submission Failed</h4>
                        <p className="text-red-700 dark:text-red-400 mb-6">Something went wrong. Please try again.</p>
                        <button
                            onClick={() => setSubmissionStatus('idle')}
                            className="bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition-all duration-300 hover:-translate-y-1"
                        >
                            <i className="fas fa-redo"></i>
                            Try Again
                        </button>
                    </div>
                );
            case 'idle':
            case 'submitting':
            default:
                return (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full bg-gray-100 dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 hover:border-yellow-400/50"
                                required
                                disabled={submissionStatus === 'submitting'}
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-gray-100 dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 hover:border-yellow-400/50"
                                required
                                disabled={submissionStatus === 'submitting'}
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Your Message"
                                rows={5}
                                className="w-full bg-gray-100 dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 hover:border-yellow-400/50"
                                required
                                disabled={submissionStatus === 'submitting'}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition-all duration-300 disabled:bg-yellow-300 disabled:cursor-not-allowed hover:-translate-y-1 disabled:transform-none"
                            disabled={submissionStatus === 'submitting'}
                        >
                             {submissionStatus === 'submitting' ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-paper-plane"></i>
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                );
        }
    };

    return (
        <section>
            <PageTitle title="Contact" />
            <div className="flex flex-col xl:flex-row gap-12">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Form</h3>
                    {renderFormContent()}
                </div>
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Find Me Here</h3>
                     <div className="h-[300px] rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38740.16919139266!2d5.13280806443481!3d52.69614777894901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c61c3b531a3977%3A0x868b248a39151740!2sHoogkarspel!5e0!3m2!1sen!2snl!4v1721323330345!5m2!1sen!2snl"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Location Map"
                            className="dark:grayscale-[100%] dark:invert-[100%]"
                        ></iframe>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Follow Me</h3>
                        <div className="flex gap-4">
                            {SOCIAL_LINKS.map(link => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Follow me on ${link.name}`}
                                    className="w-12 h-12 bg-gray-100 dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center text-xl shadow-md text-gray-500 dark:text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/50 hover:bg-yellow-400/10"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
