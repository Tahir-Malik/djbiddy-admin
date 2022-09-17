import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getDjUserDetails } from '../../Redux/Actions/UsermanageAction';
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
			userDetail: null,
			postlist: null,
			redirect: null,
		};
	}

	componentDidMount() {
		this.setState({
			userDetail: this.props.location.state.userDetails,
			redirect: this.props.location.state.redirect,
		});
		if (this.props.location.state && this.props.location.state.id) {
			const data = { id: this.props.location.state.id };
			this.props.getDjUserDetails(data);
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
															this.state.redirect && this.state.redirect === 'DJUser'
																? routeRules.djUserManagement
																: routeRules.usermanagement,
													}}
													className="adduserbtn"
												>
													{' '}
													Back
												</Link>
											</div>
										</div>
										<div className="">
											<div className="sidenav-card-left">
												<img
													className="sidenav-card-img user__Details__img profileImage"
													style={{ borderRadius: '4px' }}
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
											<div className="sidenav-card-right mt-4">
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
															Bio :{' '}
															<span>
																{notNull(userDetail) && objectHasKey(userDetail, 'bio')
																	? userDetail.bio
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
														{/* <div className="sidenav-card-para sidenav-card-para-user">
															Gender :{' '}
															<span>
																{notNull(userDetail) && objectHasKey(userDetail, 'gender')
																	? userDetail.gender && userDetail.gender === 'MALE'
																		? 'Male'
																		: 'Female'
																	: ''}
															</span>
														</div> */}
													</div>
													<div className="user__details_box">
														<div className="sidenav-card-heading">Other Info</div>
														<div className="row">
															<div className="col-12 col-lg-4 col-md-6 user-info mt-3">
																Member Type :{' '}
																<span>
																	{notNull(userDetail) && objectHasKey(userDetail, 'memberType')
																		? userDetail.memberType && userDetail.memberType === 'NONE'
																			? 'Normal'
																			: 'Facebook'
																		: ''}
																</span>	
															</div>
															<div className="col-12 col-lg-4 col-md-6 user-info mt-3">
																DJ Price :{' '}
																<span>
																	{notNull(userDetail) && objectHasKey(userDetail, 'dj_price')
																		? userDetail.dj_price
																		: ''}
																</span>
															</div>
															<div className="col-12 col-lg-4 col-md-6 user-info mt-3">
																Event Day :{' '}
																<span>
																	{notNull(userDetail) && objectHasKey(userDetail, 'event_day')
																		? userDetail.event_day
																		: ''}
																</span>
															</div>
															<div className="col-12 col-lg-4 col-md-6 user-info mt-3">
																Event Time :{' '}
																<span>
																	{notNull(userDetail) && objectHasKey(userDetail, 'event_time')
																		? userDetail.event_time
																		: ''}
																</span>
															</div>
															<div className="col-12 col-lg-4 col-md-6 user-info mt-3">
																Music Category :{' '}
																<span>
																	{notNull(userDetail) && objectHasKey(userDetail, 'music_category')
																		? userDetail.music_category
																		: ''}
																</span>
															</div>
															<div className="col-12 col-lg-4 col-md-6 user-info mt-3">
																Rating :{' '}
																<span>
																	{notNull(userDetail) && objectHasKey(userDetail, 'rating')
																		? userDetail.rating
																		: ''}
																</span>
															</div>
															<div className="col-12 col-lg-4 col-md-6 user-info mt-3">
																Subscription Plan :{' '}
																<span>
																	{notNull(userDetail) &&
																	objectHasKey(userDetail, 'subscription_plan')
																		? userDetail.subscription_plan
																		: ''}
																</span>
															</div>
														</div>
														{/* <div className="sidenav-card-para sidenav-card-para-user">
															Member Type :{' '}
															<span>
																{notNull(userDetail) && objectHasKey(userDetail, 'memberType')
																	? userDetail.memberType && userDetail.memberType === 'NONE'
																		? 'Normal'
																		: 'Facebook'
																	: ''}
															</span>
														</div> */}
														{/* <div className="sidenav-card-para sidenav-card-para-user">
															DJ Price :{' '}
															<span>
																{notNull(userDetail) && objectHasKey(userDetail, 'dj_price')
																	? userDetail.dj_price
																	: ''}
															</span>
														</div> */}
														{/* <div className="sidenav-card-para sidenav-card-para-user">
															Event Day :{' '}
															<span>
																{notNull(userDetail) && objectHasKey(userDetail, 'event_day')
																	? userDetail.event_day
																	: ''}
															</span>
														</div> */}
														{/* <div className="sidenav-card-para sidenav-card-para-user">
															Event Time :{' '}
															<span>
																{notNull(userDetail) && objectHasKey(userDetail, 'event_time')
																	? userDetail.event_time
																	: ''}
															</span>
														</div> */}
														{/* <div className="sidenav-card-para sidenav-card-para-user">
															Music Category :{' '}
															<span>
																{notNull(userDetail) && objectHasKey(userDetail, 'music_category')
																	? userDetail.music_category
																	: ''}
															</span>
														</div> */}
														{/* <div className="sidenav-card-para sidenav-card-para-user">
															Rating :{' '}
															<span>
																{notNull(userDetail) && objectHasKey(userDetail, 'rating')
																	? userDetail.rating
																	: ''}
															</span>
														</div> */}
														{/* <div className="sidenav-card-para sidenav-card-para-user">
															Subscription Plan :{' '}
															<span>
																{notNull(userDetail) &&
																objectHasKey(userDetail, 'subscription_plan')
																	? userDetail.subscription_plan
																	: ''}
															</span>
														</div> */}
													</div>
													<div className="user__details_box">
														<div className="sidenav-card-heading">Uploaded Image</div>
														<div className="row">
															<div className="col-12 col-lg-4 col-md-6 mt-3">
																<div className="card bg-dark text-white h-100">
																	<img
																		className="card-img h-100"
																		style={{ borderRadius: '0px' }}
																		src={
																			notNull(userDetail) &&
																			objectHasKey(userDetail, 'images1') &&
																			userDetail.images1
																				? userDetail.images1
																				: '/assets/images/profile-pic.jpeg'
																		}
																		alt=""
																	/>
																</div>
															</div>
															<div className="col-12 col-lg-4 col-md-6 mt-3">
																<div className="card bg-dark text-white h-100">
																	<img
																		className="card-img h-100"
																		style={{ borderRadius: '0px' }}
																		src={
																			notNull(userDetail) &&
																			objectHasKey(userDetail, 'images2') &&
																			userDetail.images2
																				? userDetail.images2
																				: '/assets/images/profile-pic.jpeg'
																		}
																		alt=""
																	/>
																</div>
															</div>
															<div className="col-12 col-lg-4 col-md-6 mt-3">
																<div class="card bg-dark text-white h-100">
																	<img
																		className="card-img h-100"
																		style={{ borderRadius: '0px' }}
																		src={
																			notNull(userDetail) &&
																			objectHasKey(userDetail, 'images3') &&
																			userDetail.images3
																				? userDetail.images3
																				: '/assets/images/profile-pic.jpeg'
																		}
																		alt=""
																	/>
																</div>
															</div>
														</div>
														<div className="sidenav-card-heading mt-5">Uploaded Video</div>
														<div className="sidenav-card-para2 sidenav-card-para-user">
															<div className="my-3"> Video Post :{' '} </div>
															<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
																{(springProps) => (
																	<div style={springProps}>
																		<div className="white-bx-style  m-b-30">
																			<div className="GalleryBack">
																				<div className="row mt-3">
																					{notNull(postlist) && arrayNotNull(postlist) ? (
																						<Fragment>
																							{notNull(postlist) && arrayNotNull(postlist) ? (
																								postlist.map((video, index) => (
																									<div className="col-12 col-lg-4 col-md-6 mt-3" key={`${index}`}>
																										<div className="card border-0 text-white h-100"> 
																											<figure className="imageWrpVideos">
																												<Player
																													playsInline
																													src={
																														video.mediaUrl
																															? video.mediaUrl
																															: '/assets/images/image_available.png'
																													}
																													fluid={false}
																													width={250}
																													height={150}
																												/>
																											</figure>
																										</div>
																									</div>
																								))
																							) : (
																								<Fragment />
																							)}{' '}
																						</Fragment>
																					) : (
																						<Fragment />
																					)}
																				</div>
																			</div>
																		</div>
																	</div>
																)}
															</Spring>
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
		getDjUserDetails: (id) => dispatch(getDjUserDetails(id)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
