import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import useGetWishlist from '../hooks/useGetWishlist'; 
import WishlistCard from '../components/WishlistCard';
import { Artwork } from '../utils/types';

const Wishlist: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  if (!userId) {
    return <div>User not logged in</div>;
  }

  const { data: wishlists, isLoading, error } = useGetWishlist(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const isEmpty = !wishlists || wishlists.length === 0 || wishlists.every(wishlist => wishlist.artworks.length === 0);

  return (
    <Box sx={{ padding: 2, color: 'white', borderRadius: 1, width: '100%' }}>
      <Typography variant="h3" sx={{ marginBottom: 2 }}>Your Wishlist</Typography>

      {isEmpty ? (
        <Typography variant="h1" sx={{ marginBottom: 15, marginTop: 15 }}>Your wishlist is empty</Typography>
      ) : (
        <Grid container spacing={4}>
          {(wishlists || []).map((wishlist) =>
            wishlist.artworks.map((artwork: Artwork) => (
              <Grid item xs={6} sm={2} md={6} key={artwork.id}>
                <WishlistCard
                  wishlistId={wishlist.id}
                  artworkId={artwork.id}
                  artwork={artwork}
                  onRemoveFromWishlist={(artworkId: string) => {
                    console.log(`Removed item with id: ${artworkId} from wishlist`);
                  }}
                />
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Wishlist;
