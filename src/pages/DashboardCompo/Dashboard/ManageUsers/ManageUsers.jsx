import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ManageUsers = () => {
  const {} = useQuery([
    'users',
    async () => {
      const res = await fetch(`http://localhost:5000/users`);
      return res.json();
    },
  ]);
  console.log('object');
  return (
    <>
      <h1 className='text-center mt-32 font-serif'>{users.length}</h1>

    </>
  );
};

export default ManageUsers;
