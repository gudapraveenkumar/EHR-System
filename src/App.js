import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./helper/font-awesome-icons";

import Login from './components/auth/login';
import TaskList from './components/task/task-list';
import Registration from './components/auth/registration';
import ProtectedRoute from './components/commons/protectedRoute';
import Logout from "./components/commons/logout";
import {checkUserLogin} from "./redux-store/actions/auth-actions";
import AppSideNav from './components/sidenav/side-nav';
import MyCalendar from './components/calendar/my-calendar';
import Dashboard from './components/dashboard/dashboard';
import ChangePassword from './components/profile/change-password';


class App extends Component {

  componentDidMount(){
    this.props.checkUserLogin();
  };

  render() {

    return(
      <React.Fragment>
        <div>
          <Row style={{marginLeft:'0px', marginRight:'0px'}}>
            {
                this.props.authContainer.userLogin &&
                <Col md="2.7" style={{paddingLeft:'0px', height:'100vh'}}>
                  <AppSideNav/>
                </Col>
            }

            <Col style={{height:'100vh', overflow: 'auto'}}>
            <div style={{paddingRight:'0px', paddingLeft: '0px', height:'100%'}} className="container-fluid">
              <Switch>
                <Route path="/login" component = {Login}/>
                <Route path="/logout" component = {Logout}/>
                <Route path="/register" component = {Registration}/>
                <ProtectedRoute path="/task-list" component = {TaskList} />
                <ProtectedRoute path="/my-calendar" component = {MyCalendar}/>
                <ProtectedRoute path="/dashboard" component = {Dashboard}/>
                <ProtectedRoute path="/change-password" component = {ChangePassword} />
                <Route path="/" exact component = {Login}/>
              </Switch>
            </div>
            </Col>
          </Row>
        </div>
      {/* <AppNavBar /> */}

      <ToastContainer />
    </React.Fragment>
    )

  }
}

const mapStateToProps = state =>{
  return { authContainer: state.auth }
}

export default connect(mapStateToProps, {checkUserLogin})(App);
