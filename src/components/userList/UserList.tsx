import React from 'react';
import { Grid } from '@mui/material';
import useGetUsers from '../../hooks/useGetUsers';
import { User } from '../../utils/types';
import UserCard from '../userCard';



const UserList: React.FC< User > = () => {
    const { data: users, error } = useGetUsers();
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    if (!users) {
      return <div>Loading...</div>;
    }
  
    return (
      <Grid container spacing={2} direction="column" alignItems="stretch"> 
        {users.map((user) => (
          <Grid item key={user.id} xs={12}> 
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    );
  };
  
  export default UserList;
