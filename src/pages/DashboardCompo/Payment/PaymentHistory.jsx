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
      <h1 className="text-3xl font-bold text-center my-8">Payment History</h1>
      <table className=" w-full  mx-auto bg-white border shadow-md">
        <thead>
          <tr>
            <th className="py-4 px-6 bg-gray-100 font-semibold uppercase">
              Payment Email
            </th>
            <th className="py-4 px-6 bg-gray-100 font-semibold uppercase">
              Amount
            </th>
            <th className="py-4 px-6 bg-gray-100 font-semibold uppercase">
              transaction Id
            </th>
            <th className="py-4 px-6 bg-gray-100 font-semibold uppercase">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id} className="border-b">
              <td className="py-4 px-6">{payment.paymentEmail}</td>
              <td className="py-4 px-6">${payment.price}</td>
              <td className="py-4 px-6">{payment.transactionId}</td>
              <td className="py-4 px-6">{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
