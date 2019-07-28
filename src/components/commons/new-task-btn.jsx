import React, {Component} from 'react';
import './common.scss';
import TaskModal from '../task/task-modal';

class NewTaskBtn extends Component {
   state = {
      showNewTaskBtn: false
   };

   showTaskBtnHandler = () =>{
      let showNewTaskBtn = {...this.state};
      showNewTaskBtn = true;
      this.setState({showNewTaskBtn});
   };

   hideTaskBtnHandler = () =>{
      let showNewTaskBtn = {...this.state};
      showNewTaskBtn = false;
      this.setState({showNewTaskBtn});
   };

   render() {
      return (
         <React.Fragment>
            <div>
               {this.state.showNewTaskBtn &&
                  <TaskModal
                  isNewTask={true}
                  closeModal={this.hideTaskBtnHandler}
                  openModal={this.state.showNewTaskBtn}/>}
            </div>
            <div>
               {!this.state.showNewTaskBtn  &&
                  <div onClick={this.showTaskBtnHandler}
                   className="new-task-btn">
                     New Task
                  </div>}
            </div>
         </React.Fragment>
       );
   }
}

export default NewTaskBtn;
