import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {addTask} from "../../redux-store/actions/task-actions";
import {connect} from "react-redux";
import taskHttpCalls from "../../http-services/task-services";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class NewTaskModal extends Component {
   state = {
      data:{
         title: '',
         description: '',
         start: new Date(),
         end: new Date(),
         priority: {}
      },
      taskPriorities:[],
      openModal: false
   };

   async componentDidMount(){
      const {data} = await taskHttpCalls.fetchTaskPriorities();
      this.setState({taskPriorities: data.tasks});
   }

   newTaskHandler = () =>{
      let openModal = {...this.state.openModal};
      openModal = true;
      this.setState({openModal});
   };

   closeTaskModel = () =>{
      let openModal = {...this.state.openModal};
      openModal = false;
      this.setState({openModal});
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
      this.closeTaskModel();
   };

   componentWillUnmount(){
      this.abortController.abort()
   };

   render() {


      return (
         <React.Fragment>
            { !this.state.openModal &&
               <div onClick={this.newTaskHandler} className="new-task-btn">
                  New Task
               </div>
            }
            {
               this.state.openModal &&
            <Modal
               onHide = {this.closeTaskModel}
               show = {this.state.openModal}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered
            >

               <Modal.Header closeButton>
                     <Modal.Title id="contained-modal-title-vcenter">
                        New Task
                     </Modal.Title>
               </Modal.Header>

               <Form>
                  <Modal.Body>

                     <Form.Group controlId="taskTitle">
                        <Form.Label>Task Title</Form.Label>
                        <Form.Control type="text"
                           value={this.state.data.title}
                           name="title"
                           onChange={this.handleChange}
                           placeholder="Enter Title" />
                     </Form.Group>

                     <Form.Group controlId="taskDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea"
                        placeholder="Enter Description" rows="3" />
                     </Form.Group>

                     <Form.Row>
                        <Form.Group as={Col} controlId="startDate">
                           <div style={{marginBottom:'10px'}}>Start Date</div>
                           <DatePicker
                              selected={this.state.data.start}
                              onChange={this.handleChange}
                           />
                        </Form.Group>

                        <Form.Group as={Col} controlId="endDate">
                           <div style={{marginBottom:'10px'}}>End Date</div>
                           <DatePicker
                              style={{padding: '4px'}}
                              selected={this.state.data.end}
                              onChange={this.handleChange}
                           />
                        </Form.Group>

                        <Form.Group as={Col} controlId="priority">
                           <Form.Label>Priority</Form.Label>
                           <Form.Control as="select">
                              <option>1</option>
                              <option>2</option>
                           </Form.Control>
                        </Form.Group>

                     </Form.Row>
                     <Form>
                        <Row>
                           <Col>
                           <Form.Group as={Col} controlId="assignee">
                              <Form.Label>Assignee</Form.Label>
                              <Form.Control as="select">
                                 <option>1</option>
                                 <option>2</option>
                              </Form.Control>
                           </Form.Group>
                           </Col>
                           <Col>
                              <Button style={{marginRight: '8px'}} variant="secondary" onClick={this.closeTaskModel}>
                                 Close
                              </Button>
                              <Button variant="success" onClick={this.handleNewTaskSubmit} >
                                 Save
                              </Button>
                           </Col>
                        </Row>


                     </Form>

                  </Modal.Body>

               </Form>
            </Modal>
            }
         </React.Fragment>
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
