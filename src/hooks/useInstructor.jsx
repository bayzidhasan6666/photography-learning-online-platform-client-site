import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useInstructor = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery(
    ['isInstructor', user?.email],
    async () => {
      const res = await axiosSecure.get(
        `/users?role=instructor&email=${user?.email}`
      );
      const instructorUser = res.data.find(
        (user) => user.role === 'instructor'
      );
      console.log('isInstructor', instructorUser);
      return instructorUser;
    }
  );

  return [isInstructor, isInstructorLoading];
};

export default useInstructor;
