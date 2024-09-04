import React from 'react';
import { Skeleton } from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from '../../context/ThemeContext';

const CoursesSkeleton = () => {
    const { isDarkMode } = useTheme();

    const settings = {
        infinite: false,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 3
    };

    const sections = [1, 2];

    return (
        <div className='overflow-y-auto w-full no-scrollbar'>
            {sections.map((section, index) => (
                <div key={index} className={`section w-full p-8 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'} overflow-hidden`}>
                    <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        <Skeleton variant="text" width="60%" />
                    </h1>
                    <div className="mt-4 mx-5">
                        <Slider {...settings}>
                            {Array(4).fill(0).map((_, i) => (
                                <div key={i} className="bg-white h-[350px] text-black rounded-xl">
                                    <div className='flex justify-center items-center rounded-t-xl'>
                                        <Skeleton variant="rectangular" width="100%" height={176} />
                                    </div>
                                    <div className="flex flex-col p-4">
                                        <Skeleton variant="text" width="80%" />
                                        <Skeleton variant="text" width="50%" />
                                        <div className='flex flex-row items-center gap-1 mb-2'>
                                            <Skeleton variant="text" width="20%" />
                                            <Skeleton variant="rectangular" width={60} height={24} />
                                            <Skeleton variant="text" width="20%" />
                                        </div>
                                        <Skeleton variant="rectangular" width="40%" height={24} />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CoursesSkeleton;
