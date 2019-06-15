import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {loginActionHandler} from "../../redux-store/actions/auth-actions";
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, Redirect } from 'react-router-dom';



class Login extends Component {
   state = { 
      loginData:{
         username: '',
         password: ''
      },
      redirect: false
    }

    handleChange = ({currentTarget: input}) =>{
      const loginData = {...this.state.loginData};
      loginData[input.name] = input.value;
      this.setState({loginData});
    };

    handleLoginSubmit = e =>{
      e.preventDefault();
      this.props.onLogin(this.state.loginData, this.props);
      let redirect = {...this.state};
      redirect = true;
      this.setState({redirect});
    };
   
   render() { 
      // if(this.state.redirect){
      //    return <Redirect to="/taskList" />
      // };
      
      const {username, password} = this.state.loginData;
      return ( 
        <Container>
           <Row className="justify-content-center">
              <Col xs={10} sm={8} md={5}>
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
                                 <Button type="submit" variant="primary">Login</Button>
                              </div>
                           </Form>
                        </div>
                     </Card.Body>
                  </Card>
                  <div  className="text-center">
                     Dont have an account <Button variant="link"><Link to="/register">Register</Link></Button>
                  </div>
               </Col>
            </Row>
         </Container>
       );
   }
};

const mapDispatchToProps = dispatch =>{
   return{
      onLogin: (authData, ownProps) => dispatch(loginActionHandler(authData, ownProps))
   }
};
 
export default connect(null, mapDispatchToProps)(Login);