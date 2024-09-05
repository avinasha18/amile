import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating'
import { useTheme } from '../../context/ThemeContext';

import { styled } from '@mui/material/styles';
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';
import { Actions } from '../../hooks/actions';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const MyCourses = () => {
    const [courses, setCourses] = useState([])
    const { isDarkMode } = useTheme();
    const nav = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            const studentId = Cookies.get('userId')
            console.log(studentId)
            try {
                const response = await Actions.fetchEnrolledCourses(studentId);

                if (response.data.enrolledCourses) {
                    setCourses(response.data.enrolledCourses)
                } else {
                    console.log("No courses found")
                }
            }
            catch (error) {
                console.error(error)
            }
        }
        fetchCourses()
    }, [])


    const handleCourseClick = (course) => {
        const title = course.courseName;
        const slug = title.toLowerCase().replace(/ /g, "-");

        nav(`/course/${slug}/learn`, { state: course })
    }

    return (
        <div className={`w-full overflow-y-auto ${isDarkMode?"text-white bg-black":"bg-white text-black"}`}>
            <div className={`p-20 px-32 pb-10 h-1/3  ${isDarkMode?"text-black bg-white":"bg-black text-white"}`}>
                <h1 className='text-4xl font-bold font-serif'>My Courses</h1>
            </div>
            <div className='grid grid-cols-4 gap-4 px-40 py-8'>
                {courses.map((course) => (
                    <div key={course.id} className=" h-[300px] border-gray-200 border rounded-xl cursor-pointer" onClick={() => handleCourseClick(course)}>
                        <div className='flex justify-center items-center rounded-t-xl'>
                            <img src={course.img} alt="" className="h-32 w-full" />
                        </div>

                        <div className="flex flex-col p-4">
                            <p className="text-base font-bold">{course.courseName}</p>
                            <p className='text-xs'>{course.teacher}</p>
                            {/* <BorderLinearProgress variant="determinate" value={50} className='my-2' /> */}
                            <div className='flex flex-col items-end gap-1 mb-2'>
                                <Rating name="read-only" value={0} precision={0.5} sx={{ fontSize: '17px', color: 'brown' }} />
                                <p className='text-xs opacity-60'>Leave Rating</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
        }),
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
        ...theme.applyStyles('dark', {
            backgroundColor: '#308fe8',
        }),
    },
}));

export default MyCourses
