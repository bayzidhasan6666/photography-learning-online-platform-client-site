import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: adminUser, isLoading: isAdminLoading } = useQuery(
    ['isAdmin', user?.email],
    async () => {
      const res = await axiosSecure.get(
        `/users?role=admin&email=${user?.email}`
      );
      const adminUser = res.data.find((user) => user.role === 'admin');
      console.log('isAdmin', adminUser);
      return adminUser;
    }
  );

  return [adminUser, isAdminLoading];
};

export default useAdmin;
