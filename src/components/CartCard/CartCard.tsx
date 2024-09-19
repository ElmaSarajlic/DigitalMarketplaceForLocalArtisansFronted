import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useArtwork from '../../hooks/useArtworkId';
import useDeleteFromCart from '../../hooks/useDeleteFromCart';

interface CartItemProps {
  cartId: string;
  artworkId: string;
}

const CartItem: React.FC<CartItemProps> = ({ cartId, artworkId }) => {
  const { data: artwork, isLoading, error } = useArtwork(artworkId);
  const deleteMutation = useDeleteFromCart();

  const handleDelete = () => {
    deleteMutation.mutate({ cartId, artworkId });
    window.location.reload;
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error.message || 'Unknown error'}</Typography>;
  }

  if (!artwork) {
    return <Typography color="error">No artwork found</Typography>;
  }
  console.log(artwork);

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
      <CardMedia
        component="img"
        sx={{ width: 160, height: 90, margin: 2 }}
        image={artwork.imgUrl}
        alt="Product"
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', paddingLeft: 0 }}>
        <Typography variant="body1" sx={{ flexGrow: 1, color: '#262254', marginLeft: 1 }}>
          {artwork.title}
        </Typography>
        <Typography variant="body1" sx={{ color: '#262254', marginLeft: 2 }}>
          {artwork.price}$
        </Typography>
        <IconButton aria-label="delete" size="large" sx={{ color: '#262254' }} onClick={handleDelete}>
          <CloseIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default CartItem;

