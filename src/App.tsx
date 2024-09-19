import './App.css'
import { Route, Routes } from 'react-router-dom'
import RegisterForm from './components/register/Register'
import { ThemeProvider, createTheme } from '@mui/material'
import NavBar from './components/NavBar'
import HomePage from './pages/Homepage'
import Footer from './components/footer'
import ItemInfo from './components/ItemInfo'
import LoginForm from './components/login'
import AddArtwork from './components/AddArtwork'
import Cart from './pages/Cart'
import PaymentForm from './components/stripePayment'
import ProtectedRoute from './utils/ProtectedRoutes'
import UserListPage from './pages/UserListPage'
import CreateCategoryPage from './pages/CreateCategory'
import UserProfile from './pages/UserProfile'
import CardUsersList from './components/CardUsersList'
import UpdateArtwork from './components/UpdateArtwork'
import Notifications from './components/notifications'
import SuccessPayment from './components/successPayment'
import WishlistPage from './pages/WishlistPage'
import CancelPayment from './components/cancelPayment'


const theme = createTheme({
  palette: {
    primary: {
      main:'#262254', 
    },
    secondary: {
      main: '#543884', 
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#000000',
    },
    text: {
      primary: '#333',
      secondary: '#000000',
    },
  }})


function App() {
  return (
    <ThemeProvider theme={theme}>
            <NavBar />
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <main style={{ flexGrow: 1 }}>
  <Routes>
  <Route path="/" element={<HomePage />} />
    <Route path="/register" element={<RegisterForm />} />
    <Route path="/homepage" element={<HomePage />} />
    <Route path="/iteminfo/:id" element={<ItemInfo />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/category/:categoryName" element={<HomePage />} />

    <Route element={<ProtectedRoute />}>
    <Route path="/usersart" element={<CardUsersList />} />
    <Route path="/updateartwork/:id" element={<UpdateArtwork />} />
    <Route path="/successPayment" element={<SuccessPayment />} />
    <Route path="/wishlist" element={<WishlistPage />} />
    <Route path="/cancelPayment" element={<CancelPayment />} />
    <Route path="/userprofile" element={<UserProfile />} />
    <Route path="/addartwork" element={<AddArtwork />} />
    <Route path="/cart" element={ <Cart/>} />
    <Route path="/payment" element={<PaymentForm />} /> 
    <Route path="/userlist" element={<UserListPage />} /> 
    <Route path="/createcategories" element = {<CreateCategoryPage />} /> 
    <Route path="/notifications" element={<Notifications />} />



    </Route>

  </Routes>
  </main>
    </div>
    <Footer />
  </ThemeProvider>
  
  )
}

export default App
