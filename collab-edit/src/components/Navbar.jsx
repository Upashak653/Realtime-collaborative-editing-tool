import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = ({ user, users }) => {
  const onlineUsers = users?.length || 0;
  const [openedUserTab,setOpenedUserTab]=useState(false)
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/home" className="navbar-brand">
          Home
        </NavLink>
      </div>
      <div className="navbar-right">
        <NavLink to="/users"><button 
        className='btn'
        style={{display:"block",top:"5%",left:"5%"}}>User</button></NavLink>
        <span className="navbar-link">
          {user ? `Welcome, ${user.username}` : 'No user logged in'}
        </span>
        <span className="navbar-link">
          User Online: {onlineUsers}
        </span>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'navbar-link active' : 'navbar-link'
          }
        >
          Forms
        </NavLink>
        <NavLink
          to="/upload"
          className={({ isActive }) =>
            isActive ? 'navbar-link active' : 'navbar-link'
          }
        >
          Upload
        </NavLink>
        <NavLink
          to="/documents"
          className={({ isActive }) =>
            isActive ? 'navbar-link active' : 'navbar-link'
          }
        >
          Documents
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
