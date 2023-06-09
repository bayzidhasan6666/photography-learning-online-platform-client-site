import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
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
    fetch(`http://localhost:5000/users/instructor/${id}`, {
      method: 'PATCH',
    })
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
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: 'PATCH',
    })
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
    <div>
      <h1>Manage Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.role === 'admin' ? (
                  'admin'
                ) : user.role === 'instructor' ? (
                  'instructor'
                ) : (
                  <>
                    <button onClick={() => handleMakeInstructor(user._id)}>
                      Make Instructor
                    </button>
                    <button onClick={() => handleMakeAdmin(user._id)}>
                      Make Admin
                    </button>
                  </>
                )}
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
