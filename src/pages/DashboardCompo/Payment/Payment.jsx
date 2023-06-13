import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const cls = useLoaderData();
  console.log(cls); // Verify if the data is received correctly

  const handlePaymentSuccess = (paymentIntent) => {
    console.log('Payment Success:', paymentIntent);
    // Handle the successful payment, such as showing a success message or redirecting the user
  };

  const handlePaymentError = (error) => {
    console.log('Payment Error:', error);
    // Handle the payment error, such as showing an error message to the user
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl  bg-gradient-to-b from-purple-500 to-red-500 bg-clip-text text-transparent uppercase font-bold text-center my-10">
        <Typewriter
          options={{
            strings: ['Payment Now', 'Enroll Now'],
            autoStart: true,
            loop: true,
          }}
        />
      </h2>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-b from-purple-500 to-red-500 bg-clip-text text-transparent">
          {cls.className}
        </h1>
        <p className="text-gray-700 font-semibold mb-2">
          Instructor:{' '}
          <span className="text-purple-600">{cls.instructorName}</span>
        </p>
        <p className="text-gray-700 font-semibold">
          Price: <span className="text-pink-500">$ {cls.price}</span>
        </p>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          cls={cls}
          price={cls.price}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      </Elements>
    </div>
  );
};

export default Payment;
