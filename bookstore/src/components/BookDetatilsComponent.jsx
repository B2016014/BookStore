import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../hook/useAuthContext';
import CommentComponent from './CommentComponent';

const BookDetatilsComponent = () => {
  const { id } = useParams();
  // const book=BOOKS.filter((item)=>{return item.id==param.id})[0];
  const [book, setBook] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [cartItem, setCartItem] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    console.log(user)
    if (user) {
      console.log(user)
      axios
        .get('http://localhost:3000/favorites', {
          headers: {
            authorization: `Bearer ${user.token}`
          }
        })
        .then((res) => {
          console.log(res.data)
          for (var book of res.data.books) {
            if (book._id == id) {
              setFavorite(true)
              break
            }
          }
        })
        .catch((err) => { console.log("error" + err) });

      axios
        .get('http://localhost:3000/cart', {
          headers: {
            authorization: `Bearer ${user.token}`
          }
        })
        .then((res) => {
          console.log(res.data)
          for (var book of res.data.books) {
            if (book._id == id) {
              setCartItem(true)
              break
            }
          }
        })
        .catch((err) => { console.log("error" + err) });
    }

    axios
      .get(`http://localhost:3000/Books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.log('Error in Fetching the Books');
      });
  }, [user]);


  const handleFavorites = () => {
    if (!user) {
      alert("You have to be logged in to add into favorites");
      return
    }
    axios
      .post(`http://localhost:3000/favorites/${id}`, null, {
        headers: {
          authorization: `Bearer ${user.token}`
        }
      })
      .then((res) => {
        console.log("Added successfully", res);
        setFavorite(true)
      })
      .catch((err) => {
        console.log('Error in Adding the Books' + err);
      });

  }
  const deleteFavorite=(id)=>{
        axios
        .delete(`http://localhost:3000/favorites/${id}`,{
          headers: {
            authorization: `Bearer ${user.token}`
          }
        })
        .then((res)=>{
          setFavorite(false)
          console.log("deleted successfully")
        })
        .catch((err)=>{
          console.log("can't able to delete "+err);
        });
  }

  const handleCart = () => {
    if (!user) {
      alert("You have to be logged in to add into favorites");
      return
    }
    console.log(user.token);
    axios
      .post(`http://localhost:3000/cart/${id}`, null, {
        headers: {
          authorization: `Bearer ${user.token}`
        }
      })
      .then((res) => {
        console.log("Added successfully", res);
        setCartItem(true)
      })
      .catch((err) => {
        console.log('Error in Adding the Books into the cart' + err);
      });

  }
  const deleteCart=()=>{
        axios
        .delete(`http://localhost:3000/cart/${id}`,{
          headers: {
            authorization: `Bearer ${user.token}`
          }
        })
        .then((res)=>{
          setCartItem(false)
          console.log("deleted successfully")
        })
        .catch((err)=>{
          console.log("can't able to delete "+err);
        });
  }
  return (

    <div className="BookDetail">
      <div className="row justify-content-center align-items-center m-5">
        <div className="col-12 col-md-6 d-flex justify-content-center">
          <img src={`http://localhost:3000/${book.image}`} alt={book.title}></img>
        </div>

        <div className="col-12 col-md-6">
          <h1 className='title'>{book.title}<button  onClick={() => favorite ? deleteFavorite() : handleFavorites()}><i className={favorite ? "fa-solid fa-heart fill-heart fs-4 ms-2" : "fa-regular fa-heart null-heart fs-4 ms-2"}></i></button></h1>
          <p className='description '><b className='subtitle'>Description : </b>{book.description}</p>
          <p className='author '><b className='subtitle'>Author : </b>{book.author}</p>
          <p className='price'><b className='subtitle'>Price : </b>&#8377; {book.price}</p>
     
          <button className="btn-succes" onClick={() => cartItem?deleteCart():handleCart()}>
            {
              cartItem ? "In the cart" : "Add to Cart"
            }
          </button>
        </div>
      </div>

      <div className="row">
        <div className='col-12  d-flex justify-content-center'>
          <h4>Reviews</h4>
        </div>
        <div>
          <CommentComponent id={id} />
        </div>

      </div>

    </div>
  )
}

export default BookDetatilsComponent