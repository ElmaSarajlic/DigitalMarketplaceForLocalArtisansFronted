import { Card, CardHeader, Avatar } from '@mui/material';
import { User } from '../../utils/types';
import useDeleteUser from '../../hooks/useDeleteUser';
import DeleteButton from '../DeleteButton';

type Props = {
    user: User;
  
  };


const UserCard = ({ user }: Props) => {
    const { mutate: deleteUser } = useDeleteUser();


  const onDelete = () => {
    deleteUser(user.id, {
      onSuccess: () => {
        console.log(`User with ID ${user.id} was deleted.`);
        window.location.reload();
        
      },
      onError: (error) => { 
        console.error('Error deleting the ad:', error);
      },
    });
  };

  return (
      <Card sx={{ marginBottom: 2, width: '1000px' }}> 
        <CardHeader
          avatar={<Avatar src={user.imgUrl} alt={user.username} />}
          title={user.username } 
          subheader={user.email}
          action={
              <DeleteButton onDelete={onDelete} />
          }
          sx={{ '& .MuiCardHeader-action': { alignSelf: 'center' } }}
        />
      </Card>
    );
  };

  export default UserCard;

