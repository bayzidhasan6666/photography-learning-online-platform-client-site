import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddClass = () => {
  const { user } = useAuth();
  console.log('add class', user);
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', data.image[0]);

    try {
      const res = await fetch(img_hosting_url, {
        method: 'POST',
        body: formData,
      });
      const imgResponse = await res.json();

      if (imgResponse.success) {
        const imgURL = imgResponse.data.display_url;
        const {
          className,
          instructorName,
          instructorEmail,
          price,
          availableSeats,
        } = data;
        const newClass = {
          className,
          instructorName,
          instructorEmail,
          price: parseFloat(price),
          classImage: imgURL,
          availableSeats: parseInt(availableSeats),
        };

        console.log(newClass);

        try {
          const response = await fetch('http://localhost:5000/classes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newClass),
          });

          if (response.ok) {
            reset();
           Swal.fire({
             icon: 'success',
             title: 'Success!',
             text: 'Class post successfully',
             toast: true,
             position: 'top-end',
             showConfirmButton: false,
             timer: 5000,
             timerProgressBar: true,
           });
          } else {
            console.log('Failed to create class:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Class Name
          </label>
          <input
            type="text"
            {...register('className', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Class Image
          </label>
          <input
            type="file"
            {...register('image', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Instructor Name
          </label>
          <input
            type="text"
            {...register('instructorName', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Instructor Email
          </label>
          <input
            type="email"
            {...register('instructorEmail', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Available Seats
          </label>
          <input
            type="number"
            {...register('availableSeats', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            {...register('price', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
