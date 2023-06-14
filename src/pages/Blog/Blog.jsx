import React from 'react';

const Blog = () => {
  return (
    <div className="min-h-screen text-black rounded-xl mt-5 px-10">
      <div className="container mx-auto py-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#cc40f5] to-[#5b55fd] bg-clip-text text-transparent mb-6">
            Welcome to Our Blog
          </h1>
          <p className="text-xl bg-gradient-to-r from-[#cc40f5] to-[#5b55fd] bg-clip-text text-transparent mb-12">
            Stay updated with the latest photography tips, techniques, and
            inspiration from our experts.
          </p>
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded">
                <img
                  src="https://i.pinimg.com/736x/5a/41/58/5a4158f25a620b90b45eab1e77910a35.jpg"
                  alt="Blog Post 1"
                  className="object-cover w-96 h-52 rounded-lg"
                />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-[#cc40f5] to-[#5b55fd] bg-clip-text text-transparent">
                Mastering Composition in Photography
              </h2>
              <p className="text-gray-700">
                Learn how to create compelling compositions that draw the
                viewer's attention and make your photos stand out.
              </p>
              <a
                href="#"
                className="inline-block py-2 px-4 mt-2 bg-gradient-to-r from-[#cc40f5] to-[#5b55fd] rounded-lg text-white hover:bg-[#a936ff] transition duration-300 ease-in-out"
              >
                Read More
              </a>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="rounded">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_lQt1UPhB_BGk04LtwJM3MFkty5g97zlpYvNScY7FS_WKT04Zv--RmvP0rd2oP8vYbYQ&usqp=CAU"
                  alt="Blog Post 2"
                  className="object-cover w-96 h-52 rounded-lg"
                />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-[#cc40f5] to-[#5b55fd] bg-clip-text text-transparent">
                The Art of Capturing Natural Light
              </h2>
              <p className="text-gray-700">
                Discover the techniques to harness the beauty of natural light
                in your photography and create stunning, ethereal images.
              </p>
              <a
                href="#"
                className="inline-block py-2 px-4 mt-2 bg-gradient-to-r from-[#cc40f5] to-[#5b55fd] rounded-lg text-white hover:bg-[#a936ff] transition duration-300 ease-in-out"
              >
                Read More
              </a>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="rounded">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz75Oznv-IzNincMFUFZ-nPxD9Uz2oqIc-TA&usqp=CAU"
                  alt="Blog Post 3"
                  className="object-cover w-96 h-52 rounded-lg"
                />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-[#cc40f5] to-[#5b55fd] bg-clip-text text-transparent">
                Creative Portrait Photography Ideas
              </h2>
              <p className="text-gray-700">
                Get inspired with these unique and creative portrait photography
                ideas to capture memorable and expressive photographs.
              </p>
              <a
                href="#"
                className="inline-block py-2 px-4 mt-2 bg-gradient-to-r from-[#cc40f5] to-[#5b55fd] rounded-lg text-white hover:bg-[#a936ff] transition duration-300 ease-in-out"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
