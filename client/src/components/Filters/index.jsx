import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const JobFilters = ({ onApplyFilters }) => {
  const { isDarkMode } = useTheme();
  const [type, setType] = useState('');
  const [modeOfWork, setModeOfWork] = useState('');
  const [stipend, setStipend] = useState(0);
  const [hours, setHours] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [skillsRequired, setSkillsRequired] = useState([]);

  const clearFilters = () => {
    setType('');
    setModeOfWork('');
    setStipend(0);
    setHours(0);
    setStartDate('');
    setSkillsRequired([]);
  };

  const themeClasses = isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900';

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
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={`w-full p-2 border border-gray-300 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
        >
          <option value="">Select Type</option>
          <option value="Full-Time">Full-time</option>
          <option value="Part-Time">Part-time</option>
          <option value="Summer">Summer</option>
        </select>
      </FilterSection>

      <FilterSection title="Mode of Work">
        <select
          value={modeOfWork}
          onChange={(e) => setModeOfWork(e.target.value)}
          className={`w-full p-2 border border-gray-300 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
        >
          <option value="">Select Mode</option>
          <option value="Remote">Remote</option>
          <option value="In-Office">On-site</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </FilterSection>

      <FilterSection title="Monthly Stipend">
        <RangeSlider
          min={0}
          max={100000}
          step={5000}
          value={stipend}
          onChange={(e) => setStipend(e.target.value)}
          breakpoints={[1000, 5000, 10000, 15000, 20000, 30000, 40000, 100000]}
        />
      </FilterSection>

      <FilterSection title="Hours per Week">
        <RangeSlider
          min={0}
          max={40}
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          breakpoints={[10, 20, 30, 40]}
        />
      </FilterSection>

      <FilterSection title="Start Date">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={`w-full p-2 border border-gray-300 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
        />
      </FilterSection>

      <FilterSection title="Skills Required">
        <input
          type="text"
          value={skillsRequired.join(', ')}
          onChange={(e) =>
            setSkillsRequired(
              e.target.value.split(',').map((skill) => skill.trim().toLowerCase())
            )
          }
          placeholder="Enter skills (comma-separated)"
          className={`w-full p-2 border border-gray-300 rounded ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}
        />
      </FilterSection>

      <button
        onClick={() =>
          onApplyFilters({
            type,
            modeOfWork,
            stipend,
            hours,
            startDate,
            skillsRequired,
          })
        }
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium mt-6 hover:bg-blue-700 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
};

const FilterSection = ({ title, children }) => {
  const { isDarkMode } = useTheme();
  return (
    <div className="mb-6">
      <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {title}
      </h3>
      {children}
    </div>
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
