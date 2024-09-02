import React from 'react'
import Rating from '@mui/material/Rating'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
    const settings = {
        infinite: false,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 3
    };
    const { isDarkMode } = useTheme();
    const nav = useNavigate();

    let courses = [
        {
            id: 1,
            courseName: 'Complete Generative AI course',
            teacher: 'Krish Naik',
            rating: 4.7,
            participants: 1756,
            bestseller: true,
            description: 'This course covers the fundamentals of Generative AI, including deep learning models used for generating text, images, and more.',
            relatedTopics: ['Generative AI', 'Deep Learning', 'NLP', 'Computer Vision'],
            durationHours: 25,
            sections: 12,
            lectures: 75
        },
        {
            id: 2,
            courseName: 'Deep Learning with Python',
            teacher: 'Andrew Ng',
            rating: 4.8,
            participants: 2500,
            bestseller: true,
            description: 'Learn the principles of deep learning and how to build neural networks using Python and TensorFlow.',
            relatedTopics: ['Deep Learning', 'Python', 'Neural Networks', 'TensorFlow'],
            durationHours: 40,
            sections: 20,
            lectures: 100
        },
        {
            id: 3,
            courseName: 'Introduction to Machine Learning',
            teacher: 'Sebastian Thrun',
            rating: 4.6,
            participants: 3000,
            bestseller: false,
            description: 'An introductory course to machine learning, covering basic algorithms and their applications.',
            relatedTopics: ['Machine Learning', 'Algorithms', 'Supervised Learning', 'Unsupervised Learning'],
            durationHours: 30,
            sections: 15,
            lectures: 80
        },
        {
            id: 4,
            courseName: 'Data Science from Scratch',
            teacher: 'Joel Grus',
            rating: 4.5,
            participants: 2000,
            bestseller: true,
            description: 'Learn data science concepts and techniques from the ground up using Python.',
            relatedTopics: ['Data Science', 'Python', 'Statistics', 'Data Analysis'],
            durationHours: 35,
            sections: 18,
            lectures: 90
        },
        {
            id: 5,
            courseName: 'Natural Language Processing',
            teacher: 'Jurafsky & Manning',
            rating: 4.7,
            participants: 1750,
            bestseller: true,
            description: 'This course covers the basics of Natural Language Processing, including text analysis and machine translation.',
            relatedTopics: ['NLP', 'Text Analysis', 'Machine Translation', 'Deep Learning'],
            durationHours: 45,
            sections: 22,
            lectures: 120
        },
        {
            id: 6,
            courseName: 'Advanced Computer Vision',
            teacher: 'Fei-Fei Li',
            rating: 4.9,
            participants: 1000,
            bestseller: true,
            description: 'Dive deep into advanced topics in computer vision, including object detection, recognition, and 3D vision.',
            relatedTopics: ['Computer Vision', 'Deep Learning', 'Image Recognition', '3D Vision'],
            durationHours: 50,
            sections: 25,
            lectures: 130
        },
        {
            id: 7,
            courseName: 'Big Data Analytics',
            teacher: 'Jeffrey Ullman',
            rating: 4.4,
            participants: 1800,
            bestseller: false,
            description: 'Understand the techniques and tools for analyzing large datasets and extracting valuable insights.',
            relatedTopics: ['Big Data', 'Data Analytics', 'Hadoop', 'Spark'],
            durationHours: 38,
            sections: 17,
            lectures: 85
        },
        {
            id: 8,
            courseName: 'Artificial Intelligence for Robotics',
            teacher: 'Peter Norvig',
            rating: 4.7,
            participants: 2100,
            bestseller: true,
            description: 'Learn how AI is applied in robotics, including path planning, decision-making, and perception.',
            relatedTopics: ['AI', 'Robotics', 'Path Planning', 'Decision Making'],
            durationHours: 28,
            sections: 14,
            lectures: 70
        },
        {
            id: 9,
            courseName: 'Reinforcement Learning',
            teacher: 'David Silver',
            rating: 4.8,
            participants: 2200,
            bestseller: true,
            description: 'An in-depth course on reinforcement learning, covering key concepts like Q-learning, policy gradients, and more.',
            relatedTopics: ['Reinforcement Learning', 'Machine Learning', 'AI', 'Algorithms'],
            durationHours: 42,
            sections: 21,
            lectures: 105
        },
        {
            id: 10,
            courseName: 'Probabilistic Graphical Models',
            teacher: 'Daphne Koller',
            rating: 4.6,
            participants: 1700,
            bestseller: false,
            description: 'Learn about probabilistic graphical models and how they are used to represent complex distributions.',
            relatedTopics: ['Probabilistic Models', 'Graphical Models', 'Bayesian Networks', 'Inference'],
            durationHours: 36,
            sections: 19,
            lectures: 90
        },
        {
            id: 11,
            courseName: 'Introduction to Statistics',
            teacher: 'Guillaume Dufour',
            rating: 4.3,
            participants: 2500,
            bestseller: false,
            description: 'A foundational course in statistics, covering key concepts like probability, distributions, and hypothesis testing.',
            relatedTopics: ['Statistics', 'Probability', 'Distributions', 'Hypothesis Testing'],
            durationHours: 30,
            sections: 16,
            lectures: 80
        },
        {
            id: 12,
            courseName: 'Quantum Computing',
            teacher: 'Scott Aaronson',
            rating: 4.9,
            participants: 1200,
            bestseller: true,
            description: 'Explore the principles of quantum computing and its applications in cryptography and computation.',
            relatedTopics: ['Quantum Computing', 'Cryptography', 'Quantum Algorithms', 'Qubits'],
            durationHours: 48,
            sections: 24,
            lectures: 115
        },
        {
            id: 13,
            courseName: 'Ethics in AI',
            teacher: 'Timnit Gebru',
            rating: 4.5,
            participants: 1400,
            bestseller: true,
            description: 'Examine the ethical implications of AI, including bias, fairness, and the societal impact of AI technologies.',
            relatedTopics: ['AI Ethics', 'Bias in AI', 'Fairness', 'Societal Impact'],
            durationHours: 20,
            sections: 10,
            lectures: 50
        },
        {
            id: 14,
            courseName: 'Introduction to Algorithms',
            teacher: 'Charles Leiserson',
            rating: 4.6,
            participants: 2600,
            bestseller: false,
            description: 'A comprehensive introduction to algorithms, covering sorting, searching, dynamic programming, and more.',
            relatedTopics: ['Algorithms', 'Sorting', 'Dynamic Programming', 'Data Structures'],
            durationHours: 40,
            sections: 22,
            lectures: 100
        },
        {
            id: 15,
            courseName: 'Database Management Systems',
            teacher: 'Raghu Ramakrishnan',
            rating: 4.4,
            participants: 1900,
            bestseller: false,
            description: 'Learn the fundamentals of database management, including relational models, SQL, and transaction management.',
            relatedTopics: ['Databases', 'SQL', 'Relational Models', 'Transaction Management'],
            durationHours: 32,
            sections: 18,
            lectures: 85
        },
        {
            id: 16,
            courseName: 'Cloud Computing Basics',
            teacher: 'Armando Fox',
            rating: 4.3,
            participants: 1600,
            bestseller: false,
            description: 'An introductory course on cloud computing, covering key concepts, architectures, and services.',
            relatedTopics: ['Cloud Computing', 'AWS', 'Azure', 'Virtualization'],
            durationHours: 28,
            sections: 14,
            lectures: 70
        },
        {
            id: 17,
            courseName: 'Blockchain Fundamentals',
            teacher: 'Dan Boneh',
            rating: 4.7,
            participants: 1300,
            bestseller: true,
            description: 'Understand the fundamentals of blockchain technology, including cryptography, consensus algorithms, and smart contracts.',
            relatedTopics: ['Blockchain', 'Cryptography', 'Smart Contracts', 'Consensus Algorithms'],
            durationHours: 35,
            sections: 19,
            lectures: 90
        },
        {
            id: 18,
            courseName: 'Introduction to Cyber Security',
            teacher: 'Ross Anderson',
            rating: 4.5,
            participants: 2200,
            bestseller: true,
            description: 'A course covering the basics of cyber security, including network security, encryption, and risk management.',
            relatedTopics: ['Cyber Security', 'Network Security', 'Encryption', 'Risk Management'],
            durationHours: 30,
            sections: 15,
            lectures: 80
        },
        {
            id: 19,
            courseName: 'Software Engineering Principles',
            teacher: 'Robert Martin',
            rating: 4.6,
            participants: 1500,
            bestseller: false,
            description: 'Learn the principles of software engineering, including design patterns, testing, and version control.',
            relatedTopics: ['Software Engineering', 'Design Patterns', 'Testing', 'Version Control'],
            durationHours: 38,
            sections: 20,
            lectures: 95
        },
        {
            id: 20,
            courseName: 'Human-Computer Interaction',
            teacher: 'Scott Klemmer',
            rating: 4.4,
            participants: 2000,
            bestseller: false,
            description: 'Explore the principles of human-computer interaction, including user interface design, usability, and UX research.',
            relatedTopics: ['HCI', 'User Interface Design', 'Usability', 'UX Research'],
            durationHours: 25,
            sections: 13,
            lectures: 70
        }
    ];    
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
