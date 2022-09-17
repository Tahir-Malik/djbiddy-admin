import React, { Component } from "react";
import { connect } from "react-redux";
import { arrayNotNull } from "../../../utilities/utilities";
import { Link } from "react-router-dom";
import routeRules from "../../../Routes/routeRules";
class RightNavigation extends Component {
  constructor(props) {
    super(props);
   
	var m=0;
	var f= 0;
	var Premium = 0;
	if(this.props.totalUser){
		this.props.totalUser.forEach((ele)=>{
			if(ele.gender==='male'){
				m++;
			}else if(ele.gender=='female'){
				f++;
			}
			if(ele.isPremium===1){
				Premium++;
			}
		})
	}
	
	 this.state = {
      status: "",
      percentage: 5,
	  male:m,
	  female:f,
	  Premium:Premium
    };
  }
	
  toggleRightSidenav = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        rightSidenav: !prevState.rightSidenav,
        rightSidenavClass: prevState.rightSidenav ? "hide-rightSidenav" : "",
      };
    });
  };

  toggleSidenav = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        sidenav: !prevState.sidenav,
        sidenavClass: prevState.sidenav ? "" : "dashboard-header-mob-show",
      };
    });
  };

  render() {
    var m=0;
	  var f= 0;
	  var Premium = 0;
    {arrayNotNull(this.props.totalUser) &&
      this.props.totalUser.map((user, index) => {
        if(user.gender==='male'){
          m++;
        }else if(user.gender==='female'){
          f++;
        }
        if(user.isPremium===1){
          Premium++;
        }
      })}
    return (
      <div className={`dashboard-sidenav-right`}>
        <div className="dashboard-sidenav-right-content">

        <div className="dashboard__wrap">
                    <div className="card_box l-bg-green">
                      <h4>Total User</h4>
                      <h6>
                        <i className="fa fa-user text-left" aria-hidden="true"></i>
                         <span className="number"><span>
                    {arrayNotNull(this.props.totalUser)
                      ? this.props.totalUser.length
                      : ""}
                  </span>{" "}
                 </span>
                      </h6>
                     <span className="hyper__link">
                     <p></p>
                     </span>       
                    </div>
                    <div className="card_box l-bg-purple">
                      <h4>Male Users</h4>
                      <h6>
                      <i className="fa fa-user" aria-hidden="true"></i>

                         <span className="number">{m}</span>
                      </h6>
                     <span className="hyper__link">
                      <p></p>

                     </span>       
                    </div>
                    <div className="card_box l-bg-orange">
                      <h4>Female Users</h4>
                      <h6>
                      <i className="fa fa-user" aria-hidden="true"></i>

                         <span className="number">{f}</span>
                      </h6>
                     <span className="hyper__link">
                     <p></p>
                     </span>       
                    </div>
                    <div className="card_box l-bg-cyan">
                      <h4>Premium Users</h4>
                      <h6>
                      <i className="fa fa-user" aria-hidden="true"></i>

                         <span className="number">  <span className="number">{Premium}</span></span>
                      </h6>
                     <span className="hyper__link">
                     <p></p>
                     </span>       
                    </div>
                </div>
                
          {/* <div className="sidenav-card .sidenav-card-user">
            <div className="sidenav-card-body">
              <div className="sidenav-card-left">
                <img
                  className="sidenav-card-img"
                  // title="contrast" className=""
                  // style={{color: '#189603'}}
                  src="./assets/images/multipleuser2.png"
                  alt=""
                />
              </div>
              <div className="sidenav-card-right">
                <div className="sidenav-card-heading">Total User</div>
                <div className="sidenav-card-para">
                  Users count is{" "}
                  <span>
                    {arrayNotNull(this.props.totalUser)
                      ? this.props.totalUser.length
                      : ""}
                  </span>{" "}
                  in your App
                </div>
                <div className="sidenav-card-para sidenav-card-para-user" ><Link to={routeRules.usermanagement} style={{color:'#f58432'}}>Show Users</Link></div>


                
              </div>
            </div>
          </div>
          */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DomainInfo: state.SignInReducer.DomainInfo,
    AllDomainInfo: state.SignInReducer.AllDomainInfo,
    SignInData: state.SignInReducer.SignInData,
  };
};
export default connect(mapStateToProps, null)(RightNavigation);
