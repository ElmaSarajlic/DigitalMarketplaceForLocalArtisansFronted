// useDeleteAd.ts
import { useMutation } from "react-query";
import { CategoryService } from "../services";

interface ApiError {
    message: string;
}  

const useDeleteCategory = () => {
    return useMutation<void, ApiError, string>(
        (id: string) => CategoryService.deleteCategory(id)
    );
};

export default useDeleteCategory;
