import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';

const SelectedClasses = () => {
  const { user } = useAuth();
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      axiosSecure
        .get(`/selectedClass?selectedEmail=${user.email}`)
        .then((response) => {
          setSelectedClasses(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [axiosSecure, user]);

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

  const handlePrice = (cls) => {
    navigate('/dashboard/payment');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-5">
        My Selected Classes
      </h1>
      {selectedClasses.length === 0 ? (
        <p className="text-center text-gray-500">No classes selected.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {selectedClasses.map((cls) => (
            <div
              key={cls._id}
              className=" w-full h-58 bg-white shadow-md rounded-tr-3xl md:flex  justify-between"
            >
              <figure className="flex justify-center">
                <img
                  src={
                    cls.classImage
                      ? cls.classImage
                      : 'https://i.pinimg.com/736x/67/8e/73/678e73a79d5fd7575e945ff75ee975eb.jpg'
                  }
                  alt={cls.className}
                  className="md:w-64  md:h-58 object-cover rounded-tr-3xl"
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
                <div className="flex items-center py-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                    onClick={() => handleDeleteClass(cls._id)}
                  >
                    Remove
                  </button>
                  <Link>
                    <button
                      onClick={() => handlePrice(cls)}
                      className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md ml-2"
                    >
                      Pay
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedClasses;
