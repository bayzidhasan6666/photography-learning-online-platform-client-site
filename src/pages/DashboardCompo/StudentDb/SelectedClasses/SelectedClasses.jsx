import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const SelectedClasses = () => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get('/selectedClass')
      .then((response) => {
        setSelectedClasses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteClass = (classId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this class!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/selectedClass/${classId}`)
          .then((response) => {
            Swal.fire('Deleted!', 'The class has been deleted.', 'success');
            setSelectedClasses((prevClasses) =>
              prevClasses.filter((cls) => cls._id !== classId)
            );
          })
          .catch((error) => {
            Swal.fire('Error', 'Failed to delete the class.', 'error');
            console.error(error);
          });
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-5">
        My Selected Classes
      </h1>
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-4">
        {selectedClasses.map((cls) => (
          <div
            key={cls._id}
            className="  w-full bg-white shadow-md rounded-md flex  justify-between"
          >
            <figure className="flex justify-center">
              <img
                src={
                  cls.classImage
                    ? cls.classImage
                    : 'https://i.pinimg.com/736x/67/8e/73/678e73a79d5fd7575e945ff75ee975eb.jpg'
                }
                alt={cls.className}
                className="w-64 h-48 object-cover rounded-t-md"
              />
            </figure>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{cls.className}</h2>
              <p className="text-gray-700 mb-2">
                Instructor: {cls.instructorName}
              </p>
              <p className="text-gray-700 mb-2">Price: ${cls.price}</p>
              <p className="text-gray-700 mb-2">
                Enrolled Students: {cls.totalEnrolledStudents}
              </p>
            </div>
            <div className="flex justify-center bg-gray-100 py-2">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                onClick={() => handleDeleteClass(cls._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedClasses;
