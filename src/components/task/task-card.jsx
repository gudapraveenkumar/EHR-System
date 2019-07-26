import React, { Component } from 'react';
import TaskDetailsModal from './task-details-dialog';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class TaskCard extends Component {
   state = {
      showTaskDetailsModal: false,
      selectedTask: {}
   }

   taskDetailsHandler = (task) =>{
      this.setState({showTaskDetailsModal:true, selectedTask:task});
   };

   closeTaskDetailsModal = () =>{
      this.setState({showTaskDetailsModal:false, selectedTask:{}});
   };


   render() {
      const task = this.props.task;
      let chipClass = task.priority.name === 'Low'? 'lowp-clr': (task.priority.name === 'Medium'? 'mediump-clr':'highp-clr');
      const chipClassName = 'priority-chip ' + chipClass;

      return (
         <React.Fragment>
             { this.state.showTaskDetailsModal &&
               <TaskDetailsModal taskId={this.state.selectedTask.id}
               show={this.state.showTaskDetailsModal}
               onHide={this.closeTaskDetailsModal}/>
            }

            <div className="task-card"
               draggable
               onClick = {() => this.taskDetailsHandler(task)}
               onDragStart={(e) => this.props.onDragStart(task)}
               >
               {task.title}
               <Row style={{marginTop:'4px'}}>
                  <Col><div className={chipClassName}>
                     {task.priority.name}</div>
                  </Col>
               </Row>

            </div>
         </React.Fragment>
       );
   }
}

export default TaskCard;
