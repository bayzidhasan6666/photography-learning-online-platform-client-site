import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the form data to your desired endpoint or perform any other actions here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    // Clear form fields
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen text-black rounded-xl mt-5 px-10">
      <div className="container mx-auto py-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#cc40f5] to-[#5b55fd] bg-clip-text text-transparent mb-6">
            Contact Us
          </h1>
          <p className="text-xl bg-gradient-to-r from-[#cc40f5] to-[#5b55fd] bg-clip-text text-transparent mb-12">
            Have a question or want to get in touch? Fill out the form below.
          </p>
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-lg" htmlFor="name">
                Name
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-lg" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-lg" htmlFor="message">
                Message
              </label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="inline-block py-3 px-6 mt-2 bg-gradient-to-r from-[#cc40f5] to-[#5b55fd] rounded-lg text-white hover:bg-[#a936ff] transition duration-300 ease-in-out"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
