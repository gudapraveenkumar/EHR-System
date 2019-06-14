import React, { Component } from 'react';
import "../css/home-page.css";
import AppNavBar from "./commons/navbar";
import Auth from "./auth";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class HomePage extends Component {

   render() { 
      return ( 
         <div>
            <AppNavBar />
            <Container>
            <br></br>
            <Row className="justify-content-center">
               <Col sm={8} md={5} xs={10}>
                  <Auth />
               </Col>
            </Row>
            </Container>
         </div>
       );
   }
}
 
export default HomePage;
