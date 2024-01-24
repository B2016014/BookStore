import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hook/useAuthContext';
import { useLogout } from '../hook/useLogout';

const HeaderComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuthContext();
  const {logout}=useLogout();
  
  const navigate = useNavigate();

  const search = () => {
    const query = (document.getElementById('search').value).toLowerCase();
    setSearchQuery(query);
    if (query) {
      navigate(`/search/${query}`);
    }
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <header className="mt-2 mb-2">
        <div className="logo">
          <img src="../assets/logo.png" alt="logo"></img>
          <NavLink to="/"  ><span>BookVersa</span></NavLink>
        </div>

        <div className="search">
          <input id="search" name="search" className="form-control"></input>
          <span><button onClick={search}><i className="fa-solid fa-magnifying-glass"></i></button></span>

        </div>

        <div className="Navigation">
          <NavLink to="/"  className="mx-2" >Home</NavLink>
          <NavLink to="/About"  className="mx-2" >About</NavLink>
          <NavLink to="/Contact"  className="mx-2" >Contact</NavLink>
        </div>

        <div>
          <NavLink to='/Cart'><i className="fa-sharp fa-solid fa-cart-shopping mx-3"></i></NavLink>
          <NavLink to='/Favorites'><i className="fa-solid fa-heart mx-3"></i></NavLink>

          {user &&
            (
              <>
                <NavLink to='/Profile'><span className="mx-3">{user.message.username}</span></NavLink> {/* Display the username */}
                <button  onClick={handleLogout}>Logout</button>
              </>
            )
          }
          {!user &&
            (
              <>
                <NavLink to="/Login"><i className="fa-solid fa-right-to-bracket mx-3"></i></NavLink>
                <NavLink to="/Signup"><i className="fa-solid fa-user-plus mx-3"></i></NavLink>
              </>
            )
          }
        </div>

      </header>

      <div className="d-block d-md-none">
        <hr />
      </div>

    </div>
  )
}

export default HeaderComponent



