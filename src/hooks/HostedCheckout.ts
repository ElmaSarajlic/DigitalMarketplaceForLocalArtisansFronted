import { useMutation } from 'react-query';
import { PaymentService } from '../services';
import { Payment, PaymentResponse } from '../utils/types';

interface ApiError {
  message: string;
}

const useCreatePaymentIntent = () => {
  const mutation = useMutation<PaymentResponse, ApiError, Payment>(
    (payment) => PaymentService.createPaymentIntent(payment),
    {
      onSuccess: (data) => {
        console.log('Payment Intent created successfully:', data);
      },
      onError: (error: ApiError) => {
        console.error('Failed to create Payment Intent:', error.message);
      }
    }
  );
 
  return mutation;
};

export default useCreatePaymentIntent;