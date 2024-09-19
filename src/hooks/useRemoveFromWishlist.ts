import { useMutation } from "react-query";
import { WishlistService } from "../services";

interface ApiError {
    message: string;
}  

const useDeleteFromWishlist = () => {
    return useMutation<void, ApiError, {wishlistId: string, artworkId: string}>(
        ({wishlistId, artworkId}) => WishlistService.deleteFromWishlist(wishlistId, artworkId),
        
    );
};

export default useDeleteFromWishlist;