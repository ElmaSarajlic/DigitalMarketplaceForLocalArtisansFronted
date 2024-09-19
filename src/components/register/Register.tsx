import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Paper, Box, Typography, TextField, Button, Link, Grid, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AppDispatch, RootState } from '../../store';
import { registerUser } from '../../store/authSlice';

export type RegisterFormData = {
    username: string;
    email: string;
    password: string;
    phoneNumber: string; 
}

const schema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    phoneNumber: yup.string().matches(/^[0-9]+$/, "Phone number must be numeric").required("Phone number is required")
}).required();

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: yupResolver(schema)
    });
    const { loading, userToken, error, success } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (success) navigate('/login');
        if (userToken) navigate('/');
    }, [navigate, userToken, success]);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: any) => event.preventDefault();

    const onSubmit = (data: RegisterFormData) => {
        const userData = {
            ...data,
            userType: "REGISTERED" 
        };
        dispatch(registerUser(userData));
    }

    return (
        <Paper elevation={3} sx={{ maxWidth: "360px", padding: 3, mx: "auto", mt: 15, mb: 20 }}>
            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">Sign Up</Typography>
                <Box component="form" sx={{ mt: "5px", width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
                    {/* Username Field */}
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Username"
                        {...register("username")}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    {/* Email Field */}
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Email Address"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    {/* Phone Number Field */}
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Phone Number"
                        {...register("phoneNumber")}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                    />
                    {/* Password Field */}
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Login
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Paper>
    );
};

export default Register;
