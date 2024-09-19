import { useQuery } from 'react-query';
import { Cart } from '../utils/types'; 
import { CartService } from '../services';

const useGetCart = (userId: string) => {
    return useQuery<Cart[], Error>(['carts', userId], () => CartService.getCart(userId));
};

export default useGetCart;
