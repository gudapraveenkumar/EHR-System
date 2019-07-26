import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {getTasks} from "../../redux-store/actions/task-actions";
import {connect} from "react-redux";
import taskHttpCalls from "../../http-services/task-services";

class TaskDetailsModal extends Component {
   state = {
      data:{
         title: '',
         completed: false,
         status: ''
      }
   };

   async componentDidMount(){

      await this.populateTaskDetails();
   }

   async populateTaskDetails(){
      try{
         const response = await taskHttpCalls.fetchTaskById(this.props.taskId);
         const data = response.data.task;
         this.setState({data});

      }catch(error){
         console.log('error =', error);
      }
   };

   deleteTaskHandler = async () => {
      try{
         const response = await taskHttpCalls.deleteTask(this.props.taskId);
         console.log('response after delete task =', response);
         this.props.getTasks();
         this.props.onHide();
      }catch(error){
         console.log('error', error);
      }
   };

   updateTaskHandler = async () =>{
      try{
         const data = {
            'title': this.state.data.title,
            'status': parseInt(this.state.data.status)
         };
         const response = await taskHttpCalls.updateTask(this.props.taskId, data);
         console.log('response after updating task debba=', response);
         this.props.getTasks();
         this.props.onHide();
      }catch(error){
         console.log('error =', error);
      }
   }

   handleChange = ({currentTarget: input}) =>{
      const data = {...this.state.data};
      data[input.name] = input.value;
      this.setState({data});
   };


   render() {

      return (
         <Modal
         onHide = {this.props.onHide}
         show = {this.props.show}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered>

            <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                     Task Details
                  </Modal.Title>
            </Modal.Header>

            <Form>
               <Modal.Body>
                  <h6>Task Title</h6>
                  <Form.Group controlId="title">
                     <Form.Control type="text" value={this.state.data.title} name="title" onChange={this.handleChange} placeholder="Enter Title" />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                     <Form.Label>Update Task Status</Form.Label>
                     <Form.Control value={this.state.data.status} name="status" onChange={this.handleChange} as="select">
                        <option value="1">New Task</option>
                        <option value="2">Task In Progress</option>
                        <option value="3">Task Completed</option>
                     </Form.Control>
                  </Form.Group>
               </Modal.Body>

               <Modal.Footer>

                  <Button variant="danger" onClick={this.deleteTaskHandler}>
                     Delete
                  </Button>
                  <Button variant="success" onClick={this.updateTaskHandler} >
                     Update
                  </Button>
               </Modal.Footer>

            </Form>
         </Modal>
       );
   }
}


const mapDispatchToProps = dispatch =>{
   return{
      getTasks: () => dispatch(getTasks()),
   }
}

const mapStateToProps = state =>{
   return {
      taskContainer: state.task
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailsModal);
