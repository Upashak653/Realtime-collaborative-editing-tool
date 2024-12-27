import React, { useEffect } from 'react'
import '../css/Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='hero'>
        <div className="hero-content">
            <h1 className='hero-text'>Document</h1>
            <p className='hero-description'>
                Document posting app
            </p>
             <Link to='/upload' className='btn' aria-label="Upload document"> Upload
             </Link>
                     </div>
        <div className="hero-image"></div>
        
    </div>
  )
}

export default Home