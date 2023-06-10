import React, { useEffect, useState } from 'react';

const MyClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Fetch classes data from the server for the current instructor
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:5000/classes');
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl text-center uppercase font-bold mb-6">My Classes</h2>
      {classes.length === 0 ? (
        <p>No classes found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-200 text-gray-600 font-bold uppercase border-b">
                Class Name
              </th>
              <th className="py-3 px-6 bg-gray-200 text-gray-600 font-bold uppercase border-b">
                Status
              </th>
              <th className="py-3 px-6 bg-gray-200 text-gray-600 font-bold uppercase border-b">
                Total Enrolled Students
              </th>
              <th className="py-3 px-6 bg-gray-200 text-gray-600 font-bold uppercase border-b">
                Feedback
              </th>
              <th className="py-3 px-6 bg-gray-200 text-gray-600 font-bold uppercase border-b">
                Update
              </th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem._id} className="hover:bg-gray-100">
                <td className="py-4 px-6 border-b">{classItem.className}</td>
                <td className="py-4 px-6 border-b">{classItem.status}</td>
                <td className="py-4 px-6 border-b">
                  {classItem.totalEnrolledStudents}
                </td>
                <td className="py-4 px-6 border-b">
                  {classItem.status === 'denied' ? classItem.feedback : '-'}
                </td>
                <td className="py-4 px-6 border-b">
                  <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyClasses;
