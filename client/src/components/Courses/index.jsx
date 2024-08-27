import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

const courses = [
    {
        id: 1, title: 'React for Beginners', courseType: 'Course', courseImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKaZqUn3wHhRI_qtuLtyi07xMhMYCVoifz9g&s',
        rating: 4.6,
        registered: 24982
    },
    {
        id: 2, title: 'Advanced React', courseType: 'Professional Certificate', courseImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUJIfwlzSyckDVXxiAg62c4yBZBY9vhYJWEw&s',
        rating: 3,
        registered: 10970
    },
    {
        id: 2, title: 'Advanced React', courseType: 'Professional Certificate', courseImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUJIfwlzSyckDVXxiAg62c4yBZBY9vhYJWEw&s',
        rating: 3,
        registered: 10970
    },
    {
        id: 2, title: 'Advanced React', courseType: 'Professional Certificate', courseImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUJIfwlzSyckDVXxiAg62c4yBZBY9vhYJWEw&s',
        rating: 3,
        registered: 10970
    },
    {
        id: 2, title: 'Advanced React', courseType: 'Professional Certificate', courseImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUJIfwlzSyckDVXxiAg62c4yBZBY9vhYJWEw&s',
        rating: 3,
        registered: 10970
    },
];

const Courses = () => {
    return (
        <div className="p-6 grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-3 bg-black w-full overflow-y-auto py-10">
            {courses.map((course) => (
                <Link key={course.id} to={`/courses/${course.id}`} className="backdrop-blur-lg bg-opacity-20 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <div className=' h-full relative'>
                        <img src={course.courseImage} alt={course.title} className='w-5/6 h-1/2 mb-5 rounded-lg' />
                        <div className='px-4'>
                            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                            <p className='opacity-40'>{course.courseType}</p>
                            <div className='flex flex-shrink-0 gap-2 my-2 font-mono'>
                                <h3 className='font-semibold'>{course.rating}</h3>
                                <Rating name="half-rating-read" defaultValue={course.rating} precision={0.5} readOnly className='opacity-90'/>
                                <p className='opacity-40'>({course.registered})</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Courses;
