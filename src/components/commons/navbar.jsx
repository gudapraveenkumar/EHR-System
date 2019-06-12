import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/task-manager-logo.png';

const AppNavBar = () => {
   const appName = {
      marginLeft: '15px'
   }
   return ( 
      <Navbar bg="light" className="bg-light justify-content-between" variant="light">
         <Navbar.Brand href="#home">
            <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            />
            <span style={appName}>Task Manager</span>
         </Navbar.Brand>
      </Navbar>
    );
}
 
export default AppNavBar;