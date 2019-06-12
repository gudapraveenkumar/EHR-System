import React, { Component } from 'react';
import {connect} from "react-redux";
import {addTask} from "../redux-store/actions/root-actions";
import { Link } from 'react-router-dom';


class NewTask extends Component {
   state = { 
      title: ""
    };

   componentDidMount(){
      const task = {
         title: "Finish the task"
      }
      this.props.addTask(task);
   }

   render() { 
      return ( 
         <div>
         <h1>New Task</h1>
         <Link to="/userDashboard">Back To Dashboard</Link>
         </div>
         
       );
   }
};

const mapDispatchToProps = dispatch => {
   return {
      addTask: task=> dispatch(addTask(task))
   }
};
 
export default connect(null, mapDispatchToProps)(NewTask);