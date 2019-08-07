import React, { Component } from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.scss';
import {connect} from "react-redux";
import {getTasks} from "../../redux-store/actions/task-actions";

const localizer = momentLocalizer(moment)


class MyCalendar extends Component {


   componentDidMount(){
      if(!this.props.taskContainer.tasks.length){
        this.props.getTasks();
      }
   };

   render() {
      let events = this.props.taskContainer.tasks.map(function(item){
         item.start = new Date(item.start);
         item.end = new Date(item.end)
         return item;
      });

      return(
         <div style={{height: "80vh", padding:'17px'}} className="calendar-container">
            <h4>My Calendar adsf asdf</h4>
           <Calendar style = {{marginTop:'20px'}}
             localizer = {localizer}
             events = {events}
             startAccessor = "start"
             endAccessor = "end"
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
