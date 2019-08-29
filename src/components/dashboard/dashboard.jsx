import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import {getTasks} from "../../redux-store/actions/task-actions";
import {connect} from "react-redux";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DashboardCard from './dashboard-cards';
import '../task/task.scss';
import './dashboard.scss';
import DashboardTaskCard from './dashboard-task-card';
import TaskModal from '../task/task-modal';

class Dashboard extends Component {

   componentDidMount(){
      this.props.getTasks();
   }

   state = {
      showTaskDetailsModal: false,
      selectedTask: {}
   };

   taskDetailsHandler = (task) =>{
      this.setState({showTaskDetailsModal:true, selectedTask:task});
   };

   closeTaskDetailsModal = () =>{
      this.setState({showTaskDetailsModal:false, selectedTask:{}});
   };

   render() {

      let tasks = this.props.taskContainer.tasks;

      return (
         <div style={{marginTop:'10px'}}>

             { this.state.showTaskDetailsModal &&

               <TaskModal
                  taskId={this.state.selectedTask.id}
                  isNewTask={false}
                  closeModal={this.closeTaskDetailsModal}
                  openModal={this.state.showTaskDetailsModal}/>
               }

            <Row className="d-flex align-items-center">
               <Col>
                  <DashboardCard title= "Today's Tasks" icon={['far', 'calendar']} count="11"/>
               </Col>
               <Col>
                  <DashboardCard title= "Backlog Tasks" icon="clipboard-list" count="05"/>
               </Col>
               <Col>
                  <DashboardCard title= "Tasks InProgress" icon="briefcase" count="12"/>
               </Col>
               <Col>
                  <Card>
                     <Card.Body style={{padding: '8px 15px 2px 15px'}}>
                        <div className="priority-task-count">
                           <div style={{height:'fit-content'}} className="priority-chip lowp-clr">Low</div>
                           <div>12</div>
                        </div>

                        <div className="priority-task-count">
                           <div style={{height:'fit-content'}} className="priority-chip mediump-clr">Medium</div>
                           <div>12</div>
                        </div>

                        <div className="priority-task-count" style={{borderBottom:'0px', marginBottom:'0px'}}>
                           <div style={{height:'fit-content'}} className="priority-chip highp-clr">High</div>
                           <div>12</div>
                        </div>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>

            <Card style={{marginTop:'10px'}}>
               <Card.Header as="h5">Today's Tasks</Card.Header>
               <Card.Body>
                  {tasks.map(item => {
                     if(item.status.id === 1){
                        return (
                           <div key={item.id}>
                              <DashboardTaskCard openTask={() => this.taskDetailsHandler(item)} task={item}/>
                           </div>
                        )
                     }return ''
                  })}
               </Card.Body>
            </Card>
            <Card style={{marginTop:'10px'}}>
               <Card.Header as="h5">Upcoming Tasks</Card.Header>
               <Card.Body>
                  {tasks.map(item => {
                     if(item.status.id === 2){
                        return (
                           <div key={item.id}>
                              <DashboardTaskCard openTask={() => this.taskDetailsHandler(item)} task={item}/>
                           </div>
                        )
                     }return ''
                  })}
               </Card.Body>
            </Card>
         </div>

       );
   }
}

function mapStateToProps(state) {
   return {
     taskContainer: state.task,
     message: state.toastMessage
   };
 }

export default connect(mapStateToProps, {getTasks})(Dashboard);
