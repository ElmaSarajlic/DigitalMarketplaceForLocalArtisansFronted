import { Category } from "../utils/types";
import appAxios from "./AppAxios";


const getAllCategories = async (): Promise<Category[]> => {
    return appAxios.get(`/categories`).then(
        (response) => {
            const data = response.data;
            console.log(data); 

            return data;
        });
}

const createCategory = async (category: Category): Promise<Category[]> => {
    return appAxios.post('/categories', category).then(
        (response) => { 
            const data = response.data;
            console.log(response);
            console.log(data);
 
            return data;
        });
 }

 const deleteCategory = async (categoryId: string): Promise<void> => {
    console.log(`Deleting subcategory with ID: ${categoryId}`);
    
    return appAxios.delete(`/categories/${categoryId}`).then(() => {
      console.log('Category deleted successfully');
    }).catch((error) => {
      console.error('Error deleting category:', error);
      throw error; 
    });

};
export default {getAllCategories, createCategory, deleteCategory}