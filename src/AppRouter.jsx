import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Payment from './Payment.jsx'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import './index.css'


const AppRouter = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/group" component={Payment} />
      </Switch>
    </Router>
  );
  
  export default AppRouter;