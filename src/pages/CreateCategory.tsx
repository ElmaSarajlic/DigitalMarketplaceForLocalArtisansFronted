import React from 'react';
import Container from '@mui/material/Container';
import '../App.css'
import CreateCategory from '../components/createCategory/createCategory';


const CreateCategoryPage: React.FC = () => {
  return (
    <div>
      <Container maxWidth="md" style={{ marginTop: '100px', padding: '20px', marginBottom:'250px',backgroundColor: 'white'}}>
        <CreateCategory/>
      </Container>
    </div>
  );
};

export default CreateCategoryPage;
