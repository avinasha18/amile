import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaGlobe, FaPencilAlt, FaPlus, FaTimes } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const ProfilePage = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('Projects');
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [isEditingTagline, setIsEditingTagline] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const tabs = ['Education', 'Projects', 'Experience', 'Achievements', 'Certifications', 'POR'];

  const [user, setUser] = useState({
    name: 'Tejassri Avinasha Ryali',
    title: 'Backend Developer • Frontend Developer • Fullstack Developer',
    college: 'Sagi Rama Krishnam Raju Engineering College, Chinn... 2026 Pass out',
    tagline: 'Full stack developer',
    skills: ['HTML', 'CSS', 'Node.js', 'React.js', 'Express.js', 'Next.js', 'SQL', 'JavaScript', 'MongoDB', 'Python'],
    social: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      website: 'https://johndoe.com',
    },
    education: [
      { degree: 'Bachelor of Science in Computer Science', school: 'Tech University', year: '2022 - 2026' }
    ],
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
      },
    ],
    responsibilities: [
      { title: 'Team Lead', organization: 'Tech Club', duration: '2023 - Present' }
    ],
    workExperience: [
      { position: 'Software Developer Intern', company: 'Tech Corp', duration: 'Summer 2023' }
    ],
    achievements: [
      'First place in University Hackathon 2023',
      'Dean\'s List 2022-2023'
    ],
    certifications: [
      { name: 'AWS Certified Developer', issuer: 'Amazon Web Services', year: '2023' }
    ],
  });

  const themeStyles = {
    background: isDarkMode ? 'bg-black' : 'bg-gray-100',
    text: isDarkMode ? 'text-gray-300' : 'text-gray-800',
    heading: isDarkMode ? 'text-white' : 'text-gray-900',
    card: isDarkMode ? 'bg-gray-900' : 'bg-white',
    cardBorder: isDarkMode ? 'border-gray-800' : 'border-gray-200',
    input: isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800',
    button: isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600',
    tabActive: isDarkMode ? 'bg-blue-600' : 'bg-blue-500',
    tabInactive: isDarkMode ? 'bg-gray-800' : 'bg-gray-200',
    skillTag: isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700',
  };

  const [newItem, setNewItem] = useState({});

  const handleEdit = (field, value) => {
    setUser(prevUser => ({ ...prevUser, [field]: value }));
  };

  const handleSocialEdit = (platform, value) => {
    setUser(prevUser => ({
      ...prevUser,
      social: { ...prevUser.social, [platform]: value }
    }));
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
      case 'Education':
        return (
          <div>
            {user.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                <p>{edu.school}, {edu.year}</p>
                <button onClick={() => handleRemoveItem('education', index)} className="text-red-500">
                  Delete
                </button>
              </div>
            ))}
            {isAdding ? (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Degree"
                  value={newItem.degree || ''}
                  onChange={(e) => setNewItem({...newItem, degree: e.target.value})}
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="School"
                  value={newItem.school || ''}
                  onChange={(e) => setNewItem({...newItem, school: e.target.value})}
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={newItem.year || ''}
                  onChange={(e) => setNewItem({...newItem, year: e.target.value})}
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <button onClick={() => handleAddItem('education')} className="bg-blue-600 text-white px-4 py-2 rounded">
                  Add Education
                </button>
              </div>
            ) : (
                <button onClick={() => setIsAdding(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center gap-1">
                <FaPlus /> <span>Add Education</span>
              </button>
            )}
          </div>
        );
      case 'Projects':
        return (
          <div>
            {user.projects.map((project, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                  <button onClick={() => handleRemoveItem('projects', index)} className="text-red-500">
                    Delete
                  </button>
                </div>
                <ul className="list-disc list-inside mb-4">
                  {project.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <p>Link: <a href={project.link} className="text-blue-400">{project.link}</a></p>
              </div>
            ))}
            {isAdding ? (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={newItem.name || ''}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <textarea
                  placeholder="Description (separate points with newlines)"
                  value={newItem.description || ''}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value.split('\n')})}
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Technologies (comma-separated)"
                  value={newItem.technologies || ''}
                  onChange={(e) => setNewItem({...newItem, technologies: e.target.value.split(',')})}
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Project Link"
                  value={newItem.link || ''}
                  onChange={(e) => setNewItem({...newItem, link: e.target.value})}
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
      case 'POR':
        return (
          <div>
            {user.responsibilities.map((responsibility, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{responsibility.title}</h3>
                <p>{responsibility.organization}, {responsibility.duration}</p>
                <button onClick={() => handleRemoveItem('responsibilities', index)} className="text-red-500">
                  Delete
                </button>
              </div>
            ))}
            {isAdding ? (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newItem.title || ''}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Organization"
                  value={newItem.organization || ''}
                  onChange={(e) => setNewItem({...newItem, organization: e.target.value})}
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={newItem.duration || ''}
                  onChange={(e) => setNewItem({...newItem, duration: e.target.value})}
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <button onClick={() => handleAddItem('responsibilities')} className="bg-blue-600 text-white px-4 py-2 rounded">
                  Add POR
                </button>
              </div>
            ) : (
                <button onClick={() => setIsAdding(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center gap-1">
                <FaPlus /> <span>Add Position of Responsibility</span>
              </button>
            )}
          </div>
        );
      case 'Experience':
        return (
          <div>
            {user.workExperience.map((experience, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{experience.position}</h3>
                <p>{experience.company}, {experience.duration}</p>
                <button onClick={() => handleRemoveItem('workExperience', index)} className="text-red-500">
                  Delete
                </button>
              </div>
            ))}
            {isAdding ? (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Position"
                  value={newItem.position || ''}
                  onChange={(e) => setNewItem({...newItem, position: e.target.value})}
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={newItem.company || ''}
                  onChange={(e) => setNewItem({...newItem, company: e.target.value})}
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={newItem.duration || ''}
                  onChange={(e) => setNewItem({...newItem, duration: e.target.value})}
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <button onClick={() => handleAddItem('workExperience')} className="bg-blue-600 text-white px-4 py-2 rounded">
                  Add Experience
                </button>
              </div>
            ) : (
                <button onClick={() => setIsAdding(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center gap-1">
                <FaPlus /> <span>Add Experience</span>
              </button>
            )}
          </div>
        );
      case 'Achievements':
        return (
          <div>
            {user.achievements.map((achievement, index) => (
              <div key={index} className="mb-4">
                <p>{achievement}</p>
                <button onClick={() => handleRemoveItem('achievements', index)} className="text-red-500">
                  Delete
                </button>
              </div>
            ))}
            {isAdding ? (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Achievement"
                  value={newItem.achievement || ''}
                  onChange={(e) => setNewItem({...newItem, achievement: e.target.value})}
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <button onClick={() => setIsAdding(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center gap-1">
                <FaPlus /> <span>Add Achievement</span>
              </button>
              </div>
            ) : (
                <button onClick={() => setIsAdding(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center gap-1">
                <FaPlus /> <span>Add Achievement</span>
              </button>
            )}
          </div>
        );
      case 'Certifications':
        return (
          <div>
            {user.certifications.map((certification, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{certification.name}</h3>
                <p>{certification.issuer}, {certification.year}</p>
                <button onClick={() => handleRemoveItem('certifications', index)} className="text-red-500">
                  Delete
                </button>
              </div>
            ))}
            {isAdding ? (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Certification Name"
                  value={newItem.name || ''}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Issuer"
                  value={newItem.issuer || ''}
                  onChange={(e) => setNewItem({...newItem, issuer: e.target.value})}
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={newItem.year || ''}
                  onChange={(e) => setNewItem({...newItem, year: e.target.value})}
                  className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                />
                <button onClick={() => setIsAdding(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center gap-1">
                <FaPlus /> <span>Add Certifications</span>
              </button>
              </div>
            ) : (
                <button onClick={() => setIsAdding(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center gap-1">
                <FaPlus /> <span>Add Certifications</span>
              </button>
            )}
          </div>
        );
      default:
        return <p>Select a tab to view content.</p>;
    }
  };

  const handleTaglineEdit = () => {
    setIsEditingTagline(!isEditingTagline);
  };

 
   return (
    <div className={`min-h-screen ${themeStyles.background} ${themeStyles.text} p-8 overflow-auto w-full`}>
      <div className="max-w-6xl mx-auto flex gap-1">
        {/* Profile Section */}
        <div className={`${themeStyles.card} rounded-lg p-6 mb-8 w-3/4 border-2 ${themeStyles.cardBorder}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img src="https://via.placeholder.com/100" alt="Profile" className="w-24 h-24 rounded-full mr-6" />
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => handleEdit('name', e.target.value)}
                    className={`${themeStyles.input} px-2 py-1 rounded mb-2`}
                  />
                ) : (
                  <h1 className={`text-2xl font-bold ${themeStyles.heading}`}>{user.name}</h1>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    value={user.title}
                    onChange={(e) => handleEdit('title', e.target.value)}
                    className={`${themeStyles.input} px-2 py-1 rounded mb-2`}
                  />
                ) : (
                  <p>{user.title}</p>
                )}
                <p>{user.college}</p>
              </div>
            </div>
            <button onClick={() => setIsEditing(!isEditing)} className={`${themeStyles.button} text-white px-4 py-2 rounded`}>
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
          <div className="flex gap-4">
            <a href={user.social.linkedin} className="text-blue-400">
              <FaLinkedin size={24} />
            </a>
            <a href={user.social.github} className={themeStyles.heading}>
              <FaGithub size={24} />
            </a>
            <a href={user.social.website} className="text-green-400">
              <FaGlobe size={24} />
            </a>
          </div>

          {/* Tabs */}
          <div className={`${themeStyles.card} rounded-lg p-6 mb-8 mt-6`}>
            <ul className="flex mb-4 gap-4">
              {tabs.map((tab, index) => (
                <li key={index} className="flex items-center justify-center">
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-sm ${activeTab === tab ? themeStyles.tabActive : themeStyles.tabInactive} text-[15px] ${themeStyles.text}`}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
            <div>
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Right Side Section */}
        <div className={`${themeStyles.card} rounded-lg p-6 mb-8 ml-8 w-1.5/3 border-2 ${themeStyles.cardBorder}`}>
          {/* Social */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${themeStyles.heading} mb-2`}>Social</h3>
            <div className="flex gap-4 mb-2">
              {isEditingSocial ? (
                <>
                  <input
                    type="text"
                    placeholder="LinkedIn URL"
                    value={user.social.linkedin}
                    onChange={(e) => handleSocialEdit('linkedin', e.target.value)}
                    className={`${themeStyles.input} px-4 py-2 rounded w-full`}
                  />
                  <input
                    type="text"
                    placeholder="GitHub URL"
                    value={user.social.github}
                    onChange={(e) => handleSocialEdit('github', e.target.value)}
                    className={`${themeStyles.input} px-4 py-2 rounded w-full`}
                  />
                  <input
                    type="text"
                    placeholder="Website URL"
                    value={user.social.website}
                    onChange={(e) => handleSocialEdit('website', e.target.value)}
                    className={`${themeStyles.input} px-4 py-2 rounded w-full`}
                  />
                </>
              ) : (
                <>
                  <a href={user.social.linkedin} className="text-blue-400">
                    <FaLinkedin size={24} />
                  </a>
                  <a href={user.social.github} className={themeStyles.heading}>
                    <FaGithub size={24} />
                  </a>
                  <a href={user.social.website} className="text-green-400">
                    <FaGlobe size={24} />
                  </a>
                </>
              )}
            </div>
            <button onClick={() => setIsEditingSocial(!isEditingSocial)} className={`${themeStyles.button} text-white px-4 py-2 rounded`}>
              {isEditingSocial ? 'Save' : 'Edit'}
            </button>
          </div>

          {/* Tagline */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${themeStyles.heading} mb-2`}>Tagline</h3>
            {isEditingTagline ? (
              <input
                type="text"
                placeholder="Tagline"
                value={user.tagline}
                onChange={(e) => handleEdit('tagline', e.target.value)}
                className={`${themeStyles.input} px-4 py-2 rounded w-full`}
              />
            ) : (
              <p>{user.tagline}</p>
            )}
            <button onClick={handleTaglineEdit} className={`${themeStyles.button} text-white px-4 py-2 rounded mt-2`}>
              {isEditingTagline ? 'Save' : 'Edit'}
            </button>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${themeStyles.heading} mb-2`}>Skills</h3>
            {isEditingSkills ? (
              <>
                <div className="flex flex-wrap gap-2 mb-2">
                  {user.skills.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <span className={`${themeStyles.skillTag} px-2 py-1 rounded text-sm mr-2`}>{skill}</span>
                      <button onClick={() => handleRemoveSkill(index)} className="text-red-500">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add Skill"
                  className={`${themeStyles.input} px-4 py-2 rounded w-full mb-2`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddSkill(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              </>
            ) : (
              <div className="flex flex-wrap gap-2 mb-2">
                {user.skills.map((skill, index) => (
                  <span key={index} className={`${themeStyles.skillTag} px-2 py-1 rounded text-sm`}>{skill}</span>
                ))}
              </div>
            )}
            <button onClick={handleSkillEdit} className={`${themeStyles.button} text-white px-4 py-2 rounded mt-2`}>
              {isEditingSkills ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;