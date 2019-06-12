import React, { Component } from 'react';
import {connect} from "react-redux";
import {getTasks} from "../redux-store/actions/root-actions";

class TaskList extends Component {
   constructor(){
      super();
   }

   componentDidMount(){
      this.props.getTasks();
      console.log('toast messgae=', this.props.message);
   }

   render() { 
      console.log('length =', this.props.taskList[0]);
      console.log('task list =', this.props.taskList);
      return (
         <div>
            <h1>Task List</h1>
            <ul>
               {this.props.taskList.map(el => (
                  <li className="list-group-item" key={el.id}>
                     {el.title}
                  </li>
               ))}
            </ul>          
         </div>
      )
   }
};

function mapStateToProps(state) {
   return {
     taskList: state.tasks,
     message: state.toastMessage
   };
 }
 
export default connect(mapStateToProps, {getTasks})(TaskList);