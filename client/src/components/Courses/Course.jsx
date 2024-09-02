import React from 'react';
import { useLocation } from 'react-router-dom';
import { Rating } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import { TbSectionSign } from "react-icons/tb";
import { MdOndemandVideo } from "react-icons/md";
import { MdOutlineClass } from "react-icons/md";

const Course = () => {
    const { isDarkMode } = useTheme()
    const location = useLocation();
    const course = location.state;
    console.log(course)

    if (!course) {
        return <p>Course Not Found</p>
    }


    return (
        <div className='h-full w-full overflow-auto'>
            <div className='z-0'>
                <div className={`h-1/2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} px-40 py-20 shadow-2xl`}>
                    <div className='flex flex-col w-1/2 gap-y-4'>
                        <p className='text-3xl font-bold'>{course.courseName}</p>
                        <p className='text-lg'>{course.description}</p>
                        <div className='flex flex-row items-center gap-x-2'>
                            {course.bestseller && <p className='text-sm font-semibold bg-orange-300 bg-opacity-25 p-1 w-fit px-2 rounded-md'>Bestseller</p>}
                            <p className='font-bold'>{course.rating}</p>
                            <Rating name="read-only" value={course.rating} precision={0.5} readOnly sx={{ fontSize: '17px', color: 'brown' }} />
                            <p className='text-sm'>{course.participants} students</p>
                        </div>
                        <p className='opacity-90 text-sm'>Created by <a href="">{course.teacher}</a></p>
                    </div>
                </div>

                <div className={`px-40 py-10 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} flex flex-col gap-4`}>
                    <h1 className='text-2xl font-bold'>Explore related topics</h1>
                    <div className='flex flex-row gap-3'>
                        {
                            course.relatedTopics.map((topic) => {
                                return (
                                    <p className='p-3 border-2 rounded-3xl'>{topic}</p>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='absolute top-36 right-36 w-96 bg-white z-10 flex flex-col gap-4'>
                <video className='border border-black w-full'></video>
                <div className='p-8 text-black flex flex-col shadow-xl'>
                    <button className='px-10 py-2 bg-stone-900 w-fit text-lg rounded-lg text-white'>Add to Playlist</button>
                    <h3 className='text-md font-bold mt-10'>This course includes:</h3>
                    <div className='text-sm mt-2 font-serif'>
                        <div className='flex flex-row items-center gap-2'>
                            <MdOndemandVideo />
                            <p>{course.durationHours} hours video lectures</p>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <TbSectionSign />
                            <p>{course.sections} sections</p>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <MdOutlineClass />
                            <p>{course.lectures} lectures</p>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

const CourseStructure = ({ info }) => {

}
export default Course;
