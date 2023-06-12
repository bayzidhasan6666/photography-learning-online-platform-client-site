import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = ({ cls }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (cls.price > 0) {
        try {
          const response = await axiosSecure.post('/create-payment-intent', {
            price: cls.price,
          });
          setClientSecret(response.data.clientSecret);
        } catch (error) {
          console.error('Failed to fetch client secret:', error);
        }
      }
    };

    fetchClientSecret();
  }, [axiosSecure, cls.price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        throw new Error(error.message);
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: user?.email || 'unknown',
              name: user?.displayName || 'anonymous',
            },
          },
        });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        setTransactionId(paymentIntent.id);
        const payment = {
          email: user?.email,
          transactionId: paymentIntent.id,
          price: cls.price,
          date: new Date(),
          quantity: cls.length,
          classId: cls.map((item) => item._id),
          status: 'service pending',
          className: cls.map((item) => item.className),
        };

        try {
          await axiosSecure.post('/payments', payment);
          Swal.fire({
            icon: 'success',
            title: 'Payment Saved',
            text: 'Payment information saved successfully',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } catch (error) {
          console.error('Failed to save payment:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to save payment information',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Failed to process payment',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }

    setProcessing(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="mb-4">
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
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button
          className="px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-500 font-semibold text-white rounded disabled:opacity-50 disabled:pointer-events-none hover:from-sky-500 hover:to-cyan-400 focus:outline-none"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? 'Processing...' : 'Pay'}
        </button>
      </form>
      {transactionId && (
        <p className="text-teal-400 mt-4 text-center">
          Transaction Complete With Transaction ID: {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
