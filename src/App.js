import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./helper/font-awesome-icons";

import AppNavBar from "../src/components/commons/navbar";
import Login from './components/auth/login';
import TaskList from './components/task/task-list';
import Registration from './components/auth/registration';
import ProtectedRoute from './components/commons/protectedRoute';
import Logout from "./components/commons/logout";
import {checkUserLogin} from "./redux-store/actions/auth-actions";
import AppSideNav from './components/sidenav/side-nav';
import MyCalendar from './components/calendar/my-calendar';
import AppDragDropDemo from './components/task/task-card';


class App extends Component {

  componentDidMount(){
    this.props.checkUserLogin();
  };

  render() {

    return(
      <React.Fragment>
        <div>
          <Row style={{marginLeft:'0px', marginRight:'0px'}}>
            <Col md="3" style={{paddingLeft:'0px'}}>
              <AppSideNav/>
            </Col>
            <Col>
            <div style={{paddingRight:'0px', paddingLeft: '0px'}} className="container-fluid">
              <Switch>
                <Route path="/login" component = {Login}/>
                <Route path="/logout" component = {Logout}/>
                <Route path="/register" component = {Registration}/>
                <ProtectedRoute path="/task-list" component = {AppDragDropDemo} />
                <ProtectedRoute path="/my-calendar" component = {MyCalendar}/>
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

export default connect(null, {checkUserLogin})(App);
