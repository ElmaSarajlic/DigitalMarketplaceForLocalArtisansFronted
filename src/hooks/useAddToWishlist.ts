import { useMutation } from 'react-query';
import { Wishlist } from '../utils/types'; 
import { WishlistService } from '../services';

interface ApiError {
    message: string;
}

const useAddToCart = () => {
    return useMutation<Wishlist, ApiError, { userId: string, artworkId: string }>(
        ({ userId, artworkId }) => WishlistService.addArtworkToWishlist(userId, artworkId),
        {
            onError: (error) => {
                console.error('Error adding artwork to cart:', error.message);
            },}
    );
};

export default useAddToCart;
