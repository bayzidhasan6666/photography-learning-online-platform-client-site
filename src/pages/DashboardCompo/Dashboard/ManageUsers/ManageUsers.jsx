import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useTitle from '../../../../hooks/useTitle';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  useTitle('Manage Users');

  useEffect(() => {
    fetch('https://photography-school-server-site.vercel.app/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleDeleteUser = (id) => {
    fetch(`https://photography-school-server-site.vercel.app/users/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User deleted successfully',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while deleting the user',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      });
  };

  const handleMakeInstructor = (id) => {
    fetch(
      `https://photography-school-server-site.vercel.app/users/instructor/${id}`,
      {
        method: 'PATCH',
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user._id === id) {
              return { ...user, role: 'instructor' };
            }
            return user;
          })
        );
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User made an instructor successfully',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while making the user an instructor',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      });
  };

  const handleMakeAdmin = (id) => {
    fetch(
      `https://photography-school-server-site.vercel.app/users/admin/${id}`,
      {
        method: 'PATCH',
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user._id === id) {
              return { ...user, role: 'admin' };
            }
            return user;
          })
        );
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User made an admin successfully',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while making the user an admin',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      });
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="lg:hidden">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="bg-white shadow overflow-hidden sm:rounded-lg mb-4"
          >
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                User Details
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="flex justify-between items-center px-4 py-2">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="text-sm text-gray-900">{user.name}</dd>
                </div>
           
                <div className="flex justify-between items-center px-4 py-2">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-sm text-gray-900">{user.email}</dd>
                </div>
                <div className="flex justify-between items-center px-4 py-2">
                  <dt className="text-sm font-medium text-gray-500">Role</dt>
                  <dd className="text-sm text-gray-900">
                    {user.role === 'admin' ? (
                      'Admin'
                    ) : user.role === 'instructor' ? (
                      'Instructor'
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          className="bg-[#f54091] hover:bg-[#cc40f5] text-white font-semibold py-2 px-4 rounded"
                          onClick={() => handleMakeInstructor(user._id)}
                        >
                          Make Instructor
                        </button>
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                          onClick={() => handleMakeAdmin(user._id)}
                        >
                          Make Admin
                        </button>
                      </div>
                    )}
                  </dd>
                </div>
                <div className="px-4 py-2 flex justify-end">
                  <button
                    className="bg-[#f54040] hover:bg-[#f02222] text-white font-semibold py-2 px-4 rounded"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto hidden lg:block">
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img
                        src={
                          user.photoUrl
                            ? user.photoUrl
                            : 'https://e0.pxfuel.com/wallpapers/355/72/desktop-wallpaper-cartoon-boy-full-iphone-2020-cute-cartoon-boy-thumbnail.jpg'
                        }
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                    <span className="ml-2">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  {user.role === 'admin' ? (
                    'Admin'
                  ) : user.role === 'instructor' ? (
                    'Instructor'
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        className="bg-[#cc40f5] hover:bg-[#cc40f5] text-white font-semibold py-2 px-4 rounded"
                        onClick={() => handleMakeInstructor(user._id)}
                      >
                        Make Instructor
                      </button>
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                        onClick={() => handleMakeAdmin(user._id)}
                      >
                        Make Admin
                      </button>
                    </div>
                  )}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-[#cc40f5] hover:bg-[#c022f0] text-white font-semibold py-2 px-4 rounded"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
