import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {loginActionHandler} from "../../redux-store/actions/auth-actions";
import { connect } from 'react-redux';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, Redirect } from 'react-router-dom';
import LoadingSpinner from "../commons/loading-spinner";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Login extends Component {
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
      const data = {...this.state.loginData}
      if(data.username && data.password){
         this.props.onLogin(this.state.loginData);
      }else{
         toast.warn("Please enter details");
      }
    };

   render() {
      if(this.props.authContainer.userLogin){
         return <Redirect to="/dashboard" />
      };

      const {username, password} = this.state.loginData;
      return (
        <div>
           <Row style={{height:'100vh',background:'#efefef'}} className="d-flex justify-content-center align-items-center">
              <Col className="align-self-center" md={5}>
                  <h2 style={{textAlign:'center'}}><FontAwesomeIcon style={{fontSize:'28px', marginRight:'18px'}} icon="tasks"/>Task Manager</h2>
                  <br></br>
                  <Card>
                     <Card.Body>
                        <Card.Title className="text-center">Login / change asdfas command </Card.Title>
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

                                 <Button type="submit" disabled={this.props.authContainer.apiInProgress} variant="primary">
                                    {this.props.authContainer.apiInProgress && <LoadingSpinner />}
                                    {!this.props.authContainer.apiInProgress && <span>Login</span>}
                                 </Button>
                              </div>
                           </Form>
                     </Card.Body>
                  </Card>
                  <div className="text-center">
                     Don't have an account <Button variant="link"><Link to="/register">Register</Link></Button>
                  </div>
               </Col>
           </Row>
         </div>
       );
   }
};

const mapDispatchToProps = dispatch =>{
   return{
      onLogin: (authData) => dispatch(loginActionHandler(authData)),
   }
};

const mapStateToProps = state =>{
   return { authContainer: state.auth }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
