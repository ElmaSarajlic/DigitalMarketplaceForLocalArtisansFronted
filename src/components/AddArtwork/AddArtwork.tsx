import React, { useState } from 'react';
import { Container, TextField, Button, MenuItem, FormControl, InputLabel, Select, Typography, Box } from '@mui/material';
import { Artwork, Category } from '../../utils/types';
import useCreateArtwork from '../../hooks/useCreateArtwork';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SelectChangeEvent } from '@mui/material/Select';

const AddArtwork: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  const [artwork, setArtwork] = useState<Artwork>({
    id: '',
    imgUrl: '',
    title: '',
    description: '',
    author: '',
    price: 0,
    category: '',
    userId: userId || '',
    comments: []
  });

  const { mutate: createArtwork } = useCreateArtwork(); 
  const { data: categories } = useCategories();

  // Handle TextField change (React.ChangeEvent)
  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArtwork((prevArtwork) => ({
      ...prevArtwork,
      [name]: value
    }));
  };

  // Handle Select change (SelectChangeEvent)
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setArtwork((prevArtwork) => ({
      ...prevArtwork,
      category: value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createArtwork(artwork); 
      navigate('/homepage');
      window.location.reload();
    } catch (error) {
      console.error('Error creating ad:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginBottom: 4 }}>
      <Box sx={{ backgroundColor: 'white', padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>Add New Artwork</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Image URL"
            name="imgUrl"
            value={artwork.imgUrl}
            onChange={handleTextFieldChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Title"
            name="title"
            value={artwork.title}
            onChange={handleTextFieldChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={artwork.description}
            onChange={handleTextFieldChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            label="Author"
            name="author"
            value={artwork.author}
            onChange={handleTextFieldChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={artwork.price}
            onChange={handleTextFieldChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={artwork.category}
              onChange={handleSelectChange}
            >
              {categories?.map((category: Category) => (
                <MenuItem key={category.name} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Artwork
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddArtwork;
