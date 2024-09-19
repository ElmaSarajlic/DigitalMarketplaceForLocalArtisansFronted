import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Artwork } from '../../utils/types';
import SearchBar from '../search';
import { useArtworks, useGetArtworksCategory } from '../../hooks';
import ProductCard from '../Card/Card';
import { useParams } from 'react-router-dom';

const ITEMS_PER_PAGE = 9;

const ProductCardList = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const { data: allArtworks, isLoading, isError } = categoryName
    ? useGetArtworksCategory(categoryName)
    : useArtworks();
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Artwork[]>([]);

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = allArtworks?.filter((artwork: Artwork) =>
        artwork.title.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredData(filtered || []);
    } else {
      setFilteredData(allArtworks || []);
    }
  }, [allArtworks, searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [categoryName]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const currentProducts = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const count = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching artworks.</div>;

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <Grid container spacing={4} marginTop='80px'>
        {currentProducts.map((artwork) => (
          <Grid item xs={12} sm={6} md={4} key={artwork.id}>
            <ProductCard artwork={artwork} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} alignItems="center" sx={{ marginTop: 6, marginBottom: 6 }}>
        <Pagination count={count} page={page} color="primary" onChange={handleChange} />
      </Stack>
    </>
  );
};

export default ProductCardList;
