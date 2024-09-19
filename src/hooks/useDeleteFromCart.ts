import { useMutation } from "react-query";
import {  CartService } from "../services";

interface ApiError {
    message: string;
}  

const useDeleteFromCart = () => {
    return useMutation<void, ApiError, {cartId: string, artworkId: string}>(
        ({cartId, artworkId}) => CartService.deleteFromCart(cartId, artworkId),
        
    );
};

export default useDeleteFromCart;