import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./side-nav.scss";
import { Link } from "react-router-dom";

class AppSideNav extends Component {
  state = {
    sidenavItems: [
      {
        name: "Dashboard",
        route: "/dashboard",
        icon: "border-all"
      },
      {
        name: "My Tasks",
        route: "/task-list",
        icon: "align-justify"
      },
      {
        name: "My Calendar",
        route: "/my-calendar",
        icon: ["far", "calendar"]
      },
      {
        name: "My Profile",
        route: "/my-profile",
        icon: ["far", "user-circle"]
      },
      {
        name: "Change Password",
        route: "/change-password",
        icon: "key"
      },
      {
        name: "Logout",
        route: "/logout",
        icon: "sign-out-alt"
      }
    ],
    activeRoute: ""
  };

  componentDidMount = () => {
    let activeRoute = { ...this.state.activeRoute };
    activeRoute = window.location.pathname;
    this.setState({ activeRoute });
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

        {this.state.sidenavItems.map(el => {
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
