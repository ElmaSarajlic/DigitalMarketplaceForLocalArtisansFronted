import React from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider'; 
import '../App.css'
import UserProfile from '../components/UserProfile';
import ChangePassword from '../components/changePassword/ChangePassword';
import CardUsersList from '../components/CardUsersList';

const CreateCategoryPage: React.FC = () => {
  return (
    <div>
      <Container maxWidth="md" style={{ padding: '20px' }}>
        <UserProfile />
        <ChangePassword />
        <Divider style={{ marginTop: '150px' }}>My Artworks</Divider>        
        <CardUsersList />
      </Container>
    </div>
  );
};

export default CreateCategoryPage;
