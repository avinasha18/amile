import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Actions } from '../../hooks/actions';

const Courses = () => {
    const settings = {
        infinite: false,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 3
    };
    const [courses, setCourses] = useState([])
    const { isDarkMode } = useTheme();
    const nav = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await Actions.fetchCourse();
                
                if(response.data.success) {
                    setCourses(response.data.course)
                } else {
                    console.log("No courses found")
                }
            }
            catch(error) {
                console.error(error)
            }
        }
        fetchCourses()
    }, [])

    const sections = [1,2]

    const handleCourseClick = (course) => {
        const title = course.courseName;
        const slug = title.toLowerCase().replace(/ /g, "-");

        nav(`/course/${slug}`, { state: course })
    };

    return (
        <div className='overflow-y-auto'>
            {sections.map((section, index) => (
                <div key={index} className={`section w-full p-8 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'} overflow-hidden`}>
                    <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{section == 1 ? 'Popular Courses for Data Scientists' : 'Featured courses for MERN Stack'}</h1>
                    <div className="mt-4 mx-5">
                        <Slider {...settings}>
                            {courses.map((course) => (
                                <div key={course.id} className="bg-white h-[350px] text-black rounded-xl cursor-pointer" onClick={()=>handleCourseClick(course)}>
                                    <div className='flex justify-center items-center rounded-t-xl'>
                                        <img src={course.img} alt="" className="h-44 w-full" />
                                    </div>

                                    <div className="flex flex-col p-4">
                                        <p className="text-lg font-bold">{course.courseName}</p>
                                        <p className='text-sm'>{course.teacher}</p>
                                        <div className='flex flex-row items-center gap-1 mb-2'>
                                            <p className='font-bold'>{course.rating}</p>
                                            <Rating name="read-only" value={course.rating} precision={0.5} readOnly sx={{ fontSize: '17px', color: 'brown' }} />
                                            <p className='opacity-50'>({course.participants})</p>
                                        </div>
                                        {course.bestseller && <p className='text-sm font-semibold bg-orange-300 bg-opacity-25 p-1 w-fit px-2 rounded-md'>Bestseller</p>}
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Courses
