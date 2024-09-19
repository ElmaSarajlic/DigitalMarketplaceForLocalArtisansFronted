import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import useGetCart from '../hooks/useGetCart';
import CartItem from '../components/CartCard';
import useCreatePaymentIntent from '../hooks/usePaymentIntent';
import { Payment } from '../utils/types';
import { StripePublicKey } from '../constants';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(StripePublicKey);

const Cart: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  if (!userId) {
    return <div>User not logged in</div>;
  }

  const { data: carts, isLoading, error } = useGetCart(userId);
  const { mutate: createCheckoutSession, data: checkoutSessionData } = useCreatePaymentIntent();

  useEffect(() => {
    const initiateStripeRedirection = async () => {
      if (checkoutSessionData) {
        const stripe = await stripePromise;
        if (!stripe) {
          console.error('Stripe.js has not loaded.');
          return;
        }

        const result = await stripe.redirectToCheckout({ sessionId: checkoutSessionData.id });
        if (result.error) {
          console.error('Error redirecting to Checkout:', result.error);
        }
      }
    };

    initiateStripeRedirection();
  }, [checkoutSessionData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const artworkIds = carts?.flatMap(cart => cart.artworks.map(artwork => artwork.id)) || [];

  const paymentDetails: Payment = {
    artworkIds,
    customerId: userId
  };

  const isEmpty = !carts || carts.length === 0 || carts.every(cart => cart.artworks.length === 0);

  const initiatePayment = () => {
    createCheckoutSession(paymentDetails);
  };

  const totalPrice = carts?.reduce((total, cart) => {
    return total + cart.artworks.reduce((sum, artwork) => sum + artwork.price, 0);
  }, 0) || 0;

  return (
    <Box sx={{ padding: 2, color: 'white', borderRadius: 1, width: 1000 }}>
      <Typography variant="h3" sx={{ marginBottom: 2 }}>Your Cart</Typography>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Total Items: {carts?.reduce((total, cart) => total + cart.quantity, 0) || 0}</Typography>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Total Price: ${totalPrice}</Typography>

      {isEmpty ? (
        <Typography variant="h1" sx={{ marginBottom: 15, marginTop: 15 }}>Your cart is empty</Typography>
      ) : (
        (carts || []).map((cart) => (
          cart.artworks.map((artwork) => (
            <CartItem
              key={artwork.id}
              cartId={cart.id}
              artworkId={artwork.id}
            />
          ))
        ))
      )}
      <Button 
        variant="contained" 
        sx={{ backgroundColor: '#645FA7', color: 'white', marginTop: 2, width: 200 }}
        onClick={initiatePayment} 
      >
        Order
      </Button>
    </Box>
  );
};

export default Cart;