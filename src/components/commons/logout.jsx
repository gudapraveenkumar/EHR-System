import React, { Component } from 'react';
import {logoutActionHandler} from "../../redux-store/actions/auth-actions";

import {connect} from "react-redux";

class Logout extends Component {

componentDidMount(){
   console.log('in logout component');
   this.props.logoutActionHandler();
   this.props.history.push('/login');
}

   render() {
      return (
         <div></div>
      );
   }
}

export default connect(null, {logoutActionHandler})(Logout);
