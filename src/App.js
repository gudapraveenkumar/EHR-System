import React from 'react';
import './App.css';
import {Route} from "react-router-dom";

import HomePage from "../src/components/home";
import Authorization from './components/auth';
import UserDashboard from "./components/user-dashboard";
import NewTask from './components/new-task';
import TaskList from './components/task-list';

function App() {
  const bodyContainer = {
    paddingRight: '0px',
    paddingLeft: '0px'
 };
  return (
    <React.Fragment>
      <div style={bodyContainer} className="container-fluid">
        <Route path="/home" component = {HomePage}/>
        <Route path="/authorization" component = {Authorization}/>
        <Route path="/userDashboard" component = {UserDashboard} />
        <Route path="/newTask" component = {NewTask} />
        <Route path="/taskList" component = {TaskList} />
        <Route path="/" exact component = {HomePage}/>
      </div>
      
    </React.Fragment>
  );
}

export default App;
