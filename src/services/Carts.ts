import appAxios from "./AppAxios";
import { Cart } from "../utils/types";

const addArtworkToCart = async (userId: string, artworkId: string): Promise<Cart> => {
    return appAxios.post(`/carts/${userId}`, null, {
        params: {
            artworkId
        }
    }).then(
        (response) => {
            const data = response.data;
            console.log(data);
            return data;
        }).catch((error) => {
            console.error("Error:", error.message);
            throw error; 
        });
};

const getCart = async (userId: string): Promise<Cart[]> => {
    return appAxios.get(`/carts/user/${userId}`)
        .then((response) => {
            const data = response.data;
            console.log(data);
            return data;
        }).catch((error) => {
            console.error("Error:", error.message);
            throw error;
        });
};

const deleteFromCart = async (cartId: string, artworkId: string): Promise<void> => {
    console.log(`Deleting artwork with ID: ${artworkId}`);
    
    return appAxios.delete(`/carts/${cartId}/artwork/${artworkId}`).then(() => {
      console.log('Artwork deleted successfully from cart');
    }).catch((error) => {
      console.error('Error deleting artwork from cart:', error);
      throw error; 
    });
}

export default {addArtworkToCart, getCart, deleteFromCart}
