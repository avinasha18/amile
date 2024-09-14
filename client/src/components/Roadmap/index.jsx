import React, { useEffect, useState } from 'react';
import { Actions } from '../../hooks/actions';
import Cookies from 'js-cookie';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

const Roadmap = () => {
    const { isDarkMode } = useTheme();
    const studentId = Cookies.get('userId');
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(true);

    // Helper function to create slugs
    const createSlug = (interest) => {
        return interest.toLowerCase().replace(/ /g, '-');
    };

    useEffect(() => {
        const getInterests = async () => {
            setLoading(true); 
            try {
                const response = await Actions.getInterests(studentId);
                const interests = response.data;
                setInterests(interests);
            } catch (error) {
                console.error('Error fetching interests:', error);
            } finally {
                setLoading(false);
            }
        };

        getInterests();
    }, [studentId]);

    return (
        <div className={`w-full p-10 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <h1 className="text-3xl font-semibold">Your Roadmap</h1>

            <div className="flex flex-col p-10 gap-10">
                {loading ? (
                    // Skeleton loader
                    Array(4).fill().map((_, index) => (
                        <div key={index} className="bg-gray-100 rounded-xl py-8 px-5 animate-pulse flex flex-row justify-between items-center">
                            <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
                            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        </div>
                    ))
                ) : interests.length > 0 ? (
                    interests.map((interest, index) => (
                        <Link to={`/roadmap/${createSlug(interest)}`} key={index}>  
                            <div className="bg-white py-8 px-5 rounded-xl shadow-md text-black flex flex-row justify-between items-center">
                                <h1 className='text-xl font-semibold'>{interest}</h1>
                                <ArrowForwardIosIcon />
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No interests selected yet.</p>
                )}
            </div>
        </div>
    );
};

export default Roadmap;
