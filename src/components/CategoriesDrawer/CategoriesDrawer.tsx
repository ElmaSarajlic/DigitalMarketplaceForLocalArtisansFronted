import React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../hooks';
import { Category } from '../../utils/types';
import useDeleteCategory from '../../hooks/useDeleteCategory';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface CategoriesDrawerProps {
  isDrawerOpen: boolean;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const CategoriesDrawer: React.FC<CategoriesDrawerProps> = ({ isDrawerOpen, toggleDrawer }) => {
  const userType = useSelector((state: RootState) => state.auth.userType);

  const { data: categories, isLoading, isError, error } = useCategories();
  const navigate = useNavigate();
  const { mutate: deleteCategory } = useDeleteCategory();

  if (isLoading) return <div>Loading categories...</div>;
  if (isError) return <div>Error fetching categories: {error?.message}</div>;

  const handleCategoryClick = (category: Category) => {
    if (category.name) {
      navigate(`/category/${category.name}`);
      toggleDrawer(false);
    } else {
      console.error('Category name is undefined');
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (categoryId) {
      deleteCategory(categoryId, {
        onSuccess: () => {
          console.log('Category deleted successfully');
          window.location.reload();
        },
        onError: (error) => {
          alert(`Failed to delete category: ${error.message}`);
        }
      });
    } else {
      console.error('Category ID is undefined');
    }
  };

  const drawerContent = (
    <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {categories?.map((category: Category, index: number) => (
          <ListItem key={index}>
            {userType === 'ADMIN' && (
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCategory(category.id || '')} 
              >                <DeleteIcon />
              </IconButton>
            )}
            <ListItemButton onClick={() => handleCategoryClick(category)}>
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor='left'
      open={isDrawerOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      {drawerContent}
    </SwipeableDrawer>
  );
};

export default CategoriesDrawer;
