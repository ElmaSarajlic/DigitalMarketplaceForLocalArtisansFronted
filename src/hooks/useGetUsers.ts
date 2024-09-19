import {  useQuery } from "react-query";
import {  UserService } from "../services";
import { User } from "../utils/types";

interface ApiError {
    message: string;
}  

const useGetUsers = () => {
    return useQuery<User[], ApiError>('user',
        () => UserService.getUsers(),
    );
}


export default useGetUsers