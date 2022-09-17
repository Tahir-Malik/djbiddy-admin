import React, { Component } from "react";
import { connect } from "react-redux";
import { Basepath } from "../../config";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: ''
    }
  }

  fetchList() {
    let fetchData = { method: 'GET', headers: { "Content-Type": "application/json", "authenticate": localStorage.getItem('sessionId') } }
    fetch(`${Basepath}/api/admin/dashboard`, fetchData)
      .then(response => response.json())
      .then(data => {
        this.setState({
          dashboard: data.data ? data.data : ''
        });
      })
  }

  componentDidMount() {
    this.fetchList()
  }

  render() {
    return (
      <div className={`dashboard-sidenav-right`}>
        <div className="dashboard-sidenav-right-content">
          <div className="dashboard__wrap">
            <div className="card_box dashboard-card l-bg-sunkist">
              <h4>Total no. of normal users</h4>
              <h6>
                <i className="fa fa-user text-left" aria-hidden="true"></i>
                <span className="number"><span>
                  {this.state.dashboard ? this.state.dashboard.activeUsers : 0}
                </span>{" "}
                </span>
              </h6>
              <span className="hyper__link">
                <p></p>
              </span>
            </div>
            <div className="card_box dashboard-card l-bg-sun-horizon">
              <h4>Total no. of dj users</h4>
              <h6>
                <i className="fa fa-user" aria-hidden="true"></i>
                <span className="number"> {this.state.dashboard ? this.state.dashboard.djUsers : 0}</span>
              </h6>
              <span className="hyper__link">
                <p></p>
              </span>
            </div>
            <div className="card_box dashboard-card l-bg-juicy-orange">
              <h4>Total no. of open events</h4>
              <h6>
                <i className="fa fa-user" aria-hidden="true"></i>
                <span className="number">
                  {this.state.dashboard ? this.state.dashboard.openEvents : 0}</span>
              </h6>
              <span className="hyper__link">
                <p></p>
              </span>
            </div>
            <div className="card_box dashboard-card l-bg-sunkist">
              <h4>Total no. of invited events</h4>
              <h6>
                <i className="fa fa-user text-left" aria-hidden="true"></i>
                <span className="number"><span>
                  {this.state.dashboard ? this.state.dashboard.invitedEvents : 0}
                </span>{" "}
                </span>
              </h6>
              <span className="hyper__link">
                <p></p>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
