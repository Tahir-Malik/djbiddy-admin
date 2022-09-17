import React, { Component } from 'react';
import DashboardHead from '../../Components/shared/DashboardHead';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserList, deleteUser, resumeSuspendUser } from '../../Redux/Actions/UsermanageAction';
import { arrayNotNull, objectHasKey } from '../../utilities/utilities';
import { Link } from 'react-router-dom';
import routeRules from '../../Routes/routeRules';
import moment from 'moment';
import ModalPopup from '../../Components/ModalPopup';
import UserSuspendPopup from './UserSuspendPopup';
import Pagination from '../../Components/Pagination';

class UserManagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activePage: 0,
			searchType: '',
			searchInput: '',
			totalDataCount: 0,
			dataPerPage: 10,
			totalpage: 0,
			isActive: '',
			FilteredData: null,
			deleteUserModelIsVisible: false,
			userSuspendModelIsVisible: false,
		};
	}

	componentDidMount() {
		let data = {
			isActive: '',
			searchType: '',
			search: '',
			pageNo: parseInt(this.state.activePage) + 1,
		};
		this.props.getUserList(data);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.UserListData !== prevProps.UserListData && this.props.UserListData) {
			this.setState({
				totalDataCount: this.props.UserListData.totalPage,
				FilteredData: this.props.UserListData.userlist,
			});
		}
		let data = {
			isActive: this.state.isActive ? this.state.isActive : '',
			searchType: this.state.searchType ? this.state.searchType : '',
			search: this.state.searchInput ? this.state.searchInput : '',
			pageNo: parseInt(this.state.activePage) + 1,
		};
		if (
			this.props.DeleteSuccessMessage !== prevProps.DeleteSuccessMessage &&
			this.props.DeleteSuccessMessage
		) {
			toast.success(this.props.DeleteSuccessMessage);
			this.props.getUserList(data);
		}
		if (
			this.props.ResumeSuspendUserSuccessMessage !== prevProps.ResumeSuspendUserSuccessMessage &&
			this.props.ResumeSuspendUserSuccessMessage
		) {
			toast.success(this.props.ResumeSuspendUserSuccessMessage);
			this.props.getUserList(data);
		}
	}

	handlePageChange = (page) => {
		this.setState({ activePage: parseInt(page) });
		let data = {
			isActive: this.state.isActive ? this.state.isActive : '',
			searchType: this.state.searchType ? this.state.searchType : '',
			search: this.state.searchInput ? this.state.searchInput : '',
			pageNo: parseInt(page) + 1,
		};
		this.props.getUserList(data);
	};

	onSelectChange = (e) => {
		this.setState({ searchType: e.target.value });
	};

	handleOnChange = (e) => {
		if (this.state.searchType) {
			this.setState({ searchInput: e.target.value, activePage: 0 });
			let data = {
				isActive: this.state.isActive,
				searchType: this.state.searchType,
				search: e.target.value,
				pageNo: parseInt(0) + 1,
			};
			this.props.getUserList(data);
		} else {
			toast.error('Please select search type');
		}
	};

	handleonChange = (e) => {
		let checkCondiation = 0;
		let data = {
			searchType: this.state.searchType ? this.state.searchType : '',
			search: this.state.searchInput ? this.state.searchInput : '',
			isActive: this.state.isActive,
			pageNo: parseInt(0) + 1,
		};
		if (e.target.value == 'isActive' || e.target.value == 'Sus_All') {
			var a = e.target.value == 'isActive' ? 1 : '';
			this.setState({ isActive: a, activePage: 0 });
			data.isActive = a;
			checkCondiation = 1;
		} else {
			checkCondiation = 0;
		}
		if (checkCondiation == 1) {
			this.props.getUserList(data);
		}
	};

	deleteUserModel = (activeUserdata) => {
		this.setState({
			activeUserdata,
			deleteUserModelIsVisible: true,
		});
	};

	hideDeleteUserPopup = () => {
		this.setState({
			deleteUserModelIsVisible: false,
		});
	};

	deleteUserAction = (e, UserId) => {
		let data = {
			id: UserId,
		};
		this.props.deleteUser(data);
		this.setState({
			deleteUserModelIsVisible: false,
		});
	};

	userSuspend = (activeUserdata) => {
		this.setState({
			activeUserdata,
			userSuspendModelIsVisible: true,
		});
	};

	resumeSuspendAction = (e, userId, isActive) => {
		let data = {
			userId: userId,
			isActive: isActive,
		};
		this.props.resumeSuspendUser(data);
		this.setState({
			userSuspendModelIsVisible: false,
		});
	};

	hideUserSuspendPopup = () => {
		this.setState({
			userSuspendModelIsVisible: false,
		});
	};

	render() {
		return (
			<div className="FormAndHidden">
				<ToastContainer autoClose={8000} />
				<DashboardHead
					secondaryHeadingOne="Normal User Management "
					secondaryHeadingTwo="  "
					secondaryHeadingThree="  "
					description=""
				/>
				<div className="filter_wrapper">
					<div className="top-search-filter">
						<div className="select_box">
							<label>
								<select
									className="green-select"
									style={{ marginTop: '0px' }}
									onChange={(e) => this.onSelectChange(e)}
									name="searchType"
								>
									<option value="">Select Search</option>
									<option value="name">Name</option>
									<option value="email">Email</option>
								</select>
							</label>
						</div>
						<div className="search">
							<i className="fa fa-search" aria-hidden="true"></i>
							<div className="inputGroup">
								<input
									placeholder="Search....."
									value={this.state.searchInput}
									onChange={(e) => this.handleOnChange(e)}
								/>
							</div>
						</div>
					</div>
					<div className="radio__btns_wrap">
						<div className="radio__wrap">
							<b> Blocked Status : </b>
							<div className="radio__container">
								<div className="radio-wrap">
									<input
										type="radio"
										name="site_name6"
										value="isActive"
										onChange={(e) => this.handleonChange(e)}
									/>{' '}
									Blocked{' '}
								</div>
								<div className="radio-wrap">
									<input
										type="radio"
										name="site_name6"
										value="Sus_All"
										onChange={(e) => this.handleonChange(e)}
									/>{' '}
									All{' '}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="table-responsive">
					<table className="table table-borderless organic-table">
						<thead>
							<tr>
								<th>SNo.</th>
								<th scope="col">Profile Pic</th>
								<th scope="col">Name</th>
								<th scope="col">Email</th>
								<th scope="col">Age</th>
								<th scope="col">Member Type</th>
								<th scope="col">Creation Date</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{arrayNotNull(this.state.FilteredData) &&
								this.state.FilteredData.map((user, index) => {
									if (user) {
										return (
											<tr key={index}>
												<td style={{ color: '#212529' }}>{index + 1}.</td>
												<td>
													<img
														src={`${
															user.profilePic ? user.profilePic : '/assets/images/profile-pic.jpeg'
														}`}
														height="50"
														width="50"
													/>
												</td>
												<td>{`${user.firstName} ${user.lastName}`}</td>
												<td>{user.email}</td>
												<td>{user.age}</td>
												<td>
													{user.memberType
														? user.memberType === 'NONE'
															? 'Normal'
															: user.memberType === 'FACEBOOK'
															? 'Facebook'
															: 'Apple'
														: ''}{' '}
												</td>
												<td>{moment(user.createdAt).format('DD-MM-YYYY')}</td>
												<td>
													<div className="action-type">
														<Link
															to={{
																pathname: routeRules.userdetails,
																state: {
																	id: user.id,
																	userDetails: user,
																},
															}}
															className="detailclass"
														>
															<i className="fa fa-eye" aria-hidden="true"></i>
														</Link>{' '}
														|
														<Link
															to="#"
															onClick={() => this.deleteUserModel(user)}
															className="detailclass"
														>
															{' '}
															<i className="fa fa-trash-o" aria-hidden="true"></i>
														</Link>{' '}
														{/* |
                                           <Link
                                             to={{
                                                pathname: routeRules.addoredituser,
                                                state: {
                                                   id: user.id,
                                                   userDetails: user,
                                                },
                                             }}
                                             className="detailclass"
                                          >
                                             {" "}
                                             <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                          </Link>{" "} */}
														|
														<Link to="#" onClick={() => this.userSuspend(user)}>
															{' '}
															{user.isActive === 1 ? (
																<i className="fa fa-unlock theme-button" aria-hidden="true" />
															) : (
																<i className="fa fa-lock theme-button" aria-hidden="true" />
															)}
														</Link>{' '}
													</div>
												</td>
											</tr>
										);
									}
								})}
						</tbody>
					</table>
					{this.props.UserListData && arrayNotNull(this.props.UserListData.userlist) ? (
						<Pagination
							pages={Math.ceil(this.state.totalDataCount / this.state.dataPerPage)}
							activePage={this.state.activePage}
							onPageChange={this.handlePageChange}
						/>
					) : null}
				</div>
				{this.state.deleteUserModelIsVisible ? (
					<ModalPopup
						show={this.state.deleteUserModelIsVisible}
						hidePopup={this.hideDeleteUserPopup}
						activeData={this.state.activeUserdata}
						deleteAction={(e, id) => this.deleteUserAction(e, id)}
					/>
				) : (
					<></>
				)}
				{this.state.userSuspendModelIsVisible ? (
					<UserSuspendPopup
						show={this.state.userSuspendModelIsVisible}
						hidePopup={this.hideUserSuspendPopup}
						activeUserdata={this.state.activeUserdata}
						resumeSuspendAction={(e, id, isActive) => this.resumeSuspendAction(e, id, isActive)}
					/>
				) : (
					<></>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		UserListData: state.UserManagementReducer.UserListData,
		UserListSuccess: state.UserManagementReducer.UserListSuccess,
		UserListSuccessMessage: state.UserManagementReducer.UserListSuccessMessage,
		UserListFailure: state.UserManagementReducer.UserListFailure,
		UserListFailureMessage: state.UserManagementReducer.UserListFailureMessage,
		DeleteSuccess: state.UserManagementReducer.DeleteSuccess,
		DeleteSuccessMessage: state.UserManagementReducer.DeleteSuccessMessage,
		DeleteFailure: state.UserManagementReducer.DeleteFailure,
		DeleteFailureMessage: state.UserManagementReducer.DeleteFailureMessage,
		AddorEdituserSuccess: state.UserManagementReducer.AddorEdituserSuccess,
		AddorEdituserSuccessMessage: state.UserManagementReducer.AddorEdituserSuccessMessage,
		AddorEdituserFailure: state.UserManagementReducer.AddorEdituserFailure,
		AddorEdituserFailureMessage: state.UserManagementReducer.AddorEdituserFailureMessage,
		ResumeSuspendUserSuccess: state.UserManagementReducer.ResumeSuspendUserSuccess,
		ResumeSuspendUserSuccessMessage: state.UserManagementReducer.ResumeSuspendUserSuccessMessage,
		ResumeSuspendUserFailure: state.UserManagementReducer.ResumeSuspendUserFailure,
		ResumeSuspendUserFailureMessage: state.UserManagementReducer.ResumeSuspendUserFailureMessage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUserList: (data) => dispatch(getUserList(data)),
		deleteUser: (id) => dispatch(deleteUser(id)),
		resumeSuspendUser: (data) => dispatch(resumeSuspendUser(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
