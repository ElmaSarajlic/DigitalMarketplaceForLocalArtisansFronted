import { Message } from "../utils/types";
import appAxios from "./AppAxios";

const getallMessages = async (): Promise<Message[]> => {
    return appAxios.get(`/notifications/messages`).then(
        (response) => {
            const data = response.data;
            console.log(data);
  
            return data;
        }).catch((error) => {
            console.error("Error:", error.message);
            throw error; 
        });
  }
  export default {getallMessages}