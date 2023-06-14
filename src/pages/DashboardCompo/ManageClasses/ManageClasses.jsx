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
    <div className="p-4">
      <h2 className="text-xl text-center uppercase font-bold mb-6">
        Manage All Classes
      </h2>
      {classes.length === 0 ? (
        <p>No classes found.</p>
      ) : (
        <table className="w-full border-collapse">
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
              <tr key={classItem._id} className="hover:bg-gray-100">
                <td className="py-4 px-6 border-b">
                  <img
                    src={classItem.classImage}
                    alt={classItem.className}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-4 px-6 border-b">{classItem.className}</td>
                <td className="py-4 px-6 border-b">
                  {classItem.instructorName}
                </td>
                <td className="py-4 px-6 border-b">
                  {classItem.instructorEmail}
                </td>
                <td className="py-4 px-6 border-b">
                  {classItem.availableSeats}
                </td>
                <td className="py-4 px-6 border-b">{classItem.price}</td>
                <td className="py-4 px-6 border-b">
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
      )}

      {/* Feedback Modal */}
      {feedbackModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 w-1/2">
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
