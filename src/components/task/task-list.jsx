import React, { Component } from 'react';
import {connect} from "react-redux";
import {getTasksActionHandler} from "../../redux-store/actions/task-actions";

class TaskList extends Component {
  
   componentDidMount(){
      this.props.getTasksActionHandler();
   }

   render() { 
      // console.log('task list =', this.props.taskList);
      // const {tasks = []} = this.props.taskList; // Default empty array if the tasks are empty
      return (
         
         <div>
            <h1>Task List</h1>
            {/* <ul>
               {this.props.taskList.map(el => (
                  <li className="list-group-item" key={el.id}>
                     {el.title}
                  </li>
               ))}
            </ul>           */}
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
 
export default connect(mapStateToProps, {getTasksActionHandler})(TaskList);