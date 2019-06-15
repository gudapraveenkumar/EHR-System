import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";

import AppNavBar from "../src/components/commons/navbar";
import Login from './components/auth/login';
import UserDashboard from "./components/user-dashboard";
import NewTask from './components/task/new-task';
import TaskList from './components/task/task-list';
import Registration from './components/auth/registration';


function App() {
  const bodyContainer = {
    paddingRight: '0px',
    paddingLeft: '0px'
 };
  return (
    <React.Fragment>
      <AppNavBar />
      <div style={bodyContainer} className="container-fluid">
        <Switch>
          <Route path="/login" component = {Login}/>
          <Route path="/register" component = {Registration}/>
          <Route path="/userDashboard" component = {UserDashboard} />
          <Route path="/newTask" component = {NewTask} />
          <Route path="/taskList" component = {TaskList} />
          <Route path="/" exact component = {Login}/>
        </Switch>
      </div>
      
    </React.Fragment>
  );
}

export default App;
