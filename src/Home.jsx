import React, { useEffect , useState , useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Home.css';
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const { loginWithRedirect , logout , user, isAuthenticated } = useAuth0();
  return (
    <>
    <div className='nav'>
      <div className="logo">
        <div className="logo_img">
          <img src="logo.png" alt="error"></img>
        </div>
        <div className="logo_nam">
          FairShare
        </div>
      </div>
      { isAuthenticated ? (
        <div className='but'>
        <p>{user.name}</p>
        <button className='but1' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
        </button>
        
       </div> 
      ) : (
        <div className='but'>
          <button onClick={() => loginWithRedirect()} className='but1'>Login</button>
          
      </div>
      ) 
      }
      
    </div>
    <div className='main'>
      <div className='text1'>
        <span class="line">Effortless Expense</span>
        <span class="line">Splitting for Every</span>
        <div className='tupe' aria-label="Hi! I'm a developer">
        &nbsp;<span class="typewriter thick"></span>
       </div>
       { isAuthenticated ? (
        <Link to='/group'>
        <button className='gets'>Get Started</button>
        </Link>
      ) : (
        <div className='but'>
          <button onClick={() => loginWithRedirect()} className='but1'>Get Started</button>
          
      </div>
      ) 
      }
      </div>
      
      <div className='grp'>
        <img src="grp.png"></img>
      </div>
    </div>
    </>
  )
}
export default Home;
