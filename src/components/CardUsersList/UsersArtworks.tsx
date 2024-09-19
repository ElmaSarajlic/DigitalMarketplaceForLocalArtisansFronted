import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';  
import { useArtworks } from '../../hooks';
import ProductCard from '../Card/Card';


const ITEMS_PER_PAGE = 9;

const ProductCardList = () => {
  const { data: allArtworks, isLoading, isError } = useArtworks();
  const userId = useSelector((state: RootState) => state.auth.userId); 
  const [page, setPage] = useState(1);  

  const userArtworks = allArtworks?.filter(artwork => artwork.userId === userId);

  const handleChange = (_event: any, value: React.SetStateAction<number>) => {
    setPage(value);
  };

  const count = Math.ceil((userArtworks?.length || 0) / ITEMS_PER_PAGE);

  const currentArtworks = userArtworks?.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching artworks.</div>;

  return (
    <>
      <Grid container spacing={4} sx={{ marginTop: '80px' }}>
        {currentArtworks?.map((artwork) => (
          <Grid item xs={12} sm={6} md={4} key={artwork.id}>
            <ProductCard artwork={artwork} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} alignItems="center" sx={{ mt: 6, mb: 6 }}>
        <Pagination 
          count={count} 
          page={page} 
          color="primary" 
          onChange={handleChange} 
          shape="rounded"
        />
      </Stack>
    </>
  );
};

export default ProductCardList;
