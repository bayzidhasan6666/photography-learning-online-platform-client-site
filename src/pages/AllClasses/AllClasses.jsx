import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Typewriter from 'typewriter-effect';

const AllClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedClasses, setSelectedClasses] = useState([]);

  const {
    data: classes,
    isLoading,
    isError,
    refetch,
  } = useQuery(['classes'], async () => {
    const response = await axiosSecure.get('/classes');
    return response.data;
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error occurred while fetching classes.</p>;
  }

  const handleSelectClass = (item) => {
    console.log(item);
    if (user && user.email) {
      const {
        _id,
        className,
        classImage,
        price,
        totalEnrolledStudents,
        instructorName,
        instructorEmail,
      } = item;

      const classItem = {
        classId: _id,
        className,
        classImage,
        price,
        totalEnrolledStudents,
        instructorEmail,
        instructorName,
        selectedEmail: user.email,
      };

      // Check if the class is already added
      const isClassAlreadyAdded = selectedClasses.some(
        (cls) => cls.classId === _id
      );
      if (isClassAlreadyAdded) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${className} is already added.`,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }

      axios
        .post(
          'https://photography-school-server-site.vercel.app/selectedClass',
          classItem
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.insertedId) {
            setSelectedClasses([...selectedClasses, classItem]);
            refetch();
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: `${className} added successfully`,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      Swal.fire({
        title: 'Please Login To Select Class',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login Now!',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl  bg-gradient-to-b from-[#5b55fd] to-[#cc40f5] bg-clip-text text-transparent uppercase font-bold text-center my-10 ">
        <Typewriter
          options={{
            strings: ['Available Classes'],
            autoStart: true,
            loop: true,
          }}
        />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="card h-96 md:w-96 px-2 mx-auto bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={
                  cls.classImage
                    ? cls.classImage
                    : 'https://i.pinimg.com/736x/67/8e/73/678e73a79d5fd7575e945ff75ee975eb.jpg'
                }
                alt={cls.className}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{cls.className}</h2>
              <p className="font-semibold">Instructor : {cls.instructorName}</p>
              <div className="flex gap-5">
                <p className="font-semibold">Enrolled Students : 0</p>
                <p className="font-semibold">
                  Available Seats : {cls.availableSeats}
                </p>
              </div>

              <div className="card-actions justify-between">
                <div className="badge text-[#cc40f5] font-semibold badge-outline">
                  $ {cls.price}
                </div>
                <div
                  onClick={() => handleSelectClass(cls)}
                  className="badge text-[#5b55fd] cursor-pointer font-semibold badge-outline"
                >
                  Select Class
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
