import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {addTask} from "../../redux-store/actions/task-actions";
import {connect} from "react-redux";


class NewTaskModal extends Component {
   state = {
      data:{
         title: '',
         completed: false
      }
   };

   abortController = new AbortController();

   handleChange = ({currentTarget: input}) =>{
      const data = {...this.state.data};
      data[input.name] = input.value;
      this.setState({data});
   };

   handleNewTaskSubmit = e =>{
      e.preventDefault();
      this.props.saveNewTask(this.state.data);
      this.props.onHide();
   };

   componentWillUnmount(){
      this.abortController.abort()
   }

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
                     New Task
                  </Modal.Title>
            </Modal.Header>

            <Form>
               <Modal.Body>
                  <h5>Enter Task Title</h5>
                  <Form.Group controlId="formBasicEmail">
                     <Form.Control type="text" value={this.state.data.title} name="title" onChange={this.handleChange} placeholder="Enter Title" />
                  </Form.Group>
               </Modal.Body>

               <Modal.Footer>
               <Button variant="secondary" onClick={this.props.onHide}>
                  Close
                  </Button>
                  <Button variant="success" onClick={this.handleNewTaskSubmit} >
                  Save
                  </Button>
               </Modal.Footer>

            </Form>
         </Modal>
       );
   }
}


const mapDispatchToProps = dispatch =>{
   return{
      saveNewTask: (taskData) => dispatch(addTask(taskData)),
   }
}

const mapStateToProps = state =>{
   return {
      taskContainer: state.task
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskModal);
