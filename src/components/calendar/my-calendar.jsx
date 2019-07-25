import React, { Component } from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.scss';

const localizer = momentLocalizer(moment)

class MyCalendar extends Component {
   state = {
      events:[
         {
            title: 'Finish',
            start: new Date(),
            end: new Date('2019-07-26'),
            allDay: false
          },
          {
            title: 'test app',
            start: new Date(),
            end: new Date('2019-07-26'),
            allDay: false
          }
      ]
    }
   render() {
      return(
         <div style={{height: "80vh", padding:'20px'}} className="calendar-container">
            <h2 style={{textAlign:"center"}}>My Calendar</h2>
           <Calendar style={{marginTop:'30px'}}
             localizer={localizer}
             events={this.state.events}
             startAccessor="start"
             endAccessor="end"
            />
         </div>
       )
   }
}

export default MyCalendar;
