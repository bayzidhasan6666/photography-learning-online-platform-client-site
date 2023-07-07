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
        <div className="lg:hidden px-2">
          {filteredClasses.map((classItem) => (
            <div
              key={classItem._id}
              className="bg-white shadow overflow-hidden sm:rounded-lg mb-4"
            >
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Class Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Class Name: {classItem.className}
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="flex justify-between items-center px-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 py-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                      {classItem.status}
                    </dd>
                  </div>
                  <div className="flex justify-between items-center px-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 py-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Total Enrolled Students
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                      {classItem.totalEnrolledStudents}
                    </dd>
                  </div>
                  <div className="flex justify-between items-center px-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 py-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Feedback
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                      {classItem.status === 'denied' ? classItem.feedback : '-'}
                    </dd>
                  </div>
                  <div className="flex justify-end px-4 py-2 sm:px-6">
                    <button
                      className="bg-[#6553fc] hover:bg-[#5745f9] text-white font-semibold py-2 px-4 rounded"
                      onClick={() =>
                        updateClassStatus(classItem._id, 'approved')
                      }
                    >
                      Update
                    </button>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>
      )}
      {filteredClasses.length > 0 && (
        <div className="hidden lg:block overflow-x-auto">
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
                      onClick={() =>
                        updateClassStatus(classItem._id, 'approved')
                      }
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyClasses;
