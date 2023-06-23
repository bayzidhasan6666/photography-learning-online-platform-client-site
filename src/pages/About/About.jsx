import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen text-black rounded-xl mt-5 px-10">
      <div className="container mx-auto py-12">
        <div className="md:flex md:flex-col items-center justify-center">
          <p className="bg-gradient-to-b from-[#5b55fd] to-[#cc40f5] bg-clip-text text-transparent font-bold text-3xl my-5">
            The most beautiful moments in life come after going through
            hardships and challenges.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="md:flex items-center space-x-4">
              <div className="rounded">
                <img
                  src="https://www.photo-emphasis.com/wp-content/uploads/2023/02/60294816e5abae001c5260be.jpg"
                  alt="Photography Classes"
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#cc40f5]">
                  Photography Classes
                </h2>
                <p className="text-[#cc40f5]">
                  Explore a diverse range of photography classes covering
                  various topics such as composition, lighting, editing
                  techniques, and more. Elevate your skills and capture stunning
                  visuals.
                </p>
              </div>
            </div>
            <div className="md:flex items-center space-x-4">
              <div className="rounded">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZYWM4GLTwXF6PQFfDtbIDGw_LdVQ2Lu3fA4-2GbjPjDBwsat1iZfzJayOr49Cujvxr6M&usqp=CAU"
                  alt="Experienced Instructors"
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#ff7f50]">
                  Experienced Instructors
                </h2>
                <p className="text-[#ff7f50]">
                  Learn from industry professionals and experienced
                  photographers who will guide you through the learning journey.
                  Benefit from their expertise, insights, and personalized
                  feedback.
                </p>
              </div>
            </div>
            <div className="md:flex items-center space-x-4">
              <div className="rounded">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPbpMlG3ExPViaMYHy-Nb9G0vpe3su2r-gqIuRG-e8oRDVBOzmZSswZ9vCXbdZORYVu_o&usqp=CAU"
                  alt="Secure Payment System"
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#00bfa5]">
                  Secure Payment System
                </h2>
                <p className="text-[#00bfa5]">
                  Enroll in photography classes with confidence. Our secure
                  payment gateway ensures the safety of your transactions,
                  making it convenient and reliable to access course materials
                  and resources.
                </p>
              </div>
            </div>
            <div className="md:flex items-center space-x-4">
              <div className="rounded">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/59309765be6594842fe6d565/1582061823959-KFAVG9RKPPKOSNLVYGDK/7B4A8530-Edit-2.jpg?format=1500w"
                  alt="Community Interaction"
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#fbbf24]">
                  Community Interaction
                </h2>
                <p className="text-[#fbbf24]">
                  Connect with a community of photography enthusiasts, share
                  your work, and engage in discussions. Collaborate, inspire,
                  and learn from fellow learners, fostering creativity and
                  growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
