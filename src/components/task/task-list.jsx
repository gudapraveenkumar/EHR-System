import React, { Component } from 'react';
import {connect} from "react-redux";
import {getTasks} from "../../redux-store/actions/task-actions";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './task.scss';
import TaskCard from './task-card';
import taskHttpCalls from "../../http-services/task-services";
import NewTaskBtn from '../commons/new-task-btn';


class TaskList extends Component {

   state = {
      selectedTask: {},
   }

   componentDidMount(){
      this.props.getTasks();
   };

   onDragOver = (ev) =>{
      ev.preventDefault();
   };

   updateTaskHandler = async (task) =>{
      try{
         const response = await taskHttpCalls.updateTask(task.id, task);
         console.log('response after updating task =', response);
         this.props.getTasks();
      }catch(error){
         console.log('error =', error);
      }
   }

   onDragStart = (task) => {
      let selectedTask = {...this.state.selectedTask};
      selectedTask = task;
      this.setState({selectedTask});
   };

   onDrop = (status) => {
      let task = {...this.state.selectedTask};
      task.status = status;
      this.updateTaskHandler(task);
   }

   render() {
      let tasks = {
         Backlog: [],
         InProgress: [],
         Completed: []
      }
      this.props.taskContainer.tasks.forEach ((item) => {
            tasks[item.status.name].push(item);
      });

      return (
         <div>
            <Row style={{margin:'15px 0px'}}>
               <Col><h4>My Tasks</h4></Col>
               <Col md="auto">
                  <NewTaskBtn/>
               </Col>
            </Row>

            <Row>
               <Col onDragOver= {(e)=>this.onDragOver(e)} onDrop= {(e) => this.onDrop(1)}>
                  <div className="task-columns">
                     <h5>Backlog</h5>
                        {tasks.Backlog.map(el => {
                              return (
                                <TaskCard key={el.id} task={el} onDragStart={this.onDragStart}/>
                              )
                           }
                        )}
                  </div>
               </Col>

               <Col  onDragOver= {(e)=>this.onDragOver(e)} onDrop= {(e) => this.onDrop(2)} style={{padding: '0px 8px'}}>
                  <div className="task-columns">
                     <h5>In Progress</h5>
                        {tasks.InProgress.map(el => {
                              return (
                                <TaskCard key={el.id} task={el} onDragStart={this.onDragStart}/>
                              )
                           }
                        )}
                  </div>
               </Col>

               <Col onDragOver= {(e)=>this.onDragOver(e)} onDrop= {(e) => this.onDrop(3)}>
                  <div className="task-columns">
                     <h5>Completed</h5>
                        {tasks.Completed.map(el => {
                              return (
                              <TaskCard key={el.id} task={el} onDragStart={this.onDragStart}/>
                              )
                           }
                        )}
                  </div>
               </Col>
            </Row>
         </div>
      )
   }
};

function mapStateToProps(state) {
   return {
     taskContainer: state.task,
     message: state.toastMessage
   };
 }

export default connect(mapStateToProps, {getTasks})(TaskList);
