import React from 'react';
import { Card, CardMedia, Typography, Button, IconButton} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Artwork } from '../../utils/types';
import useAddToCart from '../../hooks/useAddToCart';
import useDeleteFromWishlist from '../../hooks/useRemoveFromWishlist';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

type Props = {
  artwork: Artwork; 
  artworkId: string;
  wishlistId: string;
  onRemoveFromWishlist: (id: string) => void;
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

const HeartButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  left: theme.spacing(1),
  color: 'white',
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

const WishlistCard: React.FC<Props> = ({ artwork, wishlistId, onRemoveFromWishlist }) => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { mutate: addToCart } = useAddToCart();
  const removeFromWishlistMutation = useDeleteFromWishlist();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
  const handleRemoveFromWishlist = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (!artwork || !userId) return;

    removeFromWishlistMutation.mutate(
      { wishlistId, artworkId: artwork.id },
      {
        onSuccess: () => {
          console.log(`Artwork with ID ${artwork.id} was removed from wishlist.`);
          onRemoveFromWishlist(artwork.id);
        },
        onError: (error: any) => {
          console.error('Error removing the artwork from wishlist:', error);
        },
      }
    );
  };

  return (
    <CustomCard onClick={() => navigate(`/iteminfo/${artwork.id}`)}>
      <CardMedia component="img" height="200" image={artwork.imgUrl} />
      <CardMediaOverlay className="cardMediaOverlay">
        <Typography gutterBottom variant="h5" component="div" style={{ color: '#fff', marginTop: '10px' }}>
          {artwork.title || 'Untitled'}
        </Typography>

        <Typography variant="body2" color="white">
          Price: ${artwork.price}
        </Typography>

        <HeartButton onClick={handleRemoveFromWishlist}>
          <FavoriteIcon style={{ color: 'red' }} />
        </HeartButton>

        <TopRightButton startIcon={<ShoppingCartOutlinedIcon />} onClick={handleAddToCart}>
        </TopRightButton>
      </CardMediaOverlay>
    </CustomCard>
  );
};

export default WishlistCard;
