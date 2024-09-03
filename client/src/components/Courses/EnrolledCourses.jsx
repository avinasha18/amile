import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import { CgNotes } from "react-icons/cg";
import { Actions } from '../../hooks/actions';
import { BsYoutube } from "react-icons/bs";
import Cookies from "js-cookie"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '../../context/ThemeContext';

const EnrolledCourses = () => {
    const location = useLocation();
    const studentId = Cookies.get('userId')
    const course = location.state;
    const courseId = course._id;
    const { isDarkMode } = useTheme()
    const [expandedModule, setExpandedModule] = useState(null);
    const [completionStatus, setCompletionStatus] = useState(course.modules.map(module => module.topics.map(topic => topic.status)));

    useEffect(() => {
        const getCourses = async () => {
            const response = await Actions.getProgress({ studentId, courseId })
            const progressData = response.data;
            if (progressData) {
                setCompletionStatus(progressData.completionStatus);
            } else {
                setCompletionStatus(course.modules.map(module => module.topics.map(() => false)));
            }
        }
        getCourses()
    }, [course._id]);

    const handleToggle = (index) => {
        setExpandedModule(expandedModule === index ? null : index);
    }

    const handleCheckboxChange = async (moduleIndex, topicIndex) => {
        const courseId = course._id
        const updatedCompletionStatus = [...completionStatus];
        updatedCompletionStatus[moduleIndex][topicIndex] = !updatedCompletionStatus[moduleIndex][topicIndex];
        setCompletionStatus(updatedCompletionStatus);
        const progress = calculateProgress();
        const response = await Actions.updateProgress({ studentId, courseId, totalProgress: progress, completionStatus: updatedCompletionStatus })
        if(response.data.success) {
            console.log(response.data.message)
        } else {
            console.log("Progress not updated")
        }
    }

    const calculateProgress = () => {
        const totalTopics = completionStatus.flat().length;
        const completedTopics = completionStatus.flat().filter(status => status).length;
        return (completedTopics / totalTopics) * 100;
    }

    const progress = calculateProgress();

    return (
        <div className={`w-full px-32 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} overflow-y-auto pb-20`}>
            <div className='py-10 h-1/3 w-full flex flex-col gap-2'>
                <h1 className='text-3xl font-bold'>{course.courseName} <span className='text-base font-medium opacity-85'>by {course.teacher}</span></h1>
                <p className='text-lg opacity-95'>{course.description}</p>
                <p>There are totally {course.sections} sections in this course</p>
            </div>
            <div>
                <div className={`px-10 py-5 backdrop-blur-lg bg-opacity-50 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'} shadow-lg border border-slate-500/30 w-1/3 rounded-xl`}>
                    <div className='flex flex-row items-center justify-between'>
                        <h2 className='text-lg font-medium'>Your Progress</h2>
                        <p>{Math.round(progress)}% Complete</p>
                    </div>
                    <BorderLinearProgress variant="determinate" value={progress} className={`my-5`} />
                </div>
            </div>
            <div className='text-white flex flex-col gap-5 mt-10'>
                {course.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className={`py-5 px-10 backdrop-blur-lg bg-opacity-50 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100 text-black'} shadow-lg border border-slate-500/30 rounded-xl`}>
                        <div className='flex flex-row items-center justify-between cursor-pointer' onClick={() => handleToggle(moduleIndex)}>
                            <p className='text-lg font-bold'>{module.step}: {module.title}</p>
                            <IconButton>
                                {expandedModule === moduleIndex ? <KeyboardArrowUpIcon className={`text-${isDarkMode ? 'white' : 'black'}`} /> : <KeyboardArrowDownIcon className={`text-${isDarkMode ? 'white' : 'black'}`} />}
                            </IconButton>
                        </div>
                        {expandedModule === moduleIndex && (
                            <div className={`mt-3 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                                <table className={`w-full text-center ${isDarkMode ? 'text-white' : 'text-black'} border border-gray-600`}>
                                    <thead>
                                        <tr className='border-b border-gray-600'>
                                            <th className='border-r border-gray-600 p-3'>Status</th>
                                            <th className='border-r border-gray-600 p-3'>Topic</th>
                                            <th className='border-r border-gray-600 p-3'>Article</th>
                                            <th className='p-3'>YouTube</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {module.topics.map((topic, topicIndex) => (
                                            <tr key={topicIndex} className='border-b border-gray-600'>
                                                <td className='p-3 border-r border-gray-600'>
                                                    <input 
                                                        type='checkbox' 
                                                        checked={completionStatus[moduleIndex][topicIndex]} 
                                                        onChange={() => handleCheckboxChange(moduleIndex, topicIndex)} 
                                                    />
                                                </td>
                                                <td className='text-sm p-3 text-left border-r border-gray-600'>{topic}</td>
                                                <td className='p-3 border-r border-gray-600'>
                                                    <Link to="">
                                                        <CgNotes />
                                                    </Link>
                                                </td>
                                                <td className='p-3 text-red-600'>
                                                    <Link to="">
                                                        <BsYoutube />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
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

export default EnrolledCourses;
