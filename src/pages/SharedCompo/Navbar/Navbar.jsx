import React from 'react';
import { Link } from 'react-router-dom';
import ActiveLink from '../../../ActiveLink/ActiveLink';

const Navbar = () => {
  return (
    <div className="navbar bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 sticky top-0 z-10">
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
            className="menu menu-sm font-semibold dropdown-content mt-3 p-2 text-white shadow bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-box w-52 "
          >
            <li>
              <ActiveLink to={'/'}>Home</ActiveLink>
            </li>

            <li>
              <ActiveLink to={'/bookedTicket'}>Bookings</ActiveLink>
            </li>
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
        <ul className="menu text-white font-semibold menu-horizontal px-1">
          <li>
            <ActiveLink to={'/'}>Home</ActiveLink>
          </li>

          <li>
            <ActiveLink to={`/bookedTicket`}>Bookings</ActiveLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src="https://www.designmantic.com/blog/wp-content/uploads/2020/01/Photography-Logos-1280x720.png"
                alt="Profile"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-box w-fit text-white"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
