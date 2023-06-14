import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import errorAnime from '/src/assets/28344-page-not-found-animation.json';
import useTitle from '../../hooks/useTitle';

const PageNotFound = () => {
  const navigate = useNavigate();
  useTitle('Error Page');

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div>
      <section className="flex items-center h-screen p-16 bg-gray-800 text-gray-900">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <Lottie animationData={errorAnime} loop={true} />
            <p className="text-[#cc40f5] font-semibold animate-pulse mb-2 text-3xl italic font-serif">
              Oops!!
            </p>
            <p className="text-2xl italic font-semibold md:text-3xl text-gray-300 mb-5">
              Oops! The page you are looking for could not be found.
            </p>
            <button
              onClick={goBack}
              className="border border-cyan-400 px-3 py-1 font-semibold hover:border-[#cc40f5] hover:text-orange-400 text-emerald-400"
            >
              Go Back
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageNotFound;
