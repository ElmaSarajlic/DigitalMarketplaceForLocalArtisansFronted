import React from 'react';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CancelPaymentPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRetryPayment = () => {
    // Logic to retry the payment, e.g., redirect to the payment page
    navigate('/cart'); // Redirect to your payment or checkout page
  };

  const handleGoHome = () => {
    navigate('/'); // Redirect to homepage
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75vh'
      }}
    >
    <Paper
    elevation={3}
    sx={{
      padding: '40px',
      textAlign: 'center',
      borderRadius: '10px',
    }}
  >
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Payment Canceled
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        Your payment has been canceled. If this was a mistake, you can try again.
      </Typography>
      <Box sx={{ display: 'justify', gap: 7 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRetryPayment}
          sx={{ width: 150 }}
        >
          Retry Payment
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleGoHome}
          sx={{ width: 150 }}
        >
          Go to Home
        </Button>
      </Box>
      </Paper>
    </Container>
  );
};

export default CancelPaymentPage;
