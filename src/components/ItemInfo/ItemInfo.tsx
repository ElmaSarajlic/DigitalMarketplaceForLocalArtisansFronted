import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  TextField,
  List,
  ListItem,
  IconButton
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { FavoriteBorder } from '@mui/icons-material'; 

import { useSelector } from 'react-redux';
import useArtwork from '../../hooks/useArtworkId';
import useAddToCart from '../../hooks/useAddToCart';
import useAddToWishlist from '../../hooks/useAddToWishlist'; 
import { RootState } from '../../store';
import CommentCard from '../commentCard';
import useAddComment from '../../hooks/useAddComment';


const ProductInfoPage: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const userType = useSelector((state: RootState) => state.auth.userType);

  const { id } = useParams<{ id?: string }>();
  const { data: artwork, isLoading, error } = useArtwork(id || '');
  const { mutate: addToCart } = useAddToCart();
  const { mutate: addToWishlist } = useAddToWishlist(); 

  const [comment, setComment] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const { mutate: addComment } = useAddComment();


  const handleAddToCart = () => {
    if (!userId || !artwork?.id) {
      console.error('User ID or Artwork ID is missing');
      return;
    }

    addToCart(
      {  userId, artworkId: artwork.id },
      {
        onSuccess: () => {
          console.log(`Artwork with ID ${artwork.id} was added to cart.`);
        },
        onError: (error: any) => {
          console.error('Error adding the artwork to cart:', error);
        },
      }
    );
  };
  const handleAddToWishlist = () => {
    if (!userId || !artwork?.id) {
      console.error('User ID or Artwork ID is missing');
      return;
    }

    addToWishlist(
      { userId, artworkId: artwork.id },
      {
        onSuccess: () => {
          console.log(`Artwork with ID ${artwork.id} was added to wishlist.`);
        },
        onError: (error: any) => {
          console.error('Error adding the artwork to wishlist:', error);
        },
      }
    );
  };
  
  const handleCommentSubmit = async () => {
    if (!comment.trim()) return; 
    setIsSubmitting(true);

    const newComment = {
        text: comment,
        creationDate: new Date().toISOString() 
    };

    addComment({
        userId: userId,
        artworkId: artwork?.id,
        comment: newComment
    }, {
        onSuccess: () => {
            setComment(''); 
            console.log('Comment added successfully');
        },
        onError: (error) => {
            console.error('Error while adding comment:', error.message);
        },
        onSettled: () => {
            setIsSubmitting(false); 
        }
    });
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

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={100}>
          <Card sx={{ width: '100%', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardMedia
              component="img"
              sx={{ height: '100%', width: 'auto', maxWidth: '100%' }}
              image={artwork.imgUrl}
              alt={artwork.title}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={100}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {artwork.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ fontWeight: 'bold' }}>
                Category: {artwork.category}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1, fontWeight: 'bold' }}>
                by {artwork.author}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Created on: {artwork.creationDate ? new Date(artwork.creationDate).toLocaleDateString() : 'Unknown Date'}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ mt: 2 }}>
                {artwork.description}
              </Typography>
              <Typography variant="h5" color="text.primary" sx={{ mt: 2, fontWeight: 'bold' }}>
                Price: ${artwork.price}
              </Typography>
              
              {(userType === 'ADMIN' || userType === 'REGISTERED') && (
                <Box sx={{ display: 'justify', alignItems: 'center', gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>

                  <IconButton
                    color="primary"
                    onClick={handleAddToWishlist}
                  >
                    <FavoriteBorder />
                  </IconButton>
                  </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4,  p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Comments</Typography>
        <TextField
          fullWidth
          label="Add a comment"
          variant="outlined"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mb: 2 }}
          disabled={isSubmitting}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
          disabled={!comment.trim() || isSubmitting}
        >
          Add Comment
        </Button>
        <List>
                {artwork.comments.map((comment) => (
                  <ListItem key={comment.id}>
                    <CommentCard comment={comment} />
                  </ListItem>
                ))}
              </List>
      </Box>
    </Box>
  );
}

export default ProductInfoPage;
