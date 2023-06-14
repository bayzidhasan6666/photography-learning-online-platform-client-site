import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        if (user && user.email) {
          const response = await axiosSecure.get('/payments');
          const filteredPayments = response.data.filter(
            (payment) => payment.paymentEmail === user.email
          );
          setPayments(filteredPayments);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPayments();
  }, [axiosSecure, user]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center my-8 mb-4">
        Payment History
      </h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b font-bold">Payment Email</th>
            <th className="py-2 px-4 border-b font-bold">Amount</th>
            <th className="py-2 px-4 border-b font-bold">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id} className="border-b">
              <td className="py-2 px-4">{payment.paymentEmail}</td>
              <td className="py-2 px-4">{payment.price}</td>
              <td className="py-2 px-4">{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
