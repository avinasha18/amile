import React, { useState } from 'react';
import ResumeEditor from './ResumeEditor';
import ResumePreview from './ResumePreview';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    contact: {
      email: '',
      phone: '',
      address: ''
    },
    links: {
      codechef: '',
      linkedin: '',
      leetcode: '',
      github: '',
      portfolio: ''
    },
    education: [{
      institution: '',
      degree: '',
      cgpa: '',
      location: '',
      period: ''
    }],
    experience: [{
      title: '',
      organisation: '',
      description: '',
      location: '',
      period: ''
    }],
    skills: {
      programmingLanguages: "",
      frameworks: "",
      tools: "",
      databases: ""
    },
    projects: [{
      title: '',
      organisation: '',
      description: '',
      link: '',
      skills: ''
    }],
    certifications: [{
      title: '',
      organisation: "",
      link: ''
    }],
    honors: [{ title: '' }]
  });

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  // General change handler for top-level fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle changes in nested objects (e.g., contact, links)
  const handleNestedChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  // Add a new entry (e.g., experience, project)
  const handleAddEntry = (section) => {
    const newEntry = {
      experience: { title: '', organisation: '', description: [], location: '', period: '' },
      projects: { title: '', organisation: '', description: [], link: '', skills: [] },
      education: { institution: '', degree: '', cgpa: '', location: '', period: '' },
      certifications: { title: '', organisation: '', link: '' },
      honors: { title: '' }
    };
    setFormData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], newEntry[section]]
    }));
  };

  // Delete an entry from a section (e.g., experience, project)
  const handleDeleteEntry = (section, index) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      [section]: updatedSection
    }));
  };

  // Handle specific field change in an array of objects (e.g., experience, projects)
  const handleArrayFieldChange = (section, index, field, value) => {
    const updatedSection = formData[section].map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData((prevData) => ({
      ...prevData,
      [section]: updatedSection,
    }));
  };

  // Handle description change with newline split (specific for experience and projects)
  const handleDescriptionChange = (section, index, value) => {
    const updatedSection = formData[section].map((item, i) =>
      i === index ? { ...item, description: value.split('\n') } : item
    );
    setFormData((prevData) => ({
      ...prevData,
      [section]: updatedSection,
    }));
  };

  // Handle drag and drop reordering
  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;

    const items = Array.from(formData[type]);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    setFormData((prevData) => ({
      ...prevData,
      [type]: items,
    }));
  };

  return (
    <div className="flex h-screen">
      <div className={`w-1/4 p-4 overflow-y-scroll no-scrollbar ${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"}`}>
        <DragDropContext onDragEnd={onDragEnd}>
          <ResumeEditor
            formData={formData}
            handleChange={handleChange}
            handleNestedChange={handleNestedChange}
            handleAddEntry={handleAddEntry}
            handleDeleteEntry={handleDeleteEntry}
            handleArrayFieldChange={handleArrayFieldChange}
            handleDescriptionChange={handleDescriptionChange}
            onDragEnd={onDragEnd}
          />
        </DragDropContext>
      </div>
      <div className="w-3/4 bg-gray-200 overflow-y-scroll p-5 no-scrollbar text-black">
        <ResumePreview resume={formData} />
      </div>
    </div>
  );
};

export default ResumeBuilder;
