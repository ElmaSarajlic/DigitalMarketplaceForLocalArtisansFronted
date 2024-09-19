import appAxios from "./AppAxios";
import { Wishlist } from "../utils/types";

const addArtworkToWishlist = async (userId: string, artworkId: string): Promise<Wishlist> => {
    return appAxios.post(`/wishlists/${userId}`, null, {
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

const getWishlist = async (userId: string): Promise<Wishlist[]> => {
    return appAxios.get(`/wishlists/user/${userId}`) 
        .then((response) => {
            const data = response.data;
            console.log(data);
            return data;
        }).catch((error) => {
            console.error("Error:", error.message);
            throw error;
        });
};

const deleteFromWishlist = async (wishlistId: string, artworkId: string): Promise<void> => {
    console.log(`Deleting artwork with ID: ${artworkId}`);
    
    return appAxios.delete(`/wishlists/${wishlistId}/artwork/${artworkId}`).then(() => {
      console.log('Artwork deleted successfully from Wishlist');
    }).catch((error) => {
      console.error('Error deleting artwork from Wishlist:', error);
      throw error; 
    });
}

export default {addArtworkToWishlist, getWishlist, deleteFromWishlist}