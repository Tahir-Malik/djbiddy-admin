import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import routeRules from "../../Routes/routeRules";
import Button from "../../Components/Button";
import history from "../../Store/history";
import { connect } from "react-redux";
import { GetProfile } from "../../Redux/Actions/ProfileAction";
class DashboardHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      domainUrl: "",
    };
  }
  handleLogoutModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  handleLogout = async () => {
    this.handleLogoutModal();
    localStorage.clear();
    history.push(routeRules.landingPage);
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.ProfileSuccessMessage !== prevProps.ProfileSuccessMessage &&
      this.props.ProfileSuccessMessage !== ""
    ) {
      if (localStorage.getItem("sessionId")) {
        let data = {
          adminId: localStorage.getItem("adminId"),
        };
        this.props.getAdminProfile(data);
      }
    }
  }
  render() {
    return (
      <div className="dashboard-header">
        <div
          className="remodal shadow-lg"
          style={
            this.state.showModal
              ? {
                display: "block",
                maxHeight: "730px",
                position: "fixed",
                zIndex: 1050,
                width: "100%",
              }
              : { display: "none" }
          }
        >
          <i
            onClick={() => this.handleLogoutModal()}
            className="fa fa-times"
            aria-hidden="true"
          ></i>

          <div className="terms-modal">
            <h1 className="seconday-heading" style={{ fontSize: "30px" }}>
              Do you really want to logout ?
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <div className="col-10 text-right">
                <Button name="Logout" onClick={() => this.handleLogout()} />
              </div>
              <div className="col-2 text-right">
                <Button
                  name="Cancel"
                  onClick={() => this.handleLogoutModal()}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-header-left logo-box">
          <Link to="/dashboard">
            <img src="./assets/images/ORANGE FOR DARK BG..HORIZONTAL.png" alt="logo" />
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="dashboard-header-link dashboard-header-profile">
            <div
              className="dashboard-header-link dashboard-header-profile"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="dashboard-header-profile-left"></div>
              <div className="dashboard-header-profile-right">
                <div className="profile-welcome-text" style={{ display: 'flex', 'justifyContent': 'center' }}>Welcome</div>
                <span className="dashboard-header-link admin-name">
                  {localStorage.getItem("Admin")}
                </span>
              </div>
            </div>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

              <div
                className={`dashboard-sidenav-left-menu-item-default bg-white`}
              >
                <Link to="#" onClick={() => this.handleLogoutModal()}>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ProfileSuccess: state.ProfileReducer.ProfileSuccess,
    ProfileSuccessMessage: state.ProfileReducer.ProfileSuccessMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAdminProfile: (data) => dispatch(GetProfile(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
