import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUserDetails } from '../../Redux/Actions/UsermanageAction';
import { notNull, arrayNotNull, objectHasKey } from '../../utilities/utilities';
import { Spring } from 'react-spring/renderprops';
import routeRules from '../../Routes/routeRules';
import { Link } from 'react-router-dom';
import './gallery.css';
import '../../../node_modules/video-react/dist/video-react.css';
import { Player } from 'video-react';

class UserDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: '',
			postlist: null,
			redirect: null,
		};
	}

	componentDidMount() {
		if (this.props.location.state && this.props.location.state.id) {
			const data = { id: this.props.location.state.id };
			this.props.getUserDetails(data);
			this.setState({
				userId: this.props.location.state.id,
				redirect: this.props.location.state.redirect,
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('this.props.UserDetailsData :----->', this.props.UserDetailsData);
		if (this.props.UserDetailsData !== prevProps.UserDetailsData && this.props.UserDetailsData) {
			this.setState({
				userDetail: this.props.UserDetailsData.userDetails,
				postlist: this.props.UserDetailsData.postlist,
			});
		}
	}

	render() {
		const userDetail = notNull(this.state.userDetail) && { ...this.state.userDetail };
		const postlist = notNull(this.state.postlist) && this.state.postlist;
		return (
			<div className="autotagging-view">
				<div className="container">
					<div className="row">
						<div className="col-12 ">
							<div className={`UserDetails-sidenav-right`}>
								<div className="UserDetail-sidenav-right-content">
									<div className="sidenav-card sidenav-card-user">
										<div className="heading__b">
											<div className="d-flex justify-content-between align-items-center">
												<h2 className="secondary-heading1">User Details</h2>
												<Link
													to={{
														pathname:
															this.state.redirect && this.state.redirect === 'report'
																? routeRules.reportmanagement
																: routeRules.usermanagement,
													}}
													className="adduserbtn"
												>
													{' '}
													Back
												</Link>
											</div>
										</div>
										<div className="sidenav-card-body">
											<div className="sidenav-card-left">
												<img
													className="sidenav-card-img user__Details__img"
													style={{ borderRadius: '0px' }}
													src={
														notNull(userDetail) &&
														objectHasKey(userDetail, 'profilePic') &&
														userDetail.profilePic
															? userDetail.profilePic
															: '/assets/images/profile-pic.jpeg'
													}
													alt=""
												/>
											</div>
											<div className="sidenav-card-right">
												<div className="user__Details_container">
													<div className="user__details_box">
														<div className="sidenav-card-heading">Personal Detail</div>
														<div className="sidenav-card-para sidenav-card-para-user">
															Name:{' '}
															<span>
																{notNull(userDetail) && objectHasKey(userDetail, 'firstName')
																	? `${userDetail.firstName} ${userDetail.lastName}`
																	: ''}
															</span>
														</div>

														<div className="sidenav-card-para sidenav-card-para-user">
															Email:{' '}
															<span>
																{notNull(userDetail) && objectHasKey(userDetail, 'email')
																	? userDetail.email
																	: ''}
															</span>
														</div>
														{/* <div className="sidenav-card-para sidenav-card-para-user">
															Contact No.{' '}
															<span>
																{notNull(userDetail) && objectHasKey(userDetail, 'phone')
																	? userDetail.phone
																	: ''}
															</span>
														</div> */}
														<div className="sidenav-card-para sidenav-card-para-user">
															Age:{' '}
															<span>
																{notNull(userDetail) && objectHasKey(userDetail, 'age')
																	? userDetail.age
																	: ''}
															</span>
														</div>
														<div className="sidenav-card-para2 sidenav-card-para-user">
															Address :{' '}
															<span>
																{notNull(userDetail) && objectHasKey(userDetail, 'address')
																	? userDetail.address
																	: ''}
															</span>
														</div>
													</div>
													<div className="user__details_box">
														<div className="sidenav-card-heading">Other Info</div>
														<div className="sidenav-card-para sidenav-card-para-user">
															Member Type :{' '}
															<span>
																{notNull(userDetail) && objectHasKey(userDetail, 'memberType')
																	? userDetail.memberType && userDetail.memberType === 'normal'
																		? 'Normal'
																		: 'Facebook'
																	: ''}
															</span>
														</div>
														<div className="sidenav-card-para2 sidenav-card-para-user">
															Bio :{' '}
															<span>
																{notNull(userDetail) && objectHasKey(userDetail, 'bio')
																	? userDetail.bio
																	: ''}
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
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
		UserDetailsData: state.UserManagementReducer.UserDetailsData,
		UserDetailsSuccess: state.UserManagementReducer.UserDetailsSuccess,
		UserDetailsSuccessMessage: state.UserManagementReducer.UserDetailsSuccessMessage,
		UserDetailsFailure: state.UserManagementReducer.UserDetailsFailure,
		UserDetailsFailureMessage: state.UserManagementReducer.UserDetailsFailureMessage,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getUserDetails: (id) => dispatch(getUserDetails(id)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
