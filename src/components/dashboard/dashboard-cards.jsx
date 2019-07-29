import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DashboardCard = (props) => {
   return (
      <Card>
         <Card.Body style={{padding:'12px 20px'}}>
            <Row>
               <Col md="auto" className="d-flex align-items-center" >
                  <FontAwesomeIcon style={{fontSize:'28px', color:'#6679d6'}} icon={props.icon}/>
               </Col>
               <Col style={{paddingLeft:'0px'}}>
               <div className="d-flex justify-content-end">
                  {props.title}
                  </div>
                  <div style={{fontSize:'28px'}} className="d-flex justify-content-end">
                  {props.count}
                  </div>

               </Col>
            </Row>
         </Card.Body>

      </Card>
    );
}

export default DashboardCard;
