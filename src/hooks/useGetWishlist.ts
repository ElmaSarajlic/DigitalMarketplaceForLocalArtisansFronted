import { useQuery } from 'react-query';
import { Wishlist } from '../utils/types'; 
import { WishlistService } from '../services';

const useGetWishlist = (userId: string) => {
    return useQuery<Wishlist[], Error>(['wishlists', userId], () => WishlistService.getWishlist(userId));
};

export default useGetWishlist;
