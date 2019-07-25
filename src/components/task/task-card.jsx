import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class AppDragDropDemo extends Component {

   state = {
      tasks: [{name:"Learn Angular",
               category:"new",
               bgcolor: "yellow"},

              {name:"React",
               category:"wip",
               bgcolor:"pink"},

              {name:"Vue",
               category:"complete",
               bgcolor:"skyblue"},

               {name:"typescript",
               category:"new",
               bgcolor: "yellow"},

              {name:"Bootstrap",
               category:"wip",
               bgcolor:"pink"},

              {name:"Native",
               category:"complete",
               bgcolor:"skyblue"}
        ]};

   onDragOver = (ev) =>{
      ev.preventDefault();
   };

   onDragStart = (ev, name) => {
      console.log("dragstart :", name);
      ev.dataTransfer.setData("id", name);
   };

   onDrop = (ev, cat) => {
      let id = ev.dataTransfer.getData("id");

      let tasks = this.state.tasks.filter((task) =>{
         if(task.name === id){
            task.category = cat;
         }
         return task;
      });
      this.setState({
         ...this.state,
         tasks
      });
   }

  render () {

   var tasks = {
      wip: [],
      complete: [],
      new: []
   }

   this.state.tasks.forEach ((t) => {
      tasks[t.category].push(<div
        key={t.name}
        onDragStart={(e)=>this.onDragStart(e, t.name)}
        draggable
        className="draggable"
        style={{backgroundColor: t.bgcolor}}>
           {t.name}
      </div>);
    });

    return (
      <div className="container-drag">
         <h2 className="header"> DRAG and DROP</h2>
         <Row>
            <Col style={{background:'lightgrey', height: '400px'}}  onDragOver= {(e)=>this.onDragOver(e)}
               onDrop= {(e) => this.onDrop(e, "new")}>
               <div className="new">
                  <span className="task-header">NEW</span>
                  {tasks.new}
               </div>
            </Col>

            <Col style={{background:'lightgreen', height: '400px'}}  onDragOver= {(e)=>this.onDragOver(e)}
               onDrop= {(e) => this.onDrop(e, "wip")}>
               <div className="wip">
                  <span className="task-header">WIP</span>
                  {tasks.wip}
               </div>
            </Col>

            <Col style={{background:'cyan', height: '400px'}}  onDragOver= {(e)=>this.onDragOver(e)}
                onDrop= {(e) => this.onDrop(e, "complete")}>
               <div className="completed">
                  <span className="task-header">COMPLETED</span>
                  {tasks.complete}
               </div>
            </Col>
         </Row>
      </div>
    );
  }
}
