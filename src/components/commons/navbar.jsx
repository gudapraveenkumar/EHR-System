import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/task-manager-logo.png';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';


class AppNavBar extends Component {
   
   render() { 
      const userObj = this.props.authObj.userObj;
      console.log(this.props);
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
               <span style={{ marginLeft: '15px'}}>Task Manager</span>
            </Navbar.Brand>
            
            {userObj &&
                 <div>
                     <Link style={{textTransform:'capitalize', marginRight: '15px'}} to="/profile">{userObj.username}</Link>
                     <Link to="/logout">Logout</Link>
                 </div>
              }
         </Navbar>
       );
   }
}


const mapStateToProps = state =>{
   return{
      authObj: state.auth
   }
};

 
export default connect(mapStateToProps)(AppNavBar);