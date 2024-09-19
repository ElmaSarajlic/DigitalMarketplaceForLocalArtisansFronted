import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Avatar, Grid, TextField, Box, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import useUser from '../../hooks/useUser';
import useUpdateUser from '../../hooks/useUpdateUser';
import { User } from '../../utils/types';

const UserProfileCard = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user, refetch } = useUser(userId);
  const updateUserMutation = useUpdateUser();
  const [editableUser, setEditableUser] = useState<User | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setEditableUser(user);
    }
  }, [user]);

  if (!userId) {
    return <div>No user ID found</div>;
  }

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = () => {
    if (editableUser) {
      updateUserMutation.mutate(
        { id: userId, user: editableUser },
        {
          onSuccess: () => {
            refetch(); 
            setIsEditable(false);
            setError('');
          },
          onError: (error) => {
            setError('Failed to update user information.');
            console.error('Update error:', error);
          }
        }
      );
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditableUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/homepage');
  };

  return (
    <Card sx={{ maxWidth: 850, margin: 'auto', overflow: 'visible', mb: 5, mt: 5 }}>
      <Grid container>
        {user && editableUser && (
          <>
            <Grid item xs={12} sm={5} sx={{ textAlign: 'center' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  sx={{ width: 120, height: 120, marginBottom: 2 }}
                  alt={user.username}
                  src={user.imgUrl}
                />
                <Typography variant="h5">{user.username}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {user.email}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button startIcon={<LogoutIcon />} onClick={handleLogout}>
                    Logout
                  </Button>
                </Box>
              </CardContent>
            </Grid>

            <Grid item xs={12} sm={7}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>User Information</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                  label="Email"
                  value={editableUser.email || ''}
                  onChange={handleChange}
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  name="email"
                  disabled={!isEditable}
                />
                <TextField
                  label="Username"
                  value={editableUser.username || ''}
                  onChange={handleChange}
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  name="username"
                  disabled={!isEditable}
                />
                <TextField
                  label="Phonenumber"
                  value={editableUser.phoneNumber || ''}
                  onChange={handleChange}
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  name="phoneNumber"
                  disabled={!isEditable}
                />
                <TextField
                  label="Address"
                  value={editableUser.address || ''}
                  onChange={handleChange}
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  name="address"
                  disabled={!isEditable}
                />
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    startIcon={<EditIcon />}
                    variant="outlined"
                    onClick={handleEdit}
                    disabled={isEditable}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleSave}
                    disabled={!isEditable}
                  >
                    Save
                  </Button>
                </Box>
              </CardContent>
            </Grid>
          </>
        )}
      </Grid>
    </Card>
  );
};

export default UserProfileCard;
