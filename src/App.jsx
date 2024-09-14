import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate , Link } from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import './App.css'
import './Home.css'
import Payment from './Payment';
import { useAuth0 } from "@auth0/auth0-react";
const App = () => {
  const [member, setMember] = useState('');
  const [trip, setTrip] = useState('');
  const [members, setMembers] = useState([]);
  // const navigate = useNavigate();

  const { loginWithRedirect , logout , user, isAuthenticated } = useAuth0();
  const handleAddMember = () => {
    if (member.trim() !== '') {
      setMembers([...members, member]);
      setMember('');
    }
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };

  // const handleCreateGroup = () => {
  //   history.push({
  //     pathname: '/group',
  //     state: { tripName: trip, members: members }
  //   });
  // };
  // const handleCreateGroup = () => {
  //   navigate('/group', { state: { tripName: trip, members: members } });
  // };

  return (
    // <Router>
    <>
    <div className='nava'>
      <div className="logo">
        <div className="logo_img">
          <img src="logo.png" alt="error"></img>
        </div>
        <div className="logo_nam">
          FairShare
        </div>
      </div>
      <div className='but'>
          {/* <button className='user'></button> */}
          <p className='us'>{user.name}</p>
      </div>
    </div>
    <div className="splitto-container">
      
      <div className="group-name">
        <label>Trip Name:</label>
        <input
          type="text"
          value={trip}
          onChange={(e) => setTrip(e.target.value)}
          placeholder="Chopta Trip"
        />
      </div>
      <div className="member-input">
        <label>Member Name:</label>
        <input
          type="text"
          value={member}
          onChange={(e) => setMember(e.target.value)}
          placeholder="Enter member name"
        />
        <button className="add-button" onClick={handleAddMember}>
          Add
        </button>
      </div>
      <ul>
        {members.map((m, index) => (
          <li key={index}>
            {m}
            <button className="remove-button" onClick={() => handleRemoveMember(index)}>
              &times;
            </button>
          </li>
        ))}
      </ul>
      <Link to="/payment" state = {{ tripName : trip , mem : members}}>
      <button className="create-group">
          Create a group
        </button>
        </Link >
    </div>
    </>
    // </Router>
    
  );
};

export default App;