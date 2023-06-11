import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typewriter from 'typewriter-effect';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PopularClasses = () => {
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

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error occurred while fetching classes.</p>;
  }

  const handleSelectClass = (item) => {
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
        .post('http://localhost:5000/selectedClass', classItem)
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
      <h2 className="text-2xl bg-gradient-to-b from-purple-500 to-red-500 bg-clip-text text-transparent uppercase font-bold text-center my-10">
        <Typewriter
          options={{
            strings: ['Our Popular Classes'],
            autoStart: true,
            loop: true,
          }}
        />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="card h-96 w-96 mx-auto bg-base-100 shadow-xl"
            data-aos="fade-up"
            data-aos-delay="100"
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
              <p className="font-semibold">Instructor: {cls.instructorName}</p>
              <p className="font-semibold">
                Enrolled Students: {cls.enrolledStudents}
              </p>

              <div className="card-actions justify-between">
                <div className="badge text-red-500 font-semibold badge-outline">
                  $ {cls.price}
                </div>
                <div
                  className="badge text-teal-400 cursor-pointer font-semibold badge-outline"
                  onClick={() => handleSelectClass(cls)}
                >
                  Select Class
                </div>
                <div className="badge text-pink-400 cursor-pointer font-semibold badge-outline">
                  Enroll Now
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
