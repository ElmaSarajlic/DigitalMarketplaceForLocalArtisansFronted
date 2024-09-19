import { useQuery } from "react-query";
import { Category } from "../utils/types";
import { CategoryService } from "../services";

interface ApiError {
    message: string;
}  

const useCategories = () => {
    return useQuery<Category[], ApiError>('categories',
        () => CategoryService.getAllCategories(),
    );
}

export default useCategories