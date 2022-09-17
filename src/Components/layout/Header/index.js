import React from "react";
// import logo from "../../../assets/logo.png";
// import hamburber from "../../../assets/menu.png";
// import close from "../../../assets/close-menu.png";
import { Link } from "react-router-dom";
import routeRules from "../../../Routes/routeRules";

class Header extends React.Component {
  state = { sideNav: false, toggleClass: "" };

  toggle = () => {
    this.state.sideNav
      ? this.setState({
        sideNav: false,
        toggleClass: ""
      })
      : this.setState({
        sideNav: true,
        toggleClass: "open-nav"
      });
  };

  render() {
    return (
      <header>
        <div className="at-nav">
          <div className="at-nav-left">
            <Link to="/">
              <img src="./assets/images/logo.png" alt="at" />
            </Link>
          </div>

          {/* <div className="at-nav-right">
            <button className="at-nav-link-btn shadow-lg">
              <i className="fa fa-user-o" aria-hidden="true" />
            </button>
          </div> */}

          <div className="mobile-nav" id="togglebutton">
            <img
              className="mobile-nav-img"
              onClick={this.toggle}
              src={this.state.sideNav ? "./assets/images/close-menu.png" : "./assets/images/menu.png"}
              alt="menu"
            />
          </div>

          <div id="sidenav" className={`mobile-sidenav ${this.state.toggleClass}`} >
            <div className="nav-wrap">
              <Link to={routeRules.landingPage}>
                <img className="mobile-sidenav-logo" src="./assets/images/logo.png" alt="at" />
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
