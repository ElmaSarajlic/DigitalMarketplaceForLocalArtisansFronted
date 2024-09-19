import appAxios from "./AppAxios";
import { Payment, PaymentResponse } from "../utils/types"; 

const createPaymentIntent = async (payment: Payment): Promise<PaymentResponse> => {
    return appAxios.post(`payment/create-checkout-session`, payment, {
        timeout: 50000, 
    })
        .then(
        (response) => {
            const data = response.data;
            console.log(data);
            return data;
        }).catch((error) => {
            console.error("Error:", error.message);
            throw error; 
        });
};
 
export default { createPaymentIntent }
