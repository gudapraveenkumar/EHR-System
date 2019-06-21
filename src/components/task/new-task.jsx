import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {connect} from "react-redux";
import {addTask} from "../../redux-store/actions/task-actions";

class NewTask extends Component {
   state = { 
      data:{
         title: '',
         completed: false
      }
    }

    handleChange = ({currentTarget: input}) =>{
      const data = {...this.state.data};
      data[input.name] = input.value;
      this.setState({data});
    };

    handleNewTaskSubmit = e =>{
      e.preventDefault();
      this.props.saveNewTask(this.state.data);
    };

    cancel = () =>{
      const data = {...this.state.data};
      data.title = "";
      this.setState({data});
       this.props.onCancel();
    }

   render() { 
      console.log('props in new task =', this.props);
      if(this.props.taskContainer.newTaskCreated){
         this.props.onCancel();
      }
      return ( 
         <div>
            <Form onSubmit={this.handleNewTaskSubmit}>
               <Row className="align-middle">
                  <Col md="auto">
                     <h5>New Tasks</h5>
                  </Col>
                  <Col >
                     <Form.Group controlId="formBasicEmail">
                       
                        <Form.Control type="text" value={this.state.data.title} name="title" onChange={this.handleChange} placeholder="Enter Title" />
                     </Form.Group>
                  </Col>
                  <Col xs={5} sm={5} md={3}>
                     <Button variant="danger" onClick={this.cancel}>Cancel</Button>
                     <Button type="submit" variant="success" style={{marginLeft:'10px'}}>Save</Button>
                  </Col>
               </Row>
               
            </Form>
         </div>
       );
   }
}

const mapDispatchToProps = dispatch =>{
   return{
      saveNewTask: (authData) => dispatch(addTask(authData)),
   }
}

const mapStateToProps = state =>{
   return {
      taskContainer: state.task
   }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(NewTask);