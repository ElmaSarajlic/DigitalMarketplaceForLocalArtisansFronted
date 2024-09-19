import React from 'react';
import { Card, CardMedia, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Artwork } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import useDeleteArtwork from '../../hooks/useDeleteArtwork';
import useAddToCart from '../../hooks/useAddToCart';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

type Props = {
  artwork: Artwork;
};

const CustomCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  maxWidth: 345,
  maxHeight: 345,
  cursor: 'pointer',
  boxShadow: theme.shadows[24],
  '&:hover .cardMediaOverlay': {
    opacity: 1,
  },
}));

const TopRightButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: 'white',
  '& .MuiButton-startIcon': {
    color: 'white',
  },
}));

const TopLeftButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  left: theme.spacing(1),
  color: 'white',
  transition: 'opacity 0.3s ease',
  '& .MuiButton-startIcon': {
    color: 'white',
  },
}));

const BottomLeftButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  left: theme.spacing(1),
  color: 'white',
  '& .MuiButton-startIcon': {
    color: 'white',
  },
}));

const CardMediaOverlay = styled('div')({
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease',
});

const ProductCard = ({ artwork }: Props) => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const userType = useSelector((state: RootState) => state.auth.userType);


  const navigate = useNavigate();
  const { mutate: deleteArtwork } = useDeleteArtwork();
  const { mutate: addToCart } = useAddToCart();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); // Prevent the card's onClick event
    if (!artwork.id) {
      console.error('Cannot delete artwork with null or undefined ID');
      return;
    }
    deleteArtwork(artwork.id, {
      onSuccess: () => {
        console.log(`Artwork with ID ${artwork.id} was deleted.`);
        window.location.reload();
      },
      onError: (error) => {
        console.error('Error deleting the artwork:', error);
      },
    });
  };

  const handleCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!artwork.id) {
        console.error('Cannot add artwork with null or undefined ID');
        return;
    }
    if (!userId) {
        console.error('User ID is null or undefined');
        return;
    }
    addToCart(
      { userId, artworkId: artwork.id },
      {
        onSuccess: () => {
          console.log(`Artwork with ID ${artwork.id} was added to cart.`);
          window.location.reload();
        },
        onError: (error) => {
          console.error('Error adding the artwork:', error);
        },
      }
    );
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); // Prevent the card's onClick event
    navigate(`/updateartwork/${artwork.id}`);
  };

  return (
    <CustomCard onClick={() => navigate(`/iteminfo/${artwork.id}`)}>
      <CardMedia component="img" height="200" image={artwork.imgUrl}  />
      <CardMediaOverlay className="cardMediaOverlay">
      <Typography gutterBottom variant="h5" component="div" style={{ color: '#fff', marginTop: '10px' }}>
  {artwork.title || 'Untitled'}
</Typography>

        <Typography variant="body2" color="white">
          Price: ${artwork.price}
        </Typography>
        <Typography variant="body2" color="white">
          Author: {artwork.author}
        </Typography>
        {(userType === 'ADMIN' || userType === 'REGISTERED') && (

        <TopRightButton startIcon={<ShoppingCartOutlinedIcon />} onClick={handleCart} />
      )}
        {(userType === 'ADMIN' || userId === artwork.userId) && (

        <TopLeftButton startIcon={<DeleteOutlinedIcon />} onClick={handleDelete} />
      )}
      {(userType === 'ADMIN' || userId === artwork.userId) && (
          <BottomLeftButton startIcon={<EditOutlinedIcon />} onClick={handleEdit} />
        )}
      </CardMediaOverlay>
    </CustomCard>
  );
};

export default ProductCard;
