import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useAuthContext } from '../hook/useAuthContext'



const FavoriteComponent = () => {
  const { user } = useAuthContext();
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (!user) {
      alert("please login to view your favorites");
    }
    else {
      console.log(user);
      axios.get('http://localhost:3000/favorites', {
        headers: {
          authorization: `Bearer ${user.token}`
        }
      })
        .then((res) => {
          setFavorites(res.data.books)
        })
        .catch((error) => {
          console.log("error while fetching your favorites" + error);
        });
    }
  }, [user])

  const handleRemoval=(id)=>{
        axios
        .delete(`http://localhost:3000/favorites/${id}`,{
          headers: {
            authorization: `Bearer ${user.token}`
          }
        })
        .then((res)=>{
          setFavorites(res.data.books)
          console.log("deleted successfully")
        })
        .catch((err)=>{
          console.log("can't able to delete "+err);
        });
  }

  return (
    <div>
      <div className="row align-items-center justify-content-center">
        {
          favorites && favorites.length > 0 ?
            (favorites.map((book) => {
              // return <Book Book={book}/>;
              return (
                <div className="box-2 col-12 col-sm-6 col-md-3 m-4 delete-parent">
                  <NavLink to={`/Books/${book._id}`}>
                    <img src={`http://localhost:3000/${book.image}`} alt={book.title}></img>
                    <p className='title'>{book.title}</p>
                  </NavLink>
                  <button className="delete btn" onClick={() => handleRemoval(book._id)}>x</button>
                </div>
              )
            }))
           :(<div align="center">No favorites</div>)
        }
      </div>
    </div>
  )
}

export default FavoriteComponent