import './App.css';
import axios from 'axios'
import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';
import ContactComponent from './components/ContactComponent';
import LoginComponent from './components/LoginComponent';
import BookCategoryComponent from './components/BookCategoryComponent';
import BookDetatilsComponent from './components/BookDetatilsComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import SearchBookComponent from './components/SearchBookComponent';
import SignUpComponent from './components/SignUpComponent';
import FavoriteComponent from './components/FavoriteComponent';
import ProfileComponent from './components/ProfileComponent';
import CartComponent from './components/CartComponent';
import PaymentResult from './components/PaymentResult';
import { useAuthContext } from './hook/useAuthContext';
import { useLogout } from './hook/useLogout';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { user } = useAuthContext();
  console.log(user)
  const { logout } = useLogout();
  if (user != null && user.token != null) {
    console.log(user.token)
    axios.get('http://localhost:3000/users/checkJsonWebToken',
      {
        headers: {
          authorization: `Bearer ${user.token}`
        }
      })
      .then((res) => {
        console.log("check" + res.data.success)
        if (!res.data.success) {
            logout();
        }
      })
      .catch((err) => {console.log(err)})
  }
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />}></Route>
        <Route path="/About" element={<AboutComponent />}></Route>
        <Route path="/Contact" element={<ContactComponent />}></Route>
        <Route path="/Profile" element={user ? <ProfileComponent /> : <Navigate to="/login" />}></Route>
        <Route path="/Favorites" element={user ? <FavoriteComponent /> : <Navigate to="/login" />}></Route>
        <Route path="/Cart" element={user ? <CartComponent /> : <Navigate to="/login" />}></Route>
        <Route path="/Login" element={<LoginComponent />}></Route>
        <Route path="/Signup" element={<SignUpComponent />}></Route>
        <Route path="/cancel-payment" element={<PaymentResult result={'cancel'} />}></Route>
        <Route path="/success-payment" element={<PaymentResult result={'success'} />}></Route>
        <Route path="/search/:query" element={<SearchBookComponent />} />
        <Route path="/:category" element={<BookCategoryComponent />}></Route>
        <Route path="/Books/:id" element={<BookDetatilsComponent />}></Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>

  );
}

export default App;