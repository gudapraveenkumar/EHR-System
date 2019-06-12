import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class Authorization extends Component {
   state = { 
      username: '',
      password: ''
    }
   
   render() { 
      return ( 
         <div>

        
         <Card>
            <Card.Body>
               <Card.Title className="text-center">Login</Card.Title>
               <br></br>
               <Card.Text>
               <Form>
                  <Form.Group controlId="formBasicEmail">
                     <Form.Label>Email address</Form.Label>
                     <Form.Control type="email" placeholder="Enter email" />
                     <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                     </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                     <Form.Label>Password</Form.Label>
                     <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                
                  <div style={{textAlign:"right"}}>
                     <Button variant="link">Forgot Password</Button>
                     <Button variant="primary">Submit</Button>
                  </div>
               </Form>
               </Card.Text>
            </Card.Body>
         </Card>
         <div  className="text-center">
            Dont have an account <Button variant="link">Signup</Button>
         </div>
         </div>
       );
   }
}
 
export default Authorization;