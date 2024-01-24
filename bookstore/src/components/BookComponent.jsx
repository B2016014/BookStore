import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios'

const BookSublist =({domain,subdomain}) =>{
    return(
                <div className="box col-12 col-sm-6 col-md-3 m-4">
                    <NavLink to={`/${subdomain}`}>
                        <img src={`http://localhost:3000/images/${domain}/${subdomain}.png`}></img>
                        <p className='subcategory'>{subdomain}</p>
                    </NavLink>
                </div>
            
    )
}
const Booklist =({domain,books}) =>{
    const subdomains = [...new Set(books.filter(book => book.domain === domain).map(book => book.category))];
    return(
        <div className="my-5">
            <div align="center" className="category"><b>{domain}</b></div>
            <div className="row justify-content-center align-items-center">
                    {
                        subdomains.map((category)=>{
                            return <BookSublist domain={domain} subdomain={category}/>;
                        })
                    }
            </div>
        </div>
    )
}

const BookComponent = () => {
  const [books,setBooks]=useState([]);
  const [domains,setDomains]=useState([]);
  const [error,setError]=useState(null);

  useEffect(()=>{
    axios
      .get("http://localhost:3000/Books")
      .then((res) => {
        setBooks(res.data);
        const uniqueDomains=[...new Set((res.data).map((book) => book.domain))]
        setDomains(uniqueDomains)
      })
      .catch((err) => {
        setError(err);
        console.log('Error in Fetching the Books');
      });
  },[])

  return (
    <div>

        {
            domains.map((domain) => {
                return <Booklist domain={domain} books={books}/>;
            })
        }
        
    </div>
  )
}

export default BookComponent






 {/* {
            domains.map((item,index)=>{
                return( <div key={index}>{item}</div>);
            }
            )
        } */}