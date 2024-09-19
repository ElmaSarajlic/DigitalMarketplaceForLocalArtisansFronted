import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer: React.FC = () => {
  return (
    <Box  
      component="footer" id='footer'
      sx={{
      marginBottom: 'auto',
      position: 'absolute',
      left: 0,
      right:0,
      width: '100%', 
      backgroundColor: '#262254',
      color: '#9c77c9',
      borderTop: '1px solid',
      borderColor: 'divider',
      py: 3,
      
      }}
    >
      <Container >
        <Grid container spacing={5} justifyContent="center" alignItems="center" >
          <Grid item>
            <Logo />
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={3}>
              <Link href="#" color="inherit" underline='none' variant="body1">About us</Link>
              <Link href="#" color="inherit" underline='none' variant="body1" sx={{ mx: 4 }}>Privacy policy</Link>
              <Link href="/Homepage" color="inherit" underline='none' variant="body1">Homepage</Link>
              <Link href="/Login" color="inherit" underline='none' variant="body1" sx={{ mx: 4 }}>Login</Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={2} sx={{ mt: 2 }}>
          <IconButton href="#" color="secondary">
            <FacebookIcon />
          </IconButton>
          <IconButton href="#" color="secondary">
            <TwitterIcon />
          </IconButton>
          <IconButton href="#" color="secondary">
            <InstagramIcon />
          </IconButton> 
          <IconButton href="#" color="secondary">
            <LinkedInIcon />
          </IconButton>
        </Grid>
        <Typography variant="body2" color="secondary" align="center" sx={{ mt: 4 }}>
          © 2020 Nereus. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

const Logo: React.FC = () => (
  <Typography variant="h6">
    Logo
  </Typography>
);

export default Footer;
