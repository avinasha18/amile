import React, { useState } from 'react';

const JobFilters = () => {
  const [internshipType, setInternshipType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [remote, setRemote] = useState(false);
  const [jobOffer, setJobOffer] = useState(false);
  const [stipend, setStipend] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mode, setMode] = useState('');

  const clearFilters = () => {
    setInternshipType('');
    setExperienceLevel('');
    setRemote(false);
    setJobOffer(false);
    setStipend(0);
    setDuration(0);
    setMode('');
  };

  return (
    <div className="w-80 bg-[#000] p-6 overflow-y-auto border-l border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-blue-400">Filters</h2>
        <button onClick={clearFilters} className="text-blue-400 hover:text-blue-300">
          Clear All
        </button>
      </div>
      
      <FilterSection title="Internship Type">
        <select
          value={internshipType}
          onChange={(e) => setInternshipType(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100"
        >
          <option value="">Select Type</option>
          <option value="Tech">Tech</option>
          <option value="Non-Tech">Non-Tech</option>
        </select>
      </FilterSection>
      
      <FilterSection title="Experience Level">
        <select
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100"
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </FilterSection>
      
      <FilterSection title="Other Options">
        <Checkbox
          label="Remote Internship"
          checked={remote}
          onChange={(e) => setRemote(e.target.checked)}
        />
        <Checkbox
          label="Job Offer Attached"
          checked={jobOffer}
          onChange={(e) => setJobOffer(e.target.checked)}
        />
      </FilterSection>
      
      <FilterSection title="Monthly Stipend">
        <RangeSlider
          min={0}
          max={50000}
          value={stipend}
          onChange={(e) => setStipend(e.target.value)}
          leftLabel="0"
          rightLabel="50K"
        />
      </FilterSection>
      
      <FilterSection title="Max Duration (in Months)">
        <RangeSlider
          min={0}
          max={12}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          leftLabel="0"
          rightLabel="12"
        />
      </FilterSection>
      
      <FilterSection title="Internship Mode">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100"
        >
          <option value="">Select Mode</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>
      </FilterSection>
      
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium mt-6 hover:bg-blue-700 transition-colors">
        Apply Filters
      </button>
    </div>
  );
};

const FilterSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-medium mb-2 text-gray-300">{title}</h3>
    {children}
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-2 mb-2 text-gray-300">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="form-checkbox text-blue-600 bg-gray-700 border-gray-600"
    />
    <span>{label}</span>
  </label>
);

const RangeSlider = ({ min, max, value, onChange, leftLabel, rightLabel }) => (
  <div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className="w-full"
    />
    <div className="flex justify-between text-sm text-gray-400">
      <span>{leftLabel}</span>
      <span>{rightLabel}</span>
    </div>
  </div>
);

export default JobFilters;