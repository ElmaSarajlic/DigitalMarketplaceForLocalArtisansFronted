import { useMutation, useQueryClient } from "react-query";
import { Password, User } from "../utils/types";
import { UserService } from "../services";

interface ApiError {
    message: string;
}  

const useUpdateUserPassword = () => {
    const queryClient = useQueryClient();
    return useMutation<User, ApiError, { id: string, password: Password }>(
        ({ id, password }) => UserService.updateUserPassword(id, password),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('user');
            },
        }
    );
};

export default useUpdateUserPassword;