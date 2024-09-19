import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useCreateCategory from '../../hooks/useCreateCategory';
import { Category } from '../../utils/types';

const AddCategoryForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();
  const { mutate: createCategory } = useCreateCategory();

  const handleAdd = async () => {
    if (name) {
      try {
        const category: Category = {
            name: name
        };

        await createCategory(category);
        console.log(`Category: ${name} added successfully`);
        navigate('/homepage'); 
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  const handleCancel = () => {
    navigate('/homepage'); 
  };

  return (
    <div>
      <TextField
        label="Category"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Save Category
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  ); 
};

export default AddCategoryForm;
