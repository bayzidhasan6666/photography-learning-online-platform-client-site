import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

import ActiveLink from '../../../ActiveLink/ActiveLink';

const Dashboard = () => {
    return (
      <div>
        <div className="drawer lg:drawer-open mb-5">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col ">
            <label
              htmlFor="my-drawer-2"
              className="border px-3 py-2 bg-gradient-to-r from-purple-400 via-pink-500 to-pink-500 w-fit mt-20 lg:hidden"
            >
              <FaArrowRight className="text-white"></FaArrowRight>
            </label>
          </div>
          <div className="drawer-side mt-14">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 h-full bg-gradient-to-r from-purple-400 via-pink-500 to-pink-500  text-white gap-2">
              <li>
                <ActiveLink>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Home
                </ActiveLink>
              </li>
              <li>
                <ActiveLink>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Classes
                </ActiveLink>
              </li>
              <li>
                <ActiveLink>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Payment
                </ActiveLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;