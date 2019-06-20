import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';


class UserDashboard extends Component {
   
   componentDidMount(){
      console.log('Props in dashboard =', this.props);
   }

   render() { 
      return ( 
         <div>
            <h1>Dashboard</h1>
            <Link to="/newTask">NEw Task</Link>
            <Link to="/taskList">Task List</Link>
         </div>
       );
   }
};

const mapStateToProps = state =>{
   return{
      tasks: state.tasks,
      userObj: state.userObj
   }
};


export default connect(mapStateToProps)(UserDashboard);