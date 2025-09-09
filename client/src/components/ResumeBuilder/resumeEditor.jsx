import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

const ResumeEditor = ({
  formData,
  handleChange,
  handleNestedChange,
  handleAddEntry,
  handleDeleteEntry,
  handleArrayFieldChange,
  handleDescriptionChange,
  onDragEnd
}) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <div className={`space-y-6 pb-24 ${isDarkMode ? 'text-light bg-black' : 'text-black'} h-full`}>
      <h1 className="font-bold text-2xl">Resume Builder - Editor</h1>
      <hr className="divide-black" />


      <div>
        <h2 className="text-xl font-bold mb-2">Personal Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="title"
          placeholder="Professional Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
      </div>

      {/* Contact Information */}
      <div>
        <h2 className="text-xl font-bold mb-2">Contact Information</h2>
        {Object.keys(formData.contact).map((contactKey) => (
          <input
            key={contactKey}
            type="text"
            name={contactKey}
            placeholder={contactKey.charAt(0).toUpperCase() + contactKey.slice(1)}
            value={formData.contact[contactKey]}
            onChange={(e) => handleNestedChange('contact', contactKey, e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
        ))}
      </div>

      {/* Links */}
      <div>
        <h2 className="text-xl font-bold mb-2">Links</h2>
        {Object.keys(formData.links).map((linkKey) => (
          <input
            key={linkKey}
            type="text"
            name={linkKey}
            placeholder={linkKey.charAt(0).toUpperCase() + linkKey.slice(1)}
            value={formData.links[linkKey]}
            onChange={(e) => handleNestedChange('links', linkKey, e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
        ))}
      </div>

      {/* Education */}
      <div>
        <h2 className="text-xl font-bold mb-2">Education</h2>
        {formData.education.map((edu, index) => (
          <div key={index} className="mb-4 p-2 bg-gray-200 rounded-md relative">
            {Object.keys(edu).map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={edu[field]}
                onChange={(e) => handleArrayFieldChange('education', index, field, e.target.value)}
                className="w-full mb-2 p-2 border rounded"
              />
            ))}
            <button
              onClick={() => handleDeleteEntry('education', index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
        <button onClick={() => handleAddEntry('education')} className="bg-blue-500 text-white p-2 rounded mt-2">
          Add Education
        </button>
      </div>

      {/* Experience */}
      <div>
        <h2 className="text-xl font-bold mb-2">Experience</h2>
        <Droppable droppableId="experienceDroppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {formData.experience.map((exp, index) => (
                <Draggable key={index} draggableId={`experience-${index}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4 p-2 bg-gray-200 rounded-md relative"
                    >
                      {Object.keys(exp).map((field) => (
                        field === 'description' ? (
                          <textarea
                            key={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={exp[field]}
                            onChange={(e) => handleDescriptionChange('experience', index, e.target.value)}
                            className="w-full mb-2 p-2 border rounded"
                          />
                        ) : (
                          <input
                            key={field}
                            type="text"
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={exp[field]}
                            onChange={(e) => handleArrayFieldChange('experience', index, field, e.target.value)}
                            className="w-full mb-2 p-2 border rounded"
                          />
                        )
                      ))}
                      <button
                        onClick={() => handleDeleteEntry('experience', index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <button onClick={() => handleAddEntry('experience')} className="bg-blue-500 text-white p-2 rounded mt-2">
          Add Experience
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Skills</h2>
        {Object.keys(formData.skills).map((contactKey) => (
          <input
            key={contactKey}
            type="text"
            name={contactKey}
            placeholder={contactKey.charAt(0).toUpperCase() + contactKey.slice(1)}
            value={formData.contact[contactKey]}
            onChange={(e) => handleNestedChange('skills', contactKey, e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
        ))}
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-xl font-bold mb-2">Projects</h2>
        <Droppable droppableId="projectsDroppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {formData.projects.map((proj, index) => (
                <Draggable key={index} draggableId={`project-${index}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4 p-2 bg-gray-200 rounded-md relative"
                    >
                      {Object.keys(proj).map((field) => (
                        field === 'description' ? (
                          <textarea
                            key={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={proj[field]}
                            onChange={(e) => handleDescriptionChange('projects', index, e.target.value)}
                            className="w-full mb-2 p-2 border rounded"
                          />
                        ) : (
                          <input
                            key={field}
                            type="text"
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={proj[field]}
                            onChange={(e) => handleArrayFieldChange('projects', index, field, e.target.value)}
                            className="w-full mb-2 p-2 border rounded"
                          />
                        )
                      ))}
                      <button
                        onClick={() => handleDeleteEntry('projects', index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <button onClick={() => handleAddEntry('projects')} className="bg-blue-500 text-white p-2 rounded mt-2">
          Add Project
        </button>
      </div>

      {/* Certifications */}
      <div>
        <h2 className="text-xl font-bold mb-2">Certifications</h2>
        {formData.certifications.map((cert, index) => (
          <div key={index} className="mb-4 p-2 bg-gray-200 rounded-md relative">
            {Object.keys(cert).map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={cert[field]}
                onChange={(e) => handleArrayFieldChange('certifications', index, field, e.target.value)}
                className="w-full mb-2 p-2 border rounded"
              />
            ))}
            <button
              onClick={() => handleDeleteEntry('certifications', index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
        <button onClick={() => handleAddEntry('certifications')} className="bg-blue-500 text-white p-2 rounded mt-2">
          Add Certification
        </button>
      </div>

      {/* Honors */}
      <div>
        <h2 className="text-xl font-bold mb-2">Honors</h2>
        {formData.honors.map((honor, index) => (
          <div key={index} className="mb-4 p-2 bg-gray-200 rounded-md relative">
            <input
              type="text"
              placeholder="Honor Title"
              value={honor.title}
              onChange={(e) => handleArrayFieldChange('honors', index, 'title', e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <button
              onClick={() => handleDeleteEntry('honors', index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
        <button onClick={() => handleAddEntry('honors')} className="bg-blue-500 text-white p-2 rounded mt-2">
          Add Honor
        </button>
      </div>
    </div>
  );
};

export default ResumeEditor;
