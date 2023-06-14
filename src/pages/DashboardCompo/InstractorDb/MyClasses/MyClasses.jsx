import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch classes data from the server for the current instructor
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          'https://photography-school-server-site.vercel.app/classes'
        );
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchClasses();
  }, []);

  const filteredClasses = classes.filter(
    (classItem) => classItem.instructorEmail === user.email
  );

  const updateClassStatus = (classId, newStatus) => {
    setClasses((prevClasses) =>
      prevClasses.map((classItem) => {
        if (classItem._id === classId) {
          return { ...classItem, status: newStatus };
        }
        return classItem;
      })
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl text-center uppercase font-bold mb-6">
        My Classes
      </h2>
      {filteredClasses.length === 0 ? (
        <p>No classes found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-200 text-gray-600 font-bold uppercase border-b">
                #
              </th>
              <th className="py-3 px-6 bg-gray-200 text-gray-600 font-bold uppercase border-b">
                Photo
              </th>
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
            {filteredClasses.map((classItem, index) => (
              <tr
                key={classItem._id}
                className={`hover:bg-gray-100 ${
                  classItem.status === 'denied' ? 'bg-red-100' : ''
                }`}
              >
                <td className="py-4 px-6 border-b">{index + 1}</td>
                <td className="py-4 px-6 border-b">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={classItem.classImage}
                    alt=""
                  />
                </td>
                <td className="py-4 px-6 border-b">{classItem.className}</td>
                <td className="py-4 px-6 border-b">{classItem.status}</td>
                <td className="py-4 px-6 border-b">
                  {classItem.totalEnrolledStudents}
                </td>
                <td className="py-4 px-6 border-b">
                  {classItem.status === 'denied' ? classItem.feedback : '-'}
                </td>
                <td className="py-4 px-6 border-b">
                  <button
                    className="bg-[#6553fc] hover:bg-[#5745f9] text-white font-bold py-2 px-4 rounded"
                    onClick={() => updateClassStatus(classItem._id, 'approved')}
                  >
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
