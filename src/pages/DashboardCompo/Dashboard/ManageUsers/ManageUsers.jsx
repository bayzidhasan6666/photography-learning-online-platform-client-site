import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';

const ManageUsers = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery(['users'], async () => {
    const res = await fetch(`http://localhost:5000/users`);
    return res.json();
  });

  console.log(users);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error occurred while fetching users.</p>;
  }

  return (
    <>
      <h1 className="text-center text-2xl mt-32 font-bold font-serif">
        Total Users : {users.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            user.photoUrl
                              ? user.photoUrl
                              : 'https://e0.pxfuel.com/wallpapers/355/72/desktop-wallpaper-cartoon-boy-full-iphone-2020-cute-cartoon-boy-thumbnail.jpg'
                          }
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  {user.role === 'admin' ? (
                    'admin'
                  ) : (
                    <button>
                      <FaUserShield></FaUserShield>
                    </button>
                  )}
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;
