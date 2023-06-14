import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Typewriter from 'typewriter-effect';

const PopularInstructors = () => {
  const [axiosSecure] = useAxiosSecure();
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const url = 'https://photography-school-server-site.vercel.app/users';
      const response = await axiosSecure.get(url);
      const filteredInstructors = response.data.filter(
        (instructor) => instructor.role === 'instructor'
      );
      setInstructors(filteredInstructors.slice(0, 6)); // Display only 6 instructors
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl bg-gradient-to-b from-[#5b55fd] to-[#cc40f5] bg-clip-text text-transparent uppercase font-bold text-center my-20">
        <Typewriter
          options={{
            strings: ['  Our Popular Instructors'],
            autoStart: true,
            loop: true,
          }}
        />
      </h2>
      <div className="grid grid-cols-1 mx-3 md:grid-cols-2 gap-4">
        {instructors.map((instructor) => (
          <div
            key={instructor._id}
            className="card card-side bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={
                  instructor.photoUrl ||
                  'https://i.pinimg.com/736x/67/8e/73/678e73a79d5fd7575e945ff75ee975eb.jpg'
                }
                alt={instructor.name}
                className="object-cover w-60 h-48"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl font-medium">
                {instructor.name}
              </h2>
              <p className="text-gray-600">{instructor.email}</p>
              <div className="card-actions justify-end">
                <button className="px-3 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-[#cc40f5]  to-[#5b55fd] ">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructors;
