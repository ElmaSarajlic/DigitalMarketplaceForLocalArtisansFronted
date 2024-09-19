import { useQuery } from "react-query";
import { MessageService } from "../services";
import { Message } from "../utils/types";


interface ApiError {
    message: string;
}  

const useMessages = () => {
    return useQuery<Message[], ApiError>('message',
        () => MessageService.getallMessages(),
    );
}


export default useMessages