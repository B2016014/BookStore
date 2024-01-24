import React, { useContext, useState,useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const Book = ({ Book }) => {
  return (
    <div className="box-2 col-12 col-sm-6 col-md-3 m-4">
      <NavLink to={`/Books/${Book._id}`}>
        <img src={`http://localhost:3000/${Book.image}`} alt={Book.title}></img>
        <p className='title'>{Book.title}</p>
      </NavLink>
    </div>
  )
}
const BookCategoryComponent = ( ) => {
  const [Books,setBooks]=useState([]);
  const {category} = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/Books/category/${category}`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log('Error in Fetching the Books');
      });
  }, []);
  // const filteredBooks = BOOKS.filter((item) => item.category == param.category);
  return (
    <div>
      <h1 align="center" className="category">{category}</h1>
      <div className="row align-items-center justify-content-center">
        {
        Books.map((book) => {
          return <Book Book={book}/>;
        })
        }
      </div>
    </div>
  )
}

export default BookCategoryComponent