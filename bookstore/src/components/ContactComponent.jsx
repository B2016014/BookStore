import React from 'react'

const ContactComponent = () => {
  return (
    <div className='contact'>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <h1>Contact Us</h1>
          <p>At Bookversa, we're excited to connect with our readers and provide assistance whenever you need it. Reach out to us through any of the following methods, and we'll be sure to get back to you promptly.</p>
          <h2>Let's Chat</h2>
          <p>Got a question, feedback, or just want to chat about books? We're all ears! Our team is ready to assist you.</p>
        </div>
        <div className='col-12 col-md-6' align="center">
          <iframe className="ms-5" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.594347586359!2d77.61633731019812!3d12.933773515654723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1450087a6a87%3A0x7198f7ea21d2dbc6!2sBOOKSTOP*21%20The%20Bookstore%20in%20Koramangala!5e0!3m2!1sen!2sin!4v1692716182730!5m2!1sen!2sin" width="350" height="300" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

      <div className='row'>
          <div className='contact-card'>
            <h5 className='title'>Email</h5>
            <input type='text' placeholder='objective' value="BookVersa [objective]" ></input>
            <textarea placeholder='Enter your text...' rows={4}></textarea>
            <a href='#'><i class="fa-solid fa-paper-plane"></i></a>
          </div>
          <div className='contact-card'>
            <h5 className='title'>Make a Call</h5>
            <p className='ps-2'>If you need immediate assistance or prefer to speak with us directly,give us a call:</p>
            <a href='tel:+1234567890'><i class="fa-solid fa-phone"></i>(123)456-7890</a>
          </div>
        </div>
    </div>
  )
}

export default ContactComponent