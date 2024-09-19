import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { UserService } from '../services';
import { User } from '../utils/types';

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, AxiosError, { id: string; user: User }>(
    ({ id, user }) => UserService.updateUser(id, user),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    }
  );
};

export default useUpdateUser;
