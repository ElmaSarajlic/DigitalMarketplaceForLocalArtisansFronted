// hooks/useCart.ts
import { useMutation } from 'react-query';
import { Cart } from '../utils/types'; // Assuming you have a Cart type defined in your types
import { CartService } from '../services';

interface ApiError {
    message: string;
}

const useAddToCart = () => {
    return useMutation<Cart, ApiError, { userId: string, artworkId: string }>(
        ({ userId, artworkId }) => CartService.addArtworkToCart(userId, artworkId),
        {
            onError: (error) => {
                // Handle the error (e.g., show a notification)
                console.error('Error adding artwork to cart:', error.message);
            },}
    );
};

export default useAddToCart;
