import { Password, User } from "../utils/types";
import appAxios from "./AppAxios";

const getUserById = async (id: string): Promise<User> => {
    console.log(`Fetching user with ID: ${id}`);
    
    return appAxios.get(`/users/${id}`).then((response) => {
        const data = response.data;
  
        return data;
    }).catch((error) => {
        console.log( error.message);
        throw error;
    });
};

const getUsers = async (): Promise<User[]> => {
    return appAxios.get(`/users/`).then(
        (response) => {
            const data = response.data;
            console.log(data);

            return data;
        });
}
const deleteUser = async (id: string): Promise<void> => {
    console.log(`Deleting user with ID: ${id}`);
    
    return appAxios.delete(`/users/${id}`).then(() => {
      console.log('user deleted successfully');
    }).catch((error) => {
      console.error('Error deleting user:', error);
      throw error; 
    });

};

const updateUserPassword = async (id: string, password: Password): Promise<User> => {
    return appAxios.put(`/users/password/${id}`, password).then(
        (response) => {
            const data = response.data;
            console.log(data);

            return data;
        });
}


const updateUser = async (id: string, user: User): Promise<User> => {
    return appAxios.put(`/users/${id}`, user).then((response) => {
      const data = response.data;
      console.log(data);
  
      return data;
    });
  };
  
export default {getUserById, getUsers, deleteUser, updateUserPassword, updateUser};
