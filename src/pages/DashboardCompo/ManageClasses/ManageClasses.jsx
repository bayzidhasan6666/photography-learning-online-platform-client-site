import React, { useEffect, useState } from 'react';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []);

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

  const denyClass = (classItem) => {
    setSelectedClass(classItem);
    setFeedbackModalOpen(true);
  };

  const approveClass = async (classItem) => {
    try {
      await fetch(
        `https://photography-school-server-site.vercel.app/classes/${classItem._id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'approved' }),
        }
      );
      fetchClasses();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendFeedback = async () => {
    try {
      await fetch(
        `https://photography-school-server-site.vercel.app/classes/${selectedClass._id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ feedback }),
        }
      );
      setFeedbackModalOpen(false);
      setFeedback('');
      fetchClasses();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-xl text-center uppercase font-bold my-6">
        Manage All Classes
      </h2>

      {/* Desktop Layout */}
      <div className="overflow-x-auto hidden lg:flex">
        <table className="min-w-full bg-white border shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-200 text-gray-600 font-bold uppercase border-b">
                Class Image
              </th>
              <th className="py-3 px-6 bg-gray-200 text-gray-600 font-bold uppercase border-b">
                Class Name
              </th>
              <th className="py-3 px-6 bg-gray-200 text-gray-600 font-bold uppercase border-b">
                Instructor Name
              </th>
              <th className="py-3 px-6 bg-gray-200 text-gray-600 font-bold uppercase border-b">
                Instructor Email
              </th>
              <th className="py-3 px-6 bg-gray-200 text-gray-600 font-bold uppercase border-b">
                Available Seats
              </th>
              <th className="py-3 px-6 bg-gray-200 text-gray-600 font-bold uppercase border-b">
                Price
              </th>
              <th className="py-3 px-6 bg-gray-200 text-gray-600 font-bold uppercase border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem._id} className="border-b">
                <td className="py-4 px-6">
                  <img
                    src={classItem.classImage}
                    alt={classItem.className}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-4 px-6">{classItem.className}</td>
                <td className="py-4 px-6">{classItem.instructorName}</td>
                <td className="py-4 px-6">{classItem.instructorEmail}</td>
                <td className="py-4 px-6">{classItem.availableSeats}</td>
                <td className="py-4 px-6">{classItem.price}</td>
                <td className="py-4 px-6">
                  {classItem.status === 'pending' && (
                    <>
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => approveClass(classItem)}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-[#cc40f5] hover:bg-[#c022f0] text-white font-bold py-2 px-4 rounded"
                        onClick={() => denyClass(classItem)}
                      >
                        Deny
                      </button>
                    </>
                  )}
                  {classItem.status === 'approved' && (
                    <span className="text-green-500 font-bold">Approved</span>
                  )}
                  {classItem.status === 'denied' && (
                    <span className="text-[#cc40f5] font-bold">Denied</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className="bg-white shadow overflow-hidden sm:rounded-lg mb-4"
          >
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Class Details
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="flex justify-between items-center px-4 py-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Class Image
                  </dt>
                  <dd className="text-sm text-gray-900">
                    <img
                      src={classItem.classImage}
                      alt={classItem.className}
                      className="w-10 h-10 rounded-full"
                    />
                  </dd>
                </div>
                <div className="flex justify-between items-center px-4 py-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Class Name
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {classItem.className}
                  </dd>
                </div>
                <div className="flex justify-between items-center px-4 py-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Instructor Name
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {classItem.instructorName}
                  </dd>
                </div>
                <div className="flex justify-between items-center px-4 py-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Instructor Email
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {classItem.instructorEmail}
                  </dd>
                </div>
                <div className="flex justify-between items-center px-4 py-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Available Seats
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {classItem.availableSeats}
                  </dd>
                </div>
                <div className="flex justify-between items-center px-4 py-2">
                  <dt className="text-sm font-medium text-gray-500">Price</dt>
                  <dd className="text-sm text-gray-900">{classItem.price}</dd>
                </div>
                <div className="flex justify-between items-center px-4 py-2">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="text-sm text-gray-900">
                    {classItem.status === 'pending' && (
                      <>
                        <span className="text-[#cc40f5] font-bold">
                          Pending
                        </span>
                      </>
                    )}
                    {classItem.status === 'approved' && (
                      <span className="text-green-500 font-bold">Approved</span>
                    )}
                    {classItem.status === 'denied' && (
                      <span className="text-[#cc40f5] font-bold">Denied</span>
                    )}
                  </dd>
                </div>
                {classItem.status === 'pending' && (
                  <div className="flex justify-end px-4 py-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => approveClass(classItem)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-[#cc40f5] hover:bg-[#c022f0] text-white font-bold py-2 px-4 rounded"
                      onClick={() => denyClass(classItem)}
                    >
                      Deny
                    </button>
                  </div>
                )}
              </dl>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Modal */}
      {feedbackModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
            <h3 className="text-lg font-bold mb-4">Provide Feedback</h3>
            <p className="mb-4">Class: {selectedClass?.className}</p>
            <textarea
              className="w-full h-24 border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter your feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={sendFeedback}
              >
                Send Feedback
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => setFeedbackModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClasses;
