import React from 'react';
import { useLocation } from 'react-router-dom';

function Feedback() {
    const location = useLocation();
    const { score } = location.state || { score: 'No score available' };

    return (
        <>
            <div className="w-full">
                <h1 className='text-2xl font-bold '>Your Interview Score</h1>
                <p className="score text-8xl float-right">{score}</p>
            </div>
        </>
    );
}

export default Feedback;
