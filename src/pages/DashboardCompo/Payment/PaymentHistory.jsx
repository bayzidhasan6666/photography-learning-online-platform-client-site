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

  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <div className="container mx-auto mb-10">
      <h1 className="text-2xl font-bold text-center my-8">Payment History</h1>
      <div className="overflow-x-auto  hidden lg:flex">
        <table className="min-w-full bg-white border shadow-md">
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border-b">
                <td className="py-4 px-6">
                  <div className="font-semibold">Payment Email</div>
                  <div>{payment.paymentEmail}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-semibold">Amount</div>
                  <div>${payment.price}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-semibold">Transaction ID</div>
                  <div>{payment.transactionId}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-semibold">Date</div>
                  <div>{formatDateTime(payment.date)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden px-2">
        {payments.map((payment) => (
          <div
            key={payment._id}
            className="bg-white rounded-xl shadow overflow-hidden sm:rounded-lg mb-4"
          >
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Transaction Details
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Transaction ID: {payment.transactionId}
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="flex justify-between items-center px-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 py-2">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    {payment.paymentEmail}
                  </dd>
                </div>
                <div className="flex justify-between items-center px-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 py-2">
                  <dt className="text-sm font-medium text-gray-500">Amount</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    ${payment.price}
                  </dd>
                </div>
                <div className="flex justify-between items-center px-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 py-2">
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    {formatDateTime(payment.date)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
