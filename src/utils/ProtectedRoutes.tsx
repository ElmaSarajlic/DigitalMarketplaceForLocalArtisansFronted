import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { RootState } from '../store'
import { Box, Typography } from '@mui/material'


const ProtectedRoute = () => {
   const { userToken } = useSelector((state: RootState) => state.auth)

   // shows unauthorized screen if no user is found in redux store
   if (!userToken) {
       return (
           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
               <Typography variant="h2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Unauthorized</Typography>
               <Typography variant="h5" color="text.secondary">
                   <NavLink to='/login'>Login</NavLink> to gain access
               </Typography>
           </Box>
       )
   }

   return <Outlet />
}

export default ProtectedRoute