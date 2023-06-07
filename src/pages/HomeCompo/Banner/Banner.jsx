import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Banner = () => {
 const slides = [
   {
     title: 'Photography Workshops',
     description:
       'Join our hands-on photography workshops to enhance your skills and unleash your creativity.',
     image:
       'https://t3.ftcdn.net/jpg/03/14/86/68/360_F_314866851_c3dDEOZZQ5dIzj2s2WNI4EGjmwIzVxkx.jpg',
   },
   {
     title: 'Portrait Photography Courses',
     description:
       'Learn the art of capturing stunning portraits and master the techniques used by professional photographers.',
     image:
       'https://i0.wp.com/www.glamflame.net/wp-content/uploads/2019/03/Top-10-photographers-for-travel-portraits28__700.jpg?fit=700%2C466&ssl=1',
   },
   {
     title: 'Landscape Photography Classes',
     description:
       'Explore the beauty of nature through landscape photography and capture breathtaking scenes.',
     image:
       'https://www.lightstalking.com/wp-content/uploads/Photo-by-Mareck-1024x640.jpg',
   },
 ];


  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <Carousel
      showThumbs={false}
      autoPlay={true}
      infiniteLoop={true}
      interval={5000}
      selectedItem={currentSlide}
      onChange={(slide) => setCurrentSlide(slide)}
      className="h-screen"
    >
      {slides.map((slide, index) => (
        <div key={index} className=" ">
          <div className="w-full ">
            <img
              className="rounded-lg w-96 h-96 md:h-[600px] lg:h-screen"
              src={slide.image}
              alt=""
            />
          </div>
          <div className="w-1/2 text-center absolute md:top-52 md:right-40 lg:right-80 right-28 top-14">
            <div className="space-y-2">
              <p className="px-2 text-[9px] font-semibold uppercase bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 w-fit rounded-lg text-white">
                {slide.title}
              </p>
              <h1 className="text-4xl text-white lg:text-5xl font-sans font-bold  lg:w-full">
                {slide.title}
              </h1>
              <p className="text-sm  text-white ">{slide.description}</p>
            </div>
            <div className="mt-4">
              <button className="px-4 py-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-2xl text-sm font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
