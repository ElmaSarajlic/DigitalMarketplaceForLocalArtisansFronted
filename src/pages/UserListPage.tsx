import React from 'react';
import '../App.css'
import UserList from '../components/userList';
import { Container } from '@mui/material';


const UserListPage: React.FC = () => {
    return (
        
          <Container style={{ marginTop: '10px', marginBottom:'100px', position: 'relative'}}>
            <UserList id={''} cartId={''} wishlistId={''}/>
        </Container>
      );
  };

export default UserListPage;
