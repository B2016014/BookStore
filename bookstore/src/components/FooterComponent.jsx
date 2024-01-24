import React from 'react'
import { NavLink } from 'react-router-dom'
const FooterComponent = () => {
  return (
    <div className="footer mt-5">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-3">
          <p className='subheading'><b>Navigation</b></p>
          <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/About'>About</NavLink></li>
            <li><NavLink to='/Contact'>Contact</NavLink></li>
            <li><NavLink to='/'>FAQ</NavLink></li>
          </ul>
        </div>
        <div className="col-12 col-sm-6 col-md-3 ">
          <p  className='subheading'><b>Categories</b></p>
          <ul>
            <li>Medicine</li>
            <li>Engineering</li>
            <li>Biography</li>
            <li>Adventure Novels</li>
          </ul>
        </div>
        <div className="col-12 col-sm-6 col-md-3 ">
          <p  className='subheading'><b>Contact</b></p>
          <address>
            BookVersa Technologies Private Limited,<br />
            No. 78/9, Outer Ring Road, Bengaluru-560103,<br /> Karnataka, India
            <div>
              <a href="tel:98"><i className="fa-solid fa-phone me-3 fs-5"></i></a>
              <a href="mailto:abc@gmail.com"><i className="fa-solid fa-envelope fs-5"></i></a>
            </div>
          </address>
        </div>
        <div className="col-12 col-sm-6 col-md-3 ">
          <div>
            <p  className='subheading'><b>Connect with us</b></p>
            <a href="www.instagram.com"><i className="fa-brands fa-instagram me-3 mb-2 fs-2"></i></a>
            <a href="www.facebook.com"><i className="fa-brands fa-facebook-f me-3 mb-2  fs-2"></i></a>
            <a href="www.twitter.com"><i className="fa-brands fa-twitter me-3 mb-2 fs-3"></i></a>
            <a href="www.youtube.com"><i className="fa-brands fa-youtube mb-2  fs-3"></i></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterComponent