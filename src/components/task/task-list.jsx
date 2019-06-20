import React, { Component } from 'react';
import {connect} from "react-redux";
import {getTasksActionHandler} from "../../redux-store/actions/task-actions";
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
      this.props.getTasksActionHandler();
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
      // console.log('task list =', this.props.taskList);
      // const {tasks = []} = this.props.taskList; // Default empty array if the tasks are empty
      return (
         
         <Container>
            
            {heading}
            {/* <ul>
               {this.props.taskList.map(el => (
                  <li className="list-group-item" key={el.id}>
                     {el.title}
                  </li>
               ))}
            </ul>           */}
         </Container>
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