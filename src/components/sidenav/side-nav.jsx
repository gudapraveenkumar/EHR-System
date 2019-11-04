import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { sideNavRoutes } from "../../helper/data-fixtures";
import "./side-nav.scss";

class AppSideNav extends Component {
  state = {
    sideNavItems: [],
    activeRoute: ""
  };

  componentDidMount = () => {
    let { activeRoute, sideNavItems } = { ...this.state.activeRoute };
    activeRoute = window.location.pathname;
    sideNavItems = sideNavRoutes();
    this.setState({ activeRoute, sideNavItems });
  };

  sidenavItemHandler = item => {
    let activeRoute = { ...this.state.activeRoute };
    activeRoute = item.route;
    this.setState({ activeRoute });
  };

  render() {
    return (
      <div className="sidenav">
        <br></br>
        <div className="sidenav-header">
          <FontAwesomeIcon icon="tasks" />
          <span> Task Manager</span>
        </div>
        <br></br>

        {this.state.sideNavItems.map(el => {
          return (
            <div
              key={el.name}
              className={
                this.state.activeRoute === el.route
                  ? "sidenav-item active-route"
                  : "sidenav-item"
              }
            >
              <Link
                onClick={() => this.sidenavItemHandler(el)}
                className="sidenav-item-link"
                to={el.route}
              >
                <FontAwesomeIcon className="sidenav-item-icon" icon={el.icon} />
                <span> {el.name} </span>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default AppSideNav;
