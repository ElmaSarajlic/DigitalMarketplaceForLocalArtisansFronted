import { useMutation, useQueryClient } from "react-query";
import { Category } from "../utils/types";
import { CategoryService } from "../services";


const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation((data: Category) => CategoryService.createCategory(data), {
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
        },
    });
 }; 

export default useCreateCategory;
