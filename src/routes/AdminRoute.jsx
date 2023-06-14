import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          'https://photography-school-server-site.vercel.app/users'
        );
        const users = response.data;
        const isAdminUser = users.some((user) => user.role === 'admin');
        console.log('isAdminUser:', isAdminUser);

        setIsAdmin(isAdminUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    console.log('IsAdmin:', isAdmin);
  }, [isAdmin]);

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  if (user && isAdmin) {
    return children;
  }

  console.log('IsAdmin:', isAdmin);

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
