// useDeleteAd.ts
import { useMutation } from "react-query";
import { UserService } from "../services";

interface ApiError {
    message: string;
}  

const useDeleteUser = () => {
    return useMutation<void, ApiError, string>(
        (id: string) => UserService.deleteUser(id)
    );
};

export default useDeleteUser;
