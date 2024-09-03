import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const MentorHome = () => {
    const { isDarkMode } = useTheme();
    const techNews = [
        {
            title: "AI Revolutionizes Tech Industry",
            summary: "Artificial Intelligence continues to push the boundaries, with new advancements in machine learning and automation.",
            link: "https://example.com/ai-revolution",
        },
        {
            title: "Quantum Computing Breakthrough",
            summary: "Researchers achieve a new milestone in quantum computing, promising faster and more secure processing.",
            link: "https://example.com/quantum-computing",
        },
        {
            title: "5G Networks Expand Globally",
            summary: "5G technology is rapidly expanding, offering faster connectivity and new opportunities for innovation.",
            link: "https://example.com/5g-networks",
        },
    ];

    return (
        <div className={`min-h-screen p-8 flex flex-col bg-${isDarkMode ? 'black' : 'white'} w-full`}>
            <div className="rounded-lg p-6 shadow-lg max-w-4xl w-full">
                <div className="space-y-6">
                    {techNews.map((news, index) => (
                        <div key={index} className="p-4 rounded-lg bg-slate-700 bg-opacity-20 border border-gray-300/30 shadow-lg transition-transform transform hover:-translate-y-1">
                            <h2 className={`text-2xl font-semibold text-${isDarkMode ? 'white' : 'black'}  mb-2`}>{news.title}</h2>
                            <p className={`text-lg text-${isDarkMode ? 'gray-200' : 'gray-800'}  mb-4`}>{news.summary}</p>
                            <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                Read more
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MentorHome;
