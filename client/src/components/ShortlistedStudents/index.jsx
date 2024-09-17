import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShortlistedStudents({ companyId, onStartChat }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchShortlistedStudents = async () => {
      try {
        const response = await axios.get(`${api}/company/${companyId}/shortlisted-students`);
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching shortlisted students:', error);
      }
    };

    fetchShortlistedStudents();
  }, [companyId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Shortlisted Students</h2>
      {students.map((student) => (
        <div key={student._id} className="mb-4 p-4 border rounded">
          <h3 className="text-xl font-semibold">{student.name}</h3>
          <p>{student.email}</p>
          <button
            onClick={() => onStartChat(student._id)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Start Chat
          </button>
        </div>
      ))}
    </div>
  );
}

export default ShortlistedStudents;