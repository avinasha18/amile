import { useTheme } from '../../context/ThemeContext';
import React from 'react';
import DataScientistRoadmap from './DataScientistRoadmap'; 
import { useParams } from 'react-router-dom';
import FrontendRoadmap from './FrontendRoadmap';

const capitalizeWords = (str) => {
    return str.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const RoadmapPage = () => {
    const { id } = useParams(); // Capture the id (slug) from the URL
    const { isDarkMode } = useTheme();

    const capitalizedInterest = capitalizeWords(id);

    return (
        <div className={`w-full p-10 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} overflow-auto`}>
            <h1 className="text-3xl font-semibold">Roadmap for {capitalizedInterest}</h1>
            <div className="mt-5">
                <p>This is the roadmap page for {capitalizedInterest}.</p>
                <RoadmapFlowchart id={id} />
            </div>
        </div>
    );
};

const RoadmapFlowchart = ({ id }) => {
    // Render the Frontend component only when the id is 'frontend-developer'
    if (id === 'frontend-developer') {
        return <FrontendRoadmap />;
    } else if(id === 'data-scientist') {
		return <DataScientistRoadmap />;
	}
    return (
        <div>
            <p>No specific roadmap available for {capitalizeWords(id)} yet.</p>
        </div>
    );
};

export default RoadmapPage;
