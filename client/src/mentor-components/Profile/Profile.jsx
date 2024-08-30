import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { FaSquareGithub } from "react-icons/fa6";
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaPaperclip } from "react-icons/fa";

const MentorProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('Qualifications');
    const [isAdding, setIsAdding] = useState(false);
    const [isEditingSkills, setIsEditingSkills] = useState(false);
    const [isEditingSocial, setIsEditingSocial] = useState(false);

    const tabs = ['Qualifications', 'Projects', 'Experience', 'Certifications'];

    const [user, setUser] = useState({
        name: 'Vigna Ramtej Telagarapu',
        title: 'Backend Developer,Frontend Developer,Fullstack Developer,Teacher',
        tagline: 'Full stack developer',
        skills: ['HTML', 'CSS', 'Node.js', 'React.js', 'Express.js', 'Next.js', 'SQL', 'JavaScript', 'MongoDB', 'Python'],
        social: {
            linkedin: 'https://linkedin.com/in/johndoe',
            github: 'https://github.com/johndoe',
            website: 'https://johndoe.com',
        },
        projects: [
            {
                name: 'Project X',
                description: [
                    'Developed a web application using React and Node.js.',
                    'Implemented user authentication using JWT.',
                    'Integrated with third-party APIs for data visualization.',
                ],
                technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
                link: 'https://projectx.com',
                deployLink: 'https://projectx.com',
                projectImage: 'https://images.ctfassets.net/kftzwdyauwt9/ed21faee-ce44-4d91-f5cc39941d47/bdd3983530857e93d205304e219e2d95/dall-e.jpg?w=3840&q=90&fm=webp'
            }
        ],
        qualifications: [
            {
                tabs: ['M.Tech', 'B.Tech', 'High School', 'Secondary School'],
                degrees: [
                    {
                        name: 'M.Tech',
                        institution: 'Sagi Rama Krishnam Raju Engineering College',
                        year: '2026',
                        description: 'Master of Technology in Computer Science and Engineering.',
                        collegeLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyz3_zGwwpSNN3RKWxTvnZSjhX4wK3210HXg&s'
                    },
                    {
                        name: 'B.Tech',
                        institution: 'Some Engineering College',
                        year: '2024',
                        description: 'Bachelor of Technology in Computer Science and Engineering.',
                        collegeLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyz3_zGwwpSNN3RKWxTvnZSjhX4wK3210HXg&s'
                    },
                    {
                        name: 'High School',
                        institution: 'Some High School',
                        year: '2020',
                        description: 'Completed High School education.',
                        collegeLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyz3_zGwwpSNN3RKWxTvnZSjhX4wK3210HXg&s'
                    },
                    {
                        name: 'Secondary School',
                        institution: 'Some Secondary School',
                        year: '2018',
                        description: 'Completed Secondary School education.',
                        collegeLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyz3_zGwwpSNN3RKWxTvnZSjhX4wK3210HXg&s'
                    },
                ],
            },
        ],
        certifications: [
            {
                name: 'Certified React Developer',
                issuedBy: 'Udemy',
                issueDate: 'March 2023',
                expiryDate: 'March 2025',
                description: 'Certification for advanced proficiency in React.js development.',
                organizationLogo: 'https://i.pinimg.com/originals/11/1f/01/111f015dd90de0d3fb314e5b452996cf.png'
            },
            {
                name: 'AWS Certified Solutions Architect',
                issuedBy: 'Amazon Web Services',
                issueDate: 'January 2022',
                expiryDate: 'January 2024',
                description: 'Certification demonstrating knowledge of AWS services and architecture.',
                organizationLogo: 'https://i.pinimg.com/originals/11/1f/01/111f015dd90de0d3fb314e5b452996cf.png'
            },
        ],
        workExperience: [
            { position: 'Software Developer Intern', company: 'Tech Corp', duration: 'Summer 2023' }
        ],
    });

    const [newItem, setNewItem] = useState({});
    const titles = user.title.split(',');

    const handleEdit = (field, value) => {
        setUser(prevUser => ({ ...prevUser, [field]: value }));
    };

    const handleAddItem = (section) => {
        setUser(prevUser => ({
            ...prevUser,
            [section]: [...prevUser[section], newItem]
        }));
        setNewItem({});
        setIsAdding(false);
    };

    const handleRemoveItem = (section, index) => {
        setUser(prevUser => ({
            ...prevUser,
            [section]: prevUser[section].filter((_, i) => i !== index)
        }));
    };

    const handleSkillEdit = () => {
        setIsEditingSkills(!isEditingSkills);
    };

    const handleAddSkill = (newSkill) => {
        setUser(prevUser => ({
            ...prevUser,
            skills: [...prevUser.skills, newSkill]
        }));
    };

    const handleRemoveSkill = (skillIndex) => {
        setUser(prevUser => ({
            ...prevUser,
            skills: prevUser.skills.filter((_, index) => index !== skillIndex)
        }));
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Projects':
                return (
                    <div className='p-10'>
                        {
                            user.projects.map((project, index) => (
                                <div key={index} className='flex flex-shrink-0 justify-between'>
                                    <div>
                                        <h2>{project.name}</h2>
                                        <ul className="list-disc my-4 px-10">
                                            {project.description.map((desc, i) => (
                                                <li key={i}>{desc}</li>
                                            ))}
                                        </ul>
                                        <div className='flex flex-shrink-0 gap-4 my-9'>
                                            {project.technologies.map((desc, i) => {
                                                return (
                                                    <span className="bg-gray-800 px-4 py-2 rounded-lg">{desc}</span>
                                                )
                                            })}
                                        </div>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex flex-shrink-0 items-center gap-4'>
                                                <FaSquareGithub className='text-3xl' />
                                                <Link href={project.link} target="_blank" className='text-blue-500'>Github Link</Link>
                                            </div>
                                            <div className='flex flex-shrink-0 items-center gap-4'>
                                                <FaPaperclip />
                                                <Link href={project.deployLink} target="_blank" className='text-blue-500'>Deployment Link</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='rounded-3xl overflow-hidden'>
                                        <img src={project.projectImage} alt={project.name} className='w-full h-96' />
                                    </div>
                                </div>
                            ))
                        }
                        {isAdding ? (
                            <div className="mt-4">
                                <input
                                    type="text"
                                    placeholder="Project Name"
                                    value={newItem.name || ''}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                                />
                                <textarea
                                    placeholder="Description (separate points with newlines)"
                                    value={newItem.description || ''}
                                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value.split('\n') })}
                                    className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Technologies (comma-separated)"
                                    value={newItem.technologies || ''}
                                    onChange={(e) => setNewItem({ ...newItem, technologies: e.target.value.split(',') })}
                                    className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Project Link"
                                    value={newItem.link || ''}
                                    onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
                                    className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                                />
                                <button onClick={() => handleAddItem('projects')} className="bg-blue-600 text-white px-4 py-2 rounded">
                                    Add Project
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setIsAdding(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center gap-1">
                                <FaPlus /> <span>Add Project</span>
                            </button>
                        )}
                    </div>
                );
            case 'Experience':
                return (
                    <Experience />
                );
            case 'Certifications':
                return (
                    <Certifications certifications={user.certifications} />
                );
            case 'Qualifications':
                return (
                    <Qualifications qualifications={user.qualifications} />
                );
            default:
                return <p>Select a tab to view content.</p>;
        }
    };

    return (
        <div className={`min-h-screen p-8 overflow-auto w-full bg-black`}>
            <div className="max-w-6xl mx-auto flex flex-col gap-1">
                <div className='flex flex-shrink-0 gap-10'>
                    {/* Profile Section */}
                    <div className="rounded-lg p-6 mb-8 w-3/4 backdrop-blur-lg bg-slate-800 bg-opacity-50 shadow-lg border border-slate-500/30">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <img src="https://via.placeholder.com/100" alt="Profile" className="w-24 h-24 rounded-full mr-6" />
                                <div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={user.name}
                                            onChange={(e) => handleEdit('name', e.target.value)}
                                            className="px-2 py-1 rounded mb-2 bg-slate-700 text-white mr-2"
                                        />
                                    ) : (
                                        <h1 className="text-2xl font-bold">{user.name}</h1>
                                    )}
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={user.title}
                                            onChange={(e) => handleEdit('title', e.target.value)}
                                            className="px-2 py-1 rounded mb-2 bg-slate-700 text-white"
                                        />
                                    ) : (

                                        <div className="flex flex-wrap gap-2 my-5">
                                            {titles.map((title, index) => (
                                                <p
                                                    key={index}
                                                    className={`text-white px-4 py-2 rounded-md bg-slate-900 border-2 border-gray-600`}
                                                >
                                                    {title.trim()}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button onClick={() => setIsEditing(!isEditing)} className="text-white px-4 py-2 rounded bg-slate-800">
                                {isEditing ? 'Save' : 'Edit'}
                            </button>
                        </div>
                    </div>
                    {/* Social Media */}
                    <div className="rounded-lg p-6 mb-8 w-1/4 backdrop-blur-lg bg-slate-800 bg-opacity-50 shadow-lg border border-slate-500/30">
                        <p className="text-xl font-bold mb-4">Social Media</p>
                        <SocialMedia media='github' />
                        <SocialMedia media='linkedin' />
                        <SocialMedia media='instagram' />
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="rounded-lg w-full mb-16">
                    <div className="flex w-3/4">
                        <ul className="flex">
                            {tabs.map((tab, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => setActiveTab(tab)}
                                        className={`text-white px-10 py-2 rounded-t-md ${activeTab === tab ? 'bg-slate-900 border-b-0' : 'bg-slate-800 bg-opacity-20'} border border-gray-600`}
                                    >
                                        {tab}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='backdrop-blur-lg bg-slate-800 bg-opacity-50 shadow-lg border border-slate-500/30 py-10'>
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    )
}


const Qualifications = ({ qualifications }) => {
    const [activeDegree, setActiveDegree] = useState(qualifications[0].tabs[0]);

    const renderDegreeContent = () => {
        const degree = qualifications[0].degrees.find(d => d.name === activeDegree);
        return (
            <div className='flex flex-shrink-0 justify-between items-center px-32 py-5'>
                <div>
                    <h2 className="text-2xl font-bold">{degree.name}</h2>
                    <p className="text-lg font-semibold">{degree.institution}</p>
                    <p className="text-md">{degree.year}</p>
                    <p className="text-sm">{degree.description}</p>
                </div>
                <div className='rounded-lg overflow-hidden'>
                    <img src={degree.collegeLogo} alt={degree.institution} />
                </div>
            </div>
        );
    };

    return (
        <div className="rounded-lg mb-20 w-full">
            <div className="flex mb-4 ">
                <ul className="flex justify-evenly w-full">
                    {qualifications[0].tabs.map((tab) => (
                        <li
                            key={tab}
                            onClick={() => setActiveDegree(tab)}
                            className={`py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300 border-slate-500/30 border
                                ${activeDegree === tab ? 'bg-slate-900 text-white' : 'text-slate-400'}`}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
            </div>
            {renderDegreeContent()}
        </div>
    );
};

const Certifications = ({ certifications }) => {
    const [activeCertification, setActiveCertification] = useState(certifications[0].name);

    const renderCertificationContent = () => {
        const certification = certifications.find(cert => cert.name === activeCertification);
        return (
            <div className='flex flex-shrink-0 justify-between items-center px-32 py-5'>
                <div>
                    <h2 className="text-2xl font-bold">{certification.name}</h2>
                    <p className="text-lg font-semibold">{certification.issuedBy}</p>
                    <p className="text-md">Date of Issue: {certification.issueDate}</p>
                    <p className="text-md">Expiry Date: {certification.expiryDate || 'N/A'}</p>
                    <p className="text-sm">{certification.description}</p>
                </div>
                <div className='rounded-lg overflow-hidden w-96'>
                    <img src={certification.organizationLogo} alt={certification.issuedBy} />
                </div>
            </div>
        );
    };

    return (
        <div className="rounded-lg mb-20 w-full">
            <div className="flex mb-4 ">
                <ul className="flex justify-evenly w-full">
                    {certifications.map((cert) => (
                        <li
                            key={cert.name}
                            onClick={() => setActiveCertification(cert.name)}
                            className={`py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300 border-slate-500/30 border
                                ${activeCertification === cert.name ? 'bg-slate-900 text-white' : 'text-slate-400'}`}
                        >
                            {cert.name}
                        </li>
                    ))}
                </ul>
            </div>
            {renderCertificationContent()}
        </div>
    );
};

const SocialMedia = ({ media }) => {
    const renderSocialMedia = (media) => {
        switch (media) {
            case 'github':
                return (
                    <div className='flex flex-shrink-0 items-center gap-4'>
                        <FaSquareGithub />
                        <Link to="">
                            <h1>Git Hub</h1>
                        </Link>
                    </div>
                )
            case 'linkedin':
                return (
                    <div className='flex flex-shrink-0 items-center gap-4'>
                        <FaLinkedin />
                        <Link to="">
                            <h1>LinkedIn</h1>
                        </Link>
                    </div>

                )
            case 'instagram':
                return (
                    <div className='flex flex-shrink-0 items-center gap-4'>
                        <FaInstagram />
                        <Link to="">
                            <h1>Instagram</h1>
                        </Link>
                    </div>

                )
            default:
                return null;
        }
    }
    return (
        <div className='flex flex-shrink-0 gap-6'>
            {renderSocialMedia(media)}
        </div>
    )
}

const Experience = () => {
    const workExperience = [
        { position: 'Software Developer Intern', company: 'Tech Corp', duration: 'Summer 2023' },
        { position: 'Frontend Developer', company: 'Creative Solutions', duration: '2022-2023' },
        { position: 'Backend Developer', company: 'Innovatech', duration: '2021-2022' },
        { position: 'Fullstack Developer', company: 'NextGen Labs', duration: '2020-2021' },
        { position: 'Teaching Assistant', company: 'Sagi Rama Krishnam Raju Engineering College', duration: '2019-2020' },
    ];

    return (
        <div className="min-h-screen h-full w-full flex flex-col">
            <div className="max-w-6xl flex flex-col gap-2">
                {workExperience.map((experience, index) => (
                    <div key={index} className="w-full p-6 rounded-lg backdrop-blur-lg bg-black bg-opacity-50 shadow-lg border-t border-slate-500/30">
                        <h2 className="text-xl font-bold text-white mb-2">{experience.position}</h2>
                        <p className="text-xl  tracking-wider text-slate-400 mb-1">{experience.company}</p>
                        <p className="text-lg text-slate-500">{experience.duration}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default MentorProfile
