import React, { Component } from 'react';
import {connect} from "react-redux";
import {getTasks} from "../../redux-store/actions/task-actions";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import TaskDetailsModal from './task-details-dialog';

class TaskList extends Component {
   
   state = {
      showTaskDetailsModal: false,
      selectedTaskId: ''
   }

   taskDetailsHandler = (id) =>{
      console.log('task id in list =', id);
      let {showTaskDetailsModal, selectedTaskId} = {...this.state};
      selectedTaskId = id;
      showTaskDetailsModal = true;
      this.setState({showTaskDetailsModal, selectedTaskId});
   }

   closeTaskDetailsModal = () =>{
      let showTaskDetailsModal = {...this.state};
      showTaskDetailsModal = false;
      this.setState({showTaskDetailsModal});
   }
  
   componentDidMount(){
      this.props.getTasks();
   }

   render() { 
      let taskDetailsModal = (<div></div>)
      let tasks = this.props.taskContainer.tasks;
      if(this.state.showTaskDetailsModal){
         taskDetailsModal = <TaskDetailsModal taskId={this.state.selectedTaskId} show={this.state.showTaskDetailsModal} onHide={this.closeTaskDetailsModal}/>
      }
     

      return (
         <Container>
            {taskDetailsModal}
            <br></br>
            <Row>
               <Col>
                  <Card style={{'height':'100%'}}>
                     <Card.Body>
                        <Card.Title>
                           New Tasks
                        </Card.Title>
                     
                        <ListGroup>
                           {tasks.map(el => {
                              if(el.status === 1){
                                 return <ListGroup.Item onClick={() => this.taskDetailsHandler(el.id)} key={el.id}>
                                 {el.title}
                              </ListGroup.Item>
                              }return ''
                           })}
                           
                           </ListGroup>
                       
                     </Card.Body>
                  </Card>
               </Col>
               <Col>
                  <Card>
                  <Card.Body>
                     <Card.Title>
                        Tasks In Progress
                     </Card.Title>
                     <ListGroup>
                           {tasks.map(el => {
                              if(el.status === 2){
                                 return <ListGroup.Item onClick={() => this.taskDetailsHandler(el.id)} key={el.id}>
                                 {el.title}
                              </ListGroup.Item>
                              }return ''
                           })}
                           
                           </ListGroup>
                     </Card.Body>
                  </Card>
               </Col>
               <Col>
                  <Card>
                  <Card.Body>
                     <Card.Title>
                        Tasks Completed
                     </Card.Title>
                     <ListGroup>
                           {tasks.map(el => {
                              if(el.status === 3){
                                 return <ListGroup.Item onClick={() => this.taskDetailsHandler(el.id)} key={el.id}>
                                 {el.title}
                              </ListGroup.Item>
                              }return ''
                           })}
                           
                           </ListGroup>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>       
         </Container>
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