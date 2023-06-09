import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';

const UserInfo = () => {
  const { user } = useAuth();

  const [userData, setUserData] = useState({
    name: user.displayName || '',
    photoURL: user.photoURL || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    gender: user.gender || '',
  });

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      name: user.displayName || '',
      photoURL: user.photoURL || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      gender: user.gender || '',
    }));
  }, [user]);

  const handleUpdateClick = () => {
    console.log('Updating user information:', userData);
  };

  const handleChange = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="mb-6">
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-48 h-48 rounded-full object-cover mx-auto"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">{user.displayName}</h2>
            <p className="text-gray-500 text-lg mb-2">{user.email}</p>
            <p className="text-gray-500 text-lg mb-2">{user.phone}</p>
            <p className="text-gray-500 text-lg mb-2">{user.address}</p>
            <p className="text-gray-500 text-lg mb-2">{user.gender}</p>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-6">Update Information</h3>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-lg text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="border rounded-md px-4 py-3 w-full text-lg focus:outline-none focus:border-blue-500"
                value={userData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-lg text-gray-700 font-medium mb-2"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="border rounded-md px-4 py-3 w-full text-lg focus:outline-none focus:border-blue-500"
                value={userData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-lg text-gray-700 font-medium mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="border rounded-md px-4 py-3 w-full text-lg focus:outline-none focus:border-blue-500"
                value={userData.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-lg text-gray-700 font-medium mb-2"
              >
                Gender
              </label>
              <input
                type="text"
                id="gender"
                name="gender"
                className="border rounded-md px-4 py-3 w-full text-lg focus:outline-none focus:border-blue-500"
                value={userData.gender}
                onChange={handleChange}
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handleUpdateClick}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
