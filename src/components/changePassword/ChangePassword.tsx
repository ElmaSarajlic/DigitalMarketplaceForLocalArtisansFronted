import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import useUpdateUserPassword from '../../hooks/useChangePassword';
import EditIcon from '@mui/icons-material/Edit';


const PasswordChangeForm = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);
    const [error, setError] = useState('');

    const userId = useSelector((state: RootState) => state.auth.userId);
    const updateUserPassword = useUpdateUserPassword();

    const handleEdit = () => {
        setIsEditable(true);
        setIsPasswordChanged(false); 
        setError(''); 
    };

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("All fields must be filled.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }
        if (newPassword === currentPassword) {
            setError("New password must be different from the current password.");
            return;
        }
        if (userId) {
            try {
                await updateUserPassword.mutateAsync({
                    id: userId,
                    password: {
                        oldPassword: currentPassword,
                        newPassword,
                        userId: undefined
                    }
                });
                setIsEditable(false);
                setIsPasswordChanged(true);
                setError('');
                window.location.reload
            } catch (error) {
                setIsPasswordChanged(false);
                setError( "Failed to change password.");
            }
        } else {
            setError("User ID is not defined.");
        }
    };

    return (
        <Box sx={{
            mb: 100,
            backgroundColor: 'white',
            padding: '20px',
            overflow: 'visible',
            maxWidth: 810,
            margin: 'auto',
            borderRadius: '4px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
            <Typography variant="subtitle1" gutterBottom>Change Password</Typography>
            {error && <Typography color="error">{error}</Typography>}
            {isPasswordChanged && <Typography color="primary">Password successfully updated.</Typography>}
            <TextField
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                margin="dense"
                fullWidth
                variant="outlined"
                disabled={!isEditable}
            />
            <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                margin="dense"
                fullWidth
                variant="outlined"
                disabled={!isEditable}
            />
            <TextField
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="dense"
                fullWidth
                variant="outlined"
                disabled={!isEditable}
            />
            {!isEditable && (
                <Button
                    startIcon={<EditIcon />}
                    variant="outlined"
                    onClick={handleEdit}
                    sx={{ mt: 2 }}
                >
                    Edit
                </Button>
            )}
            {isEditable && (
                <Button
                    variant="contained"
                    onClick={handleChangePassword}
                    sx={{ mt: 2 }}
                >
                    Change Password
                </Button>
            )}
        </Box>
    );
};

export default PasswordChangeForm;
