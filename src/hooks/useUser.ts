import { useQuery } from "react-query";
import { UserService } from "../services";


const useUser = (userId: string | null) => {
  return useQuery(
    ['user', userId],
    () => UserService.getUserById(userId!),
    {
      enabled: !!userId, 
    }
  );
};

export default useUser;