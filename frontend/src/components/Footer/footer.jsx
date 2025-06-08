import React from 'react'
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer' id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
            {/* <img src={assets.logo} alt="" /> */}
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis velit harum iure delectus voluptatibus facere aperiam modi quos. Eaque, voluptates quos. Suscipit adipisci corrupti aliquid placeat eius deleniti, atque fugiat.</p>
            <div className="footer-social-icons">
                <img src='/facebook_icon.png' alt="" />
                <img src='./twitter_icon.png' alt="" />
                <img src='./linkedin_icon.png' alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2 style={{color: 'white'}}>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2 style={{color: 'white'}}>GET IN TOUCH</h2>
            <ul>
                <li>+1-212-456-7890</li>
                <li>contact@xyz.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>Copyright 2024 &copy; xyz.com - All Right Reserved.</p>
      
    </div>
  )
}

export default Footer
