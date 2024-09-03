import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const MentorCourseDetails = () => {
    const { id } = useParams();
    const course = courseData[id];
    const [openModule, setOpenModule] = useState(null);

    if (!course) {
        return <p>Course not found</p>;
    }

    const toggleModule = (moduleId) => {
        setOpenModule(openModule === moduleId ? null : moduleId);
    };

    return (
        <div className="p-6 w-full bg-black overflow-y-auto">
            {/* Course Overview Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
                <div className="text-white">
                    <h2 className="text-3xl font-semibold mb-4">{course.title}</h2>
                    <p className="mb-4">{course.description}</p>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <p className="flex items-center">
                            <span className="font-semibold mr-2">Rating: </span> {course.rating} stars
                        </p>
                        <p className="flex items-center">
                            <span className="font-semibold mr-2">Students: </span> {course.students}
                        </p>
                        <p className="flex items-center">
                            <span className="font-semibold mr-2">Last Updated: </span> {course.lastUpdated}
                        </p>
                        <p className="flex items-center">
                            <span className="font-semibold mr-2">Language: </span> {course.language}
                        </p>
                    </div>
                </div>
                <div className="mt-6 lg:mt-0">
                    <button className="bg-purple-600 text-white px-6 py-2 rounded shadow hover:bg-purple-700 transition">Add to Cart</button>
                </div>
            </div>

            {/* Module Details Section */}
            <div> {/* Adjust max height as needed */}
                {course.modules.map((module) => (
                    <div key={module.id} className="bg-gray-700 bg-opacity-25 p-4 rounded-lg mb-4 shadow-lg">
                        <div 
                            className="cursor-pointer flex justify-between items-center" 
                            onClick={() => toggleModule(module.id)}
                        >
                            <div>
                                <h4 className="text-lg font-semibold">{module.title}</h4>
                                <p>Duration: {module.duration}</p>
                            </div>
                            <span className="text-xl pr-10">
                                {openModule === module.id ? '▲' : '▼'}
                            </span>
                        </div>
                        {openModule === module.id && (
                            <div className="mt-4 p-4 bg-gray-900 rounded-lg transition-all duration-500 ease-in-out">
                                <p>{module.details}</p>
                                <h4 className="mt-4 font-semibold">What's included:</h4>
                                <ul className="list-disc list-inside mt-2">
                                    {module.included.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MentorCourseDetails;
