import React, { useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaPlus,
  FaUserFriends,
  FaHome,
  FaChalkboardTeacher,
  FaFolderOpen,
  FaFileInvoiceDollar,
} from 'react-icons/fa';
import useTitle from '../../../hooks/useTitle';
import ActiveLink from '../../../ActiveLink/ActiveLink';
import axios from 'axios'; // Import axios
import useAuth from '../../../hooks/useAuth';

const Dashboard = () => {
  useTitle('Dashboard');
  const { user: currentUser } = useAuth();
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        const finalUser = response.data.find(
          (user) =>
            user.email.trim().toLowerCase() ===
            currentUser.email.trim().toLowerCase()
        );

        if (finalUser) {
          setAuthenticatedUser(finalUser);
        } else {
          console.error('User not found.');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [currentUser.email]);

  if (!authenticatedUser) {
    return <div>Loading...</div>;
  }

  const { role } = authenticatedUser;
  console.log(role);

  return (
    <div className="drawer lg:drawer-open  dashboard-container">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        <label
          htmlFor="my-drawer-2"
          className="border px-3 py-2 bg-gradient-to-r from-purple-400 via-pink-500 to-pink-500 w-fit mt-32 lg:hidden"
        >
          <FaArrowRight className="text-white" />
        </label>
      </div>
      <div className="sidebar drawer-side  lg:mt-8">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <div className="menu-container">
          <ul className="menu md:mt-20 lg:mt-0 p-4 w-80 h-full bg-gradient-to-r from-purple-400 via-pink-500 to-pink-500 text-white gap-2">
            {/* Admin Dashboard */}
            {role === 'admin' && (
              <>
                <li>
                  <ActiveLink to={`/`}>
                    <FaHome className="mr-2" />
                    Home
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink to={`/dashboard/manageClasses`}>
                    <FaFolderOpen className="mr-2" />
                    Manage Classes
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink to={`/dashboard/manageUsers`}>
                    <FaUserFriends className="mr-2" />
                    Manage Users
                  </ActiveLink>
                </li>
              </>
            )}

            {/* Instructor Dashboard */}
            {role === 'instructor' && (
              <>
                <li>
                  <ActiveLink to={`/dashboard/addClasses`}>
                    <FaPlus className="mr-2" />
                    Add a Class
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink to={`/dashboard/myClasses`}>
                    <FaChalkboardTeacher className="mr-2" />
                    My Classes
                  </ActiveLink>
                </li>
              </>
            )}

            {/* Default Dashboard */}
            {role !== 'admin' && role !== 'instructor' && (
              <>
                <li>
                  <ActiveLink to={'/dashboard/studentHome'}>
                    <FaHome className="mr-2" />
                    Home
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink to={'/dashboard/selectedClass'}>
                    <FaChalkboardTeacher className="mr-2" />
                    My Selected Classes
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink to={`/dashboard/enrolledClass`}>
                    <FaFileInvoiceDollar className="mr-2" />
                    My Enrolled Class
                  </ActiveLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
