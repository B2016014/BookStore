import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { NavLink,useParams } from 'react-router-dom'

const Book = ({ Book }) => {
    return (
      <div className="box-2 col-12 col-sm-6 col-md-3 m-4">
        <NavLink to={`/Books/${Book._id}`}>
          <img src={`http://localhost:3000/${Book.image}`} alt={Book.title}></img>
          <p>{Book.title}</p>
        </NavLink>
      </div>
    )
  }

const SearchBookComponent = () => {
  const { query }=useParams()
  const [Books,setBooks]=useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/Books/search/${query}`)
      .then((res) => {
        setBooks(res.data);
        // console.log(Books);
      })
      .catch((err) => {
        console.log('Error in Fetching the Books');
      });
  }, [query]);

  // const filteredBooks=BOOKS.filter((book)=>(book.title.toLowerCase().includes(query.val))|| (book.category.toLowerCase().includes(query.val)))
  return (
    <div>
          <div className="row align-items-center justify-content-center">
              {
                  Books.length==0?<h1 align="center">No Data Found</h1>:
                  Books.map((book) => {
                      return <Book Book={book} />;
                  })
              }
          </div>
    </div>
  )
}

export default SearchBookComponent