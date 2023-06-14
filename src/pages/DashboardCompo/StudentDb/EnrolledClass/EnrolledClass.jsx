import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Typewriter from 'typewriter-effect';

const EnrolledClass = () => {
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      try {
        if (user && user.email) {
          const response = await axiosSecure.get('/payments');
          const filteredClasses = response.data.filter(
            (payment) => payment.paymentEmail === user.email
          );
          setEnrolledClasses(filteredClasses);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEnrolledClasses();
  }, [axiosSecure, user]);

  if (!user) {
    // User is null, show loading state
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mx-auto px-5">
      <h2 className="text-2xl  bg-gradient-to-b from-[#5b55fd] to-[#cc40f5] bg-clip-text text-transparent uppercase font-bold text-center my-10">
        <Typewriter
          options={{
            strings: ['My Enrolled Class'],
            autoStart: true,
            loop: true,
          }}
        />
      </h2>
      {user.displayName ? (
        <h1 className="bg-gradient-to-b from-[#5b55fd] to-[#cc40f5] bg-clip-text text-transparent font-bold   text-2xl my-5">
          Welcome Back {user.displayName}, Ready For Your Next Lesson?
        </h1>
      ) : (
        <h1>Loading...</h1>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {enrolledClasses.map(
          (enrolledClass) => (
            console.log(enrolledClass),
            (
              <div
                key={enrolledClass._id}
                className="bg-white shadow-lg rounded-xl p-6"
              >
                <img
                  className="rounded-xl h-60"
                  src={enrolledClass.classDetails.classImage}
                  alt=""
                />
                <h2 className="text-xl bg-gradient-to-r from-[#5b55fd] to-[#cc40f5] bg-clip-text text-transparent font-bold my-3">
                  {enrolledClass.className}
                </h2>
                <h2 className="text-lg text-purple-600  font-semibold mb-3">
                  {enrolledClass.classDetails.instructorName}
                </h2>

                <p className="text-gray-700">{enrolledClass.instructorName}</p>
                <button className="px-6 py-3 text-lg rounded-lg bg-gradient-to-r from-[#cc40f5]  to-[#5b55fd] text-white font-bold">
                  Continue Course
                </button>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default EnrolledClass;
