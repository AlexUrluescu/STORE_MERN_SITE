
import React from 'react'
import myImage from "../static/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
        <div className='footer_logo'><img src={myImage} alt='logo'></img></div>
        <p>Created by Madalina Pantea</p>
        <div className='footer_logo'><img src={myImage} alt='logo'></img></div>
    </footer>
  )
}

export default Footer