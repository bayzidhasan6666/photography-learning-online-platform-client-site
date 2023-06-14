import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const StudentRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [isStudent, setIsStudent] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          'https://photography-school-server-site.vercel.app/users'
        );
        const users = response.data;
        const isStudentUser = users.every(
          (user) => user.role !== 'admin' && user.role !== 'instructor'
        );
        console.log('isStudentUser:', isStudentUser);

        setIsStudent(isStudentUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    console.log('IsStudent:', isStudent);
  }, [isStudent]);

  if (isStudent === null) {
    return <div>Loading...</div>;
  }

  if (user && isStudent) {
    return children;
  }

  console.log('IsStudent:', isStudent);

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default StudentRoute;
