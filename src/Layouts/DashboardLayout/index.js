import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import Footer from "../../Components/layout/Footer";
import routeRules from "../../Routes/routeRules";
import LeftNavigation from "../../Components/layout/LeftNavigation";
class DashboardLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      leftSidenav: true,
      leftSidenavClass: "",
      rightSidenav: true,
      rightSidenavClass: "",
      sidenav: false,
      sidenavClass: "",
      leftMenu: false,
    };
  }


  toggleRightSidenav = () => {
    this.state.rightSidenav
      ? this.setState({
        rightSidenav: false,
        rightSidenavClass: "hide-rightSidenav"
      })
      : this.setState({
        rightSidenav: true,
        rightSidenavClass: ""
      });
  };

  toggleSidenav = () => {
    this.state.sidenav
      ? this.setState({ sidenav: false, sidenavClass: "" })
      : this.setState({
        sidenav: true,
        sidenavClass: "dashboard-header-mob-show"
      });
  };

 
 
  render() {
    return (
      <div
        className={`dashboard ${this.state.rightSidenavClass} ${
          this.state.leftMenu ? "show-leftmenu" : "hide-leftmenu"
          } `}
      >
        <DashboardHeader
          {...this.state}
      
        />
        <LeftNavigation/>
        <div className="dashboard-main">
          <div className="dashboard-main-content">{this.props.children}</div>
          <i
            className="fa fa-bars leftMenuBar"
            onClick={() => {
              this.setState({ leftMenu: !this.state.leftMenu });
            }}
            aria-hidden="true"
          ></i>
        </div>
      </div>
    );
  }
}

export default DashboardLayout;
