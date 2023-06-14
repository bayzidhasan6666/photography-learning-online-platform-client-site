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
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

const Dashboard = () => {
  useTitle('Dashboard');
  const { user: currentUser } = useAuth();
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          'https://photography-school-server-site.vercel.app/users'
        );
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
          className="border px-3 py-2 bg-gradient-to-r from-[#cc40f5]  to-[#5b55fd] rounded-xl h-full w-fit  mt-20 lg:hidden"
        >
          <FaArrowRight className="text-white" />
        </label>
      </div>
      <div className="sidebar drawer-side  lg:mt-8">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <div className="menu-container">
          <ul className="menu md:mt-20 lg:mt-0 p-4 w-80 bg-gradient-to-r from-[#cc40f5]  to-[#5b55fd] rounded-xl mt-20  text-white gap-2">
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
                  <ActiveLink to={'/'}>
                    <FaHome className="mr-2" />
                    Home
                  </ActiveLink>
                </li>
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
                  <ActiveLink to={'/'}>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="mr-2 h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                    My Enrolled Classes
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink to={`/dashboard/paymentHistory`}>
                    <FaFileInvoiceDollar className="mr-2" />
                    Payment History
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
