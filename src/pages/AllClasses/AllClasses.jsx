import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    data: classes,
    isLoading,
    isError,
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

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-5">All Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {classes.map(
          (cls) => (
            console.log(cls),
            (
              <div
                key={cls._id}
                className="card h-96 w-96 bg-base-100 shadow-xl"
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
                  <p className="font-semibold">
                    Instructor : {cls.instructorName}
                  </p>
                  <p className="font-semibold">Enrolled Students : 0</p>

                  <div className="card-actions justify-between">
                    <div className="badge text-red-500 font-semibold badge-outline">
                      $ {cls.price}
                    </div>
                    <div className="badge text-teal-400 cursor-pointer font-semibold badge-outline">
                      Enroll Now
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default AllClasses;
