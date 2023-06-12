import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const InstructorRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [isInstructor, setIsInstructor] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        const users = response.data;
        const isInstructorUser = users.some(
          (user) => user.role === 'instructor'
        );
        console.log('isInstructorUser:', isInstructorUser);

        setIsInstructor(isInstructorUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    console.log('IsInstructor:', isInstructor);
  }, [isInstructor]);

  if (isInstructor === null) {
    return <div>Loading...</div>;
  }

  if (user && isInstructor) {
    return children;
  }

  console.log('IsInstructor:', isInstructor);

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default InstructorRoute;
