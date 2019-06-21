import React, { Component } from 'react';
import {connect} from "react-redux";
import {getTasks} from "../../redux-store/actions/task-actions";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import NewTask from './new-task';

class TaskList extends Component {

   state = {
      newTask: false
   }
  
   componentDidMount(){
      this.props.getTasks();
   }

   goToNewTask = () =>{
      let newTask = {...this.state};
      newTask = true;
      this.setState({newTask});
   }

   handleCancel = () =>{
      console.log('cancel');
      let newTask = {...this.state};
      newTask = false;
      this.setState({newTask});
   }

   render() { 
      let tasks = this.props.taskContainer.tasks;
      let heading = (
            <Row>
               <Col>
                  <h5>My Tasks</h5>
               </Col>
               <Col xs={5} sm={4} md={2}>
                  <Button onClick={this.goToNewTask} variant="primary">New Task</Button>
               </Col>
            </Row>
      )
      if(this.state.newTask){
         heading = <NewTask onCancel={this.handleCancel}/>
      }
   
      return (
         <Container>
            
            {heading}
            <ul>
               {tasks.map(el => (
                  <li className="list-group-item" key={el.id}>
                     {el.title}
                  </li>
               ))}
            </ul>          
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