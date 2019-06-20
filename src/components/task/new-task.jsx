import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class NewTask extends Component {
   state = { 
      data:{
         title: '',
         completed: true
      }
     
    }

    handleChange = ({currentTarget: input}) =>{
      const data = {...this.state.data};
      data[input.name] = input.value;
      this.setState({data});
    };

    cancel = () =>{
       this.props.onCancel();
    }

   render() { 
      return ( 
         <div>
            <Form onSubmit={this.handleLoginSubmit}>
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
                     <Button variant="success" style={{marginLeft:'10px'}}>Save</Button>
                  </Col>
               </Row>
               
            </Form>
         </div>
       );
   }
}
 
export default NewTask;