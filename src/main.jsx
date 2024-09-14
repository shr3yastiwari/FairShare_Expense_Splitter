import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Payment from './Payment.jsx'
import Home from './Home.jsx'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-hctpz73p2a8dgtqe.us.auth0.com"
    clientId="SyLcEN8yUu6XvYMloU5s3ivrEjbNWwFk"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={ <Home/>} > </Route>
      < Route path='/group' element={ <App/>} /> 
      <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  </Auth0Provider>
)
