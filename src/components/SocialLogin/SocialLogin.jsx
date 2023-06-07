import React, { useContext } from 'react';
import { FaFacebook, FaGoogle, FaGithub } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const saveUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
        photoUrl: loggedInUser.photoURL,
      };
      fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to save user.');
          }
          return res.json();
        })
        .then(() => {
          navigate(from, { replace: true });
        });
    });
  };
  return (
    <>
      {' '}
      <div className="flex items-center justify-center space-x-4">
        <button className="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full">
          <FaFacebook size={20} />
        </button>
        <button className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full">
          <FaGoogle onClick={handleGoogleSignIn} size={20} />
        </button>
        <button className="text-white bg-gray-500 hover:bg-gray-600 p-2 rounded-full">
          <FaGithub size={20} />
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
