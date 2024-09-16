import React, { useEffect, useState } from 'react'
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Rating from '@mui/material/Rating'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Actions } from '../../hooks/actions';
import CoursesSkeleton from "./courcesSkeleton"
const Courses = () => {
    const settings = {
        infinite: false,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 3
    };
    const [courses, setCourses] = useState([])
    const [selectedOption, setSelectedOption] = useState('courses');
    const { isDarkMode } = useTheme();
    const nav = useNavigate();
    const [loading, setLoading] = useState(false)
    const staticWebinars = [
        {
            id: 1,
            webinarName: 'AI in Healthcare',
            presenter: 'Dr. Sarah Johnson',
            date: '2024-09-20',
            webinarThumbnail: 'https://th.bing.com/th/id/OIP.Qn7Hx7GsMIDSBLzu_FZixwHaEK?rs=1&pid=ImgDetMain'
        },
        {
            id: 2,
            webinarName: 'Introduction to Quantum Computing',
            presenter: 'Dr. Robert Smith',
            date: '2024-09-25',
            webinarThumbnail: 'https://th.bing.com/th/id/OIP.VweJuj7drkYkoR3bnj_v2QHaD3?rs=1&pid=ImgDetMain'
        },
        {
            id: 3,
            webinarName: 'Blockchain and Future Finance',
            presenter: 'Emily Davis',
            date: '2024-09-30',
            webinarThumbnail: 'https://miro.medium.com/v2/resize:fit:1200/1*OXlGmKVEwPNwkUiFvqWQhw.jpeg'
        },
    ];

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await Actions.fetchCourse();

                if (response.data.success) {
                    setCourses(response.data.course)
                } else {
                    console.log("No courses found")
                }
            }
            catch (error) {
                console.error(error)
            }
            setLoading(false)
        }
        fetchCourses()
    }, [])

    if (loading) {
        return <CoursesSkeleton />
    }

    const categorizedCourses = courses.reduce((acc, course) => {
        if (!acc[course.category]) {
            acc[course.category] = [];
        }
        acc[course.category].push(course);
        return acc;
    }, {});

    const handleCourseClick = (course) => {
        const title = course.courseName;
        const slug = title.toLowerCase().replace(/ /g, "-");

        nav(`/course/${slug}`, { state: course })
    };

    const handleWebinarClick = (webinar) => {
        const title = webinar.webinarName;
        const slug = title.toLowerCase().replace(/ /g, "-");

        nav(`/webinar/${slug}`, { state: webinar });
    };


    return (
        <div className={`overflow-y-auto ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'} w-full`}>
            <div className='p-8'>
                <FormControl variant="outlined" sx={{ width: '20rem' }}>
                    <InputLabel id="select-label" style={{ color: isDarkMode ? 'white' : 'black' }}>Select</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        label="Select"
                        style={{
                            color: isDarkMode ? 'white' : 'black',
                            backgroundColor: isDarkMode ? '#424242' : 'white',
                            borderRadius: '10px'
                        }}
                    >
                        <MenuItem value="courses">Courses</MenuItem>
                        <MenuItem value="webinars">Webinars</MenuItem>
                    </Select>
                </FormControl>
            </div>

            {selectedOption === 'courses' ? (
                Object.keys(categorizedCourses).map((category, index) => (
                    <div key={index} className={`section w-full p-8 overflow-hidden`}>
                        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{category}</h1>
                        <div className="mt-4 mx-5">
                            <Slider {...settings}>
                                {categorizedCourses[category].map((course) => (
                                    <div key={course.id} className="bg-white h-[350px] text-black rounded-xl cursor-pointer" onClick={() => handleCourseClick(course)}>
                                        <div className='flex justify-center items-center rounded-t-xl'>
                                            <img src={course.courseThumbnail} alt="" className="h-44 w-full" />
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
                ))
            ) : (
                <div className={`section w-full px-8 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'} overflow-hidden`}>
                    <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Upcoming Webinars</h1>
                    <div className="mt-4 mx-5">
                        <Slider {...settings}>
                            {staticWebinars.map((webinar) => (
                                <div key={webinar.id} className={`rounded-xl cursor-pointer ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} onClick={() => handleWebinarClick(webinar)}>
                                    <div className='flex justify-center items-center rounded-t-xl'>
                                        <img src={webinar.webinarThumbnail} alt="" className="h-44 w-full" />
                                    </div>

                                    <div className="flex flex-col p-4">
                                        <p className="text-lg font-bold">{webinar.webinarName}</p>
                                        <p className='text-sm'>{webinar.presenter}</p>
                                        <p className='font-bold'>{new Date(webinar.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Courses
