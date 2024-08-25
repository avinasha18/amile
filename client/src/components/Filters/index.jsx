import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const JobFilters = () => {
  const { isDarkMode } = useTheme();
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

  const themeClasses = isDarkMode
    ? 'bg-black text-white'
    : 'bg-white text-gray-900';

  return (
    <div className={`w-full h-full p-6 ${themeClasses} overflow-y-auto no-scrollbar`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-blue-500">Filters</h2>
        <button onClick={clearFilters} className="text-blue-500 hover:text-blue-400">
          Clear All
        </button>
      </div>
      
      <FilterSection title="Internship Type">
        <select
          value={internshipType}
          onChange={(e) => setInternshipType(e.target.value)}
          className={`w-full p-2 border border-gray-300 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
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
          className={`w-full p-2 border border-gray-300 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
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
          max={100000}
          step={1000}
          value={stipend}
          onChange={(e) => setStipend(e.target.value)}
          breakpoints={[1000, 5000, 10000, 25000, 50000, 100000]}
        />
      </FilterSection>
      
      <FilterSection title="Max Duration (in Months)">
        <RangeSlider
          min={0}
          max={12}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          breakpoints={[1, 3, 6, 9, 12]}
        />
      </FilterSection>
      
      <FilterSection title="Internship Mode">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className={`w-full p-2 border border-gray-300 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
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

const FilterSection = ({ title, children }) => {
  const { isDarkMode } = useTheme();
  return (
    <div className="mb-6">
      <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{title}</h3>
      {children}
    </div>
  );
};

const Checkbox = ({ label, checked, onChange }) => {
  const { isDarkMode } = useTheme();
  return (
    <label className={`flex items-center space-x-2 mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox text-blue-600"
      />
      <span>{label}</span>
    </label>
  );
};

const RangeSlider = ({ min, max, step, value, onChange, breakpoints }) => {
  const { isDarkMode } = useTheme();

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full"
      />
      <div className={`flex justify-between text-sm mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {breakpoints.map((point, index) => (
          <span key={index}>{point >= 1000 ? `${point / 1000}k` : point}</span>
        ))}
      </div>
      <div className={`text-center mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Current value: {value >= 1000 ? `${value / 1000}k` : value}
      </div>
    </div>
  );
};

export default JobFilters;