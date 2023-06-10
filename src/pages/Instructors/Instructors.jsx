import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Instructors = () => {
  const [axiosSecure] = useAxiosSecure();
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const url = 'http://localhost:5000/users';
      const response = await axiosSecure.get(url);
      const filteredInstructors = response.data.filter(
        (instructor) => instructor.role === 'instructor'
      );
      setInstructors(filteredInstructors);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl text-center font-bold mb-4">Our Instructors</h1>
      <div className="grid grid-cols-2 gap-4">
        {instructors.map((instructor) => (
          <div
            key={instructor._id}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <img
                src={instructor.photoUrl}
                alt={instructor.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-lg font-medium">{instructor.name}</h2>
                <p className="text-gray-600">{instructor.email}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Role: {instructor.role}</p>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
