import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useEffect } from 'react';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = ({ price, cls }) => {
  console.log(price, cls);
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState('');
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: error.message,
      });
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'anonymous name',
            email: user?.email || 'unknown email address',
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
      Swal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: error.message,
      });
    }

    setProcessing(false);
    console.log(paymentIntent);
    if (paymentIntent.status === 'succeeded') {
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: 'Your payment has been processed.',
      });

      const payment = {
        classId: cls._id,
        className: cls.className,
        price,
        paymentEmail: user?.email,
        transactionId: paymentIntent.id,
        classDetails: cls,
        date: new Date(),
        enrollStatus: 'pending'
      };
      axiosSecure.post('/payments', payment).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
        }
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow-md"
    >
      <div className="mb-6">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold py-2 px-4 rounded shadow transition duration-300"
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
