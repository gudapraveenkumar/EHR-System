import React, {Component} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../task/task.scss';
import Moment from 'react-moment';

class DashboardTaskCard extends Component {
   state = {  }


   render() {
      const task = this.props.task;
      let chipClass = task.priority.id === 1? 'lowp-clr': (task.priority.id === 2 ? 'mediump-clr':'highp-clr');
      const chipClassName = 'priority-chip ' + chipClass;
      const statusBackground = task.status.id === 1? '#25d2d2': (task.status.id === 2? '#b9a8ef':'');
      return (
         <div onClick = {this.props.openTask} style={{border: '1px solid #e8e8e8', padding:'5px 10px', marginBottom: '10px', cursor:'pointer'}}>
            <Row>
               <Col>
               <div>
                  {this.props.task.title}
               </div>
               <div style={{color:'grey', fontSize:'14px'}}>
                  {this.props.task.description}
               </div>
               </Col>
               <Col md="auto" className="d-flex align-items-center">
                  <div style={{height:'25px', padding:'0px 5px', background:statusBackground, color: 'white'}}>
                     {this.props.task.status.name}
                  </div>
               </Col>
               <Col style={{fontSize: '14px'}} className="d-flex flex-row justify-content-center align-items-center">
                  {/* <div>Start Date: <Moment format="YYYY/MM/DD">{this.props.task.start}</Moment></div> */}

                  <div style={{marginLeft:'15px', textAlign:'center'}}>End Date: <Moment format="YYYY-MM-DD">
                  {this.props.task.end}</Moment> </div>

               </Col>
               <Col md="auto" className="d-flex align-items-center">
                  <div className={chipClassName}>
                     {this.props.task.priority.name}
                  </div>
               </Col>
            </Row>
         </div>
       );
   }
}

export default DashboardTaskCard;
