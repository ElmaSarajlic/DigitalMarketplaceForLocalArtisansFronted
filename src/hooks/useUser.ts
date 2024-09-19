import { useQuery } from "react-query";
import { UserService } from "../services";

interface ApiError {
    message: string;
}  

const useUser = (userId: string | null) => {
  return useQuery(
    ['user', userId],
    () => UserService.getUserById(userId!),
    {
      enabled: !!userId, // Disable the query if userId is null
    }
  );
};

export default useUser;