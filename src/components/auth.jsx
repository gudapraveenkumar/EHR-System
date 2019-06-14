import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {loginActionHandler} from "../redux-store/actions/root-actions";
import { connect } from 'react-redux';


class Authorization extends Component {
   state = { 
      loginData:{
         username: '',
         password: ''
      }
    }

    handleChange = ({currentTarget: input}) =>{
      const loginData = {...this.state.loginData};
      loginData[input.name] = input.value;

      this.setState({loginData});
    };

    handleLoginSubmit = e =>{
      e.preventDefault();
      console.log('login data =', this.state.loginData);
      this.props.onLogin(this.state.loginData);
    };
   
   render() { 
      const {username, password} = this.state.loginData;
      return ( 
         <div>
         <Card>
            <Card.Body>
               <Card.Title className="text-center">Login</Card.Title>
               <br></br>
               <div>
                  <Form onSubmit={this.handleLoginSubmit}>
                     <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={username} name="username" onChange={this.handleChange} placeholder="Enter username" />
                     </Form.Group>

                     <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} name="password" onChange={this.handleChange} placeholder="Password" />
                     </Form.Group>
                  
                     <div style={{textAlign:"right"}}>
                        <Button variant="link">Forgot Password</Button>
                        <Button type="submit" variant="primary">Submit</Button>
                     </div>
                  </Form>
               </div>
              
            </Card.Body>
         </Card>
         <div  className="text-center">
            Dont have an account <Button variant="link">Signup</Button>
         </div>
         </div>
       );
   }
};

const mapDispatchToProps = dispatch =>{
   return{
      onLogin: (authData) => dispatch(loginActionHandler(authData))
   }
};
 
export default connect(null, mapDispatchToProps)(Authorization);