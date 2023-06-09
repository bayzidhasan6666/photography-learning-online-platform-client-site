import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import Lottie from 'lottie-react';
import errorAnime from '/src/assets/28344-page-not-found-animation.json';
import useTitle from '../../hooks/useTitle';
const PageNotFound = () => {
  const { error, status, statusText } = useRouteError();
  useTitle('Error Page');

  return (
    <div>
      <section className="flex items-center h-screen p-16 bg-gray-800 text-gray-900">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <Lottie animationData={errorAnime} loop={true}></Lottie>
            <p className=" text-red-500 font-semibold animate-pulse mb-2 text-3xl italic font-serif">
              Oops!!
            </p>
            <p className="text-2xl italic font-semibold md:text-3xl text-gray-300 mb-5">
              Oops! The page you are looking for could not be found.
            </p>
            <Link
              to="/"
              className="border border-cyan-400 px-3 py-1 font-semibold hover:border-red-500 hover:text-orange-400 text-emerald-400"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageNotFound;
