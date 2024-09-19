import { Container, Typography, Button, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentSuccess = () => {
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
        <CheckCircleIcon
          sx={{ fontSize: '3em', color: '#28a745', marginBottom: '20px' }}
        />
        <Typography variant="h4" sx={{ color: '#28a745', marginBottom: '20px' }}>
          Payment Successful!
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.2em', color: '#555555' }}>
          Thank you for your purchase. Your transaction has been processed
          successfully.
        </Typography>

        <Button
          variant="contained"
          href="/"
          sx={{
            marginTop: '30px',
            backgroundColor: '#28a745',
            ':hover': { backgroundColor: '#218838' },
          }}
        >
          Go back to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default PaymentSuccess;
