import React, { Component } from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.scss';
import {connect} from "react-redux";
import {getTasks} from "../../redux-store/actions/task-actions";

const localizer = momentLocalizer(moment)

class MyCalendar extends Component {


   componentDidMount(){
      console.log('calendar mount =', this.props);
      if(!this.props.taskContainer.tasks.length){
        this.props.getTasks();
      }
   }

   render() {
      return(
         <div style={{height: "80vh", padding:'20px'}} className="calendar-container">
            <h2 style={{textAlign:"center"}}>My Calendar</h2>
           <Calendar style={{marginTop:'30px'}}
             localizer={localizer}
             events={this.props.taskContainer.tasks}
             startAccessor="start"
             endAccessor="end"
            />
         </div>
       )
   }
}


function mapStateToProps(state) {
   return {
     taskContainer: state.task,
     message: state.toastMessage
   };
 }

export default connect(mapStateToProps, {getTasks})(MyCalendar);
