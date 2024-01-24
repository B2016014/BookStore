import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useAuthContext } from '../hook/useAuthContext'


const CartComponent = () => {
  const { user } = useAuthContext();
  const [cart, setCart] = useState([])
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (!user) {
      alert("please login to view your cart");
    }
    else {
      console.log(user);
      axios.get('http://localhost:3000/cart', {
        headers: {
          authorization: `Bearer ${user.token}`
        }
      })
        .then((res) => {
          console.log(res.data.books)
          setCart(res.data.books)
          calculateSubtotal(res.data.books);
        })
        .catch((error) => {
          console.log("error while fetching your cart" + error);
        });
    }
  }, [user])

  const calculateSubtotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.count * item.book.price;
    });
    setSubtotal(total);
  };

  const handleQuantiy = (id, count) => {
    if (count == 0) {
      handleRemoval(id)
    }
    else {
      axios
        .post(`http://localhost:3000/cart/bookInc/${id}`, { count }, {
          headers: {
            authorization: `Bearer ${user.token}`
          }
        })
        .then((res) => {
          setCart(res.data.books)
          calculateSubtotal(res.data.books);
          console.log("incremented successfully")
        })
        .catch((err) => {
          console.log("Not incremented " + err);
        });
    }
  }

  const handleRemoval = (id) => {
    axios
      .delete(`http://localhost:3000/cart/${id}`, {
        headers: {
          authorization: `Bearer ${user.token}`
        }
      })
      .then((res) => {
        setCart(res.data.books)
        console.log("deleted successfully")
      })
      .catch((err) => {
        console.log("can't able to delete " + err);
      });
  }

  const handleCheckOut=()=>{
    axios
      .post('http://localhost:3000/stripe/create-checkout-session', {cart},{
        headers: {
          authorization: `Bearer ${user.token}`
        }
      })
      .then((res) => {
        if(res.data.url){
          window.location.href=res.data.url;
        }
      })
      .catch((err) => {
        console.log("error in checkout " + err);
      });
  }
  return (
    <div>
      <div className="row align-items-center justify-content-center">
        {
          cart && cart.length > 0 ? (
            <>
              {cart.map((item) => {
                return (
                  <div className='row cart mb-5'>
                    <div className='col-12 col-sm-6 col-md-3' align="center">
                      <button onClick={() => { handleRemoval(item.book._id) }} className='fs-2 me-4'>x</button>
                      <NavLink to={`/Books/${item.book._id}`}>
                        <img src={`http://localhost:3000/${item.book.image}`} alt={item.book.title}></img>
                        {/* <p className='title'>{item.book.title}</p> */}
                      </NavLink>
                    </div>

                    <div className='col-12 col-sm-6 col-md-3' align="center">
                      <h3>{item.book.price}</h3>
                    </div>

                    <div className='col-12 col-sm-6 col-md-3 quantity' align="center">
                      <table>
                        <tr>
                          <td><button onClick={() => handleQuantiy(item.book._id, item.count + 1)}>+</button></td>
                          <td><button>{item.count}</button></td>
                          <td><button onClick={() => handleQuantiy(item.book._id, item.count - 1)}>-</button></td>
                        </tr>
                      </table>
                    </div>

                    <div className='col-12 col-sm-6 col-md-3' align="center">
                      <h3>{(item.count * item.book.price).toFixed(2)}</h3>
                    </div>
                  </div>
                )
              })}
              <div align="center">
                <h4>Subtotal: <span>{(subtotal).toFixed(2)}</span></h4>
                <button class="btn-succes" onClick={handleCheckOut}>Checkout</button>
              </div>
            </>
          )

            : (<div align="center">No cart</div>)
        }
      </div>
    </div>
  )
}

export default CartComponent

