import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, MenuItem, FormControl, InputLabel, Select, Typography, Box } from '@mui/material';
import { Artwork, Category } from '../../utils/types';
import useUpdateArtwork from '../../hooks/useUpdateArtwork';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategories } from '../../hooks';
import useArtwork from '../../hooks/useArtworkId';

const UpdateArtwork: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: existingArtwork, isLoading, error } = useArtwork(id || '');
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const { mutate: updateArtwork } = useUpdateArtwork();
  const { data: categories } = useCategories();
  const navigate = useNavigate();

  useEffect(() => {
    if (existingArtwork) {
      setArtwork(existingArtwork);
    }
  }, [existingArtwork]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (artwork) {
      setArtwork({
        ...artwork,
        [name as string]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (artwork) {
      updateArtwork(
        { id: artwork.id, artwork },
        {
          onSuccess: () => {
            navigate('/');
          },
          onError: (error) => {
            console.error('Update error:', error);
          },
        }
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading artwork</div>;
  }

  if (!artwork) {
    return <div>Artwork not found</div>;
  }

  return (
    <Container maxWidth="sm" sx={{ marginBottom: 4 }}>
      <Box sx={{ backgroundColor: 'white', padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>Update Artwork</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Image URL"
            name="imgUrl"
            value={artwork.imgUrl || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Title"
            name="title"
            value={artwork.title || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={artwork.description || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            label="Author"
            name="author"
            value={artwork.author || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={artwork.price || 0}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={artwork.category || ''}
              onChange={handleChange}
            >
              {categories?.map((category: Category) => (
                <MenuItem key={category.name} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Artwork
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateArtwork;
