import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const location = useLocation();
  const cls = location.state?.cls;
  console.log(cls);

  return (
    <div>
      <h1 className="text-center font-bold text-2xl my-10">Payment</h1>
      {cls && <h1>Price: ${cls.price}</h1>}
      <Elements stripe={stripePromise}>
        {cls && <CheckoutForm cls={cls} />}
      </Elements>
    </div>
  );
};

export default Payment;
