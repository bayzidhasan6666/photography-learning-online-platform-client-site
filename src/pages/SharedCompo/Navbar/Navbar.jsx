import React from 'react';
import { Link } from 'react-router-dom';
import ActiveLink from '../../../ActiveLink/ActiveLink';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleSignOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <div className="navbar bg-gradient-to-r from-[#cc40f5]  to-[#5b55fd] sticky top-0 z-10 rounded-b-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm font-semibold dropdown-content mt-3 p-2 text-white shadow bg-gradient-to-r from-[#cc40f5]  to-[#5b55fd] rounded-box w-52 gap-2"
          >
            <li>
              <ActiveLink to={'/'}>Home</ActiveLink>
            </li>
            <li>
              <ActiveLink to={'/instructors'}>Instructors</ActiveLink>
            </li>
            <li>
              <ActiveLink to={'/allClasses'}>Classes</ActiveLink>
            </li>
            {user && (
              <li>
                <ActiveLink to={'/dashboard'}>Dashboard</ActiveLink>
              </li>
            )}
          </ul>
        </div>
        <Link
          to={'/'}
          className="btn btn-ghost font-serif normal-case text-xl text-white"
        >
          Visual
          <br />
          <span> Learning</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu gap-2 text-white font-semibold menu-horizontal px-1">
          <li>
            <ActiveLink to={'/'}>Home</ActiveLink>
          </li>
          <li>
            <ActiveLink to={'/instructors'}>Instructors</ActiveLink>
          </li>
          <li>
            <ActiveLink to={'/allClasses'}>Classes</ActiveLink>
          </li>
          {user && (
            <li>
              <ActiveLink to={'/dashboard'}>Dashboard</ActiveLink>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10  rounded-full">
                  <img
                    title={
                      user.displayName ? user.displayName : 'No Name Found'
                    }
                    src={
                      user.photoURL
                        ? user.photoURL
                        : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.2.1046565782.1676251229&semt=ais'
                    }
                    alt="User Profile"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow  bg-gradient-to-r from-[#cc40f5]  to-[#5b55fd] rounded-box text-white"
              >
                <li>
                  <ActiveLink to={'/profile'}>Profile</ActiveLink>
                </li>
                <li>
                  <ActiveLink to={'/settings'}>Settings</ActiveLink>
                </li>
                <li>
                  <Link onClick={handleSignOut}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <Link
              to={`/login`}
              className="px-3 py-2 hover:text-[#ecafff] border border-white text-white rounded-lg capitalize"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
