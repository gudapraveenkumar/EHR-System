import React, { Component } from 'react';
import {connect} from "react-redux";
import {getTasks} from "../../redux-store/actions/task-actions";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TaskDetailsModal from './task-details-dialog';
import './task.scss';
import taskHttpCalls from "../../http-services/task-services";


class TaskList extends Component {

   state = {
      showTaskDetailsModal: false,
      selectedTaskId: '',
      selectedTask: {}
   }

   taskDetailsHandler = (id) =>{
      console.log('task id in list =', id);
      this.setState({showTaskDetailsModal:true, selectedTaskId:id});
   };

   closeTaskDetailsModal = () =>{
      let showTaskDetailsModal = {...this.state};
      showTaskDetailsModal = false;
      this.setState({showTaskDetailsModal});
   };

   componentDidMount(){
      this.props.getTasks();
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

   onDragOver = (ev) =>{
      ev.preventDefault();
   };

   onDragStart = (ev, task) => {
      ev.dataTransfer.setData("id", task.id);
      let selectedTask = {...this.state.selectedTask};
      selectedTask = task;
      this.setState({selectedTask});
   };

   onDrop = (ev, status) => {
      // let id = ev.dataTransfer.getData("id");
      let task = {...this.state.selectedTask};
      task.status = status;
      this.updateTaskHandler(task);

   }

   render() {
       let tasks = this.props.taskContainer.tasks;

      return (
         <div>
            { this.state.showTaskDetailsModal &&
               <TaskDetailsModal taskId={this.state.selectedTaskId}
               show={this.state.showTaskDetailsModal}
               onHide={this.closeTaskDetailsModal}/>
            }

            <Row style={{margin:'15px 0px'}}>
               <Col><h4>My Tasks</h4></Col>
               <Col md="auto">
                  <div className="new-task-btn">
                     New Task
                  </div>
               </Col>
            </Row>

            <Row>
               <Col onDragOver= {(e)=>this.onDragOver(e)} onDrop= {(e) => this.onDrop(e, 1)}>
                  <div style={{border: '1px solid lightgrey', padding:'15px 10px', borderRadius: '4px'}}>
                     <h5>New</h5>
                        {tasks.map(el => {
                           if(el.status === 1){
                              return (
                                 <div className="task-card"
                                    onDragStart={(e)=>this.onDragStart(e, el)}
                                    draggable
                                    onClick={() => this.taskDetailsHandler(el.id)} key={el.id}
                                    >
                                       {el.title}
                                 </div>
                              )
                           }return ''
                        })}
                  </div>
               </Col>

               <Col onDragOver= {(e)=>this.onDragOver(e)} onDrop= {(e) => this.onDrop(e, 2)} style={{padding: '0px 8px'}}>
                  <div style={{border: '1px solid lightgrey', padding:'15px 10px', borderRadius: '4px'}}>
                     <h5>In Progress</h5>
                        {tasks.map(el => {
                           if(el.status === 2){
                              return (
                                 <div className="task-card"
                                    onDragStart={(e)=>this.onDragStart(e, el)}
                                    draggable
                                    onClick={() => this.taskDetailsHandler(el.id)} key={el.id}
                                    >
                                       {el.title}
                                 </div>
                              )
                           }return ''
                        })}
                  </div>

               </Col>

               <Col onDragOver= {(e)=>this.onDragOver(e)} onDrop= {(e) => this.onDrop(e, 3)}>
                  <div style={{border: '1px solid lightgrey', padding:'15px 10px', borderRadius: '4px'}}>
                     <h5>Complete</h5>
                        {tasks.map(el => {
                           if(el.status === 3){
                              return (
                                 <div className="task-card"
                                    onDragStart={(e)=>this.onDragStart(e, el)}
                                    draggable
                                    onClick={() => this.taskDetailsHandler(el.id)} key={el.id}
                                    >
                                       {el.title}
                                 </div>
                              )
                           }return ''
                        })}
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
