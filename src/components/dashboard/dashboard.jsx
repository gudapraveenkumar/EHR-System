import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import {getTasks} from "../../redux-store/actions/task-actions";
import {connect} from "react-redux";


class Dashboard extends Component {

   componentDidMount(){
      this.props.getTasks();
   }

   state = {  }
   render() {

      let tasks = this.props.taskContainer.tasks;

      return (
         <div>
            <Card>
               <Card.Header as="h5">Today's Tasks</Card.Header>
               <Card.Body>
                  {tasks.map(el => {
                           if(el.status === 2){
                              return (
                                 <div key={el.id}>{el.title}</div>
                              )
                           }return ''
                        })}
               </Card.Body>
            </Card>
            <Card style={{marginTop:'10px'}}>
               <Card.Header as="h5">Upcoming Tasks</Card.Header>
               <Card.Body>
                  {tasks.map(el => {
                           if(el.status === 2){
                              return (
                                 <div key={el.id}>{el.title}</div>
                              )
                           }return ''
                        })}
               </Card.Body>
            </Card>
         </div>

       );
   }
}

function mapStateToProps(state) {
   return {
     taskContainer: state.task,
     message: state.toastMessage
   };
 }

export default connect(mapStateToProps, {getTasks})(Dashboard);
