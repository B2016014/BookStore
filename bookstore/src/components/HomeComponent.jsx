import React  from 'react'
import BookComponent from './BookComponent';

const HomeComponent = () => {

  return (
    <div>
        <div className="jumbotron">
            <div className="jumbotron-content">
               <p>Find your next adventure, gain knowledge, and experience the magic of words at BookVersa.</p>
            </div>
        </div>
        
        <div className="mt-10">
          <BookComponent/>
        </div>
      
    </div>



  )
}

export default HomeComponent