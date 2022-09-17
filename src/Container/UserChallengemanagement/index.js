import React, { Component } from 'react';
import DashboardHead from '../../Components/shared/DashboardHead';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	getUserChallengeList,
	deleteUserChallenge,
} from '../../Redux/Actions/ChallengeManageAction';
import { arrayNotNull } from '../../utilities/utilities';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Basepath } from '../../config';
import Option from '../../Components/multipleOption';
import routeRules from '../../Routes/routeRules';
import Select from 'react-select';
import ModalPopup from '../../Components/ModalPopup';
import Pagination from '../../Components/Pagination';
import UploadingImgLoader from '../../Components/overlayLoader';
import { uploadFileS3Bucket } from '../../utilities/uploadFileS3Bucket';

class UserChallengeManagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activePage: 0,
			searchType: '',
			searchInput: '',
			FilteredData: null,
			totalDataCount: 0,
			dataPerPage: 10,
			deleteUserChallengeModelIsVisible: false,
			isLoading: false,
			populatedChallenges: [{ label: 'Select Challenge...', value: 0 }],
			selectedChallenge: { label: 'Select Challenge...', value: 0 },
		};
	}

	componentDidMount() {
		let data = {
			searchType: '',
			search: '',
			challengeId: '',
			pageNo: parseInt(this.state.activePage) + 1,
		};
		this.props.getUserChallengeList(data);
		this.getChallengesData();
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.UserChallengeListData !== prevProps.UserChallengeListData &&
			this.props.UserChallengeListData
		) {
			this.setState({
				totalDataCount: this.props.UserChallengeListData.totalPage,
				FilteredData: this.props.UserChallengeListData.userchallengelist,
			});
		}
		let data = {
			searchType: this.state.searchType ? this.state.searchType : '',
			search: this.state.search ? this.state.search : '',
			challengeId:
				this.state.selectedChallenge &&
				this.state.selectedChallenge.label === 'Select Challenges...'
					? ''
					: this.state.selectedChallenge.value,
			pageNo: parseInt(this.state.activePage) + 1,
		};
		if (
			this.props.DeleteSuccessMessage !== prevProps.DeleteSuccessMessage &&
			this.props.DeleteSuccessMessage
		) {
			toast.success(this.props.DeleteSuccessMessage);
			this.props.getUserChallengeList(data);
		}
	}

	handlePageChange = (page) => {
		this.setState({ activePage: parseInt(page) });
		let data = {
			searchType: this.state.searchType ? this.state.searchType : '',
			search: this.state.search ? this.state.search : '',
			challengeId:
				this.state.selectedChallenge &&
				this.state.selectedChallenge.label === 'Select Challenges...'
					? ''
					: this.state.selectedChallenge.value,
			pageNo: parseInt(page) + 1,
		};
		this.props.getUserChallengeList(data);
	};

	onSelectChange = (e) => {
		this.setState({ searchType: e.target.value });
	};

	handleOnChange = (e) => {
		if (this.state.searchType) {
			this.setState({ searchInput: e.target.value, activePage: 0 });
			let data = {
				searchType: this.state.searchType,
				search: e.target.value,
				challengeId:
					this.state.selectedChallenge &&
					this.state.selectedChallenge.label === 'Select Challenges...'
						? ''
						: this.state.selectedChallenge.value,
				pageNo: parseInt(0) + 1,
			};
			this.props.getUserChallengeList(data);
		} else {
			toast.error('Please select search type');
		}
	};

	getChallengesData = () => {
		let temp = [...this.state.populatedChallenges];
		let fetchData = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authenticate: localStorage.getItem('sessionId'),
			},
		};
		fetch(`${Basepath}/api/admin/getChallengeList`, fetchData)
			.then((response) => response.json())
			.then((res) => {
				res.data.forEach((element) => {
					let categorie = {
						value: element.id,
						label: `${element.name}`,
					};
					temp.push(categorie);
				});
			})
			.catch((err) => console.log(err));
		this.setState((prevState) => ({
			...prevState,
			populatedChallenges: temp,
		}));
	};

	addUserChallenge = () => {
		this.setState({
			activeUserChallengedata: null,
			addEditUserChallengeModelIsVisible: true,
		});
	};

	editUserChallenge = (activeUserChallengedata) => {
		this.setState({
			activeUserChallengedata,
			addEditUserChallengeModelIsVisible: true,
		});
	};

	hideAddEditPopup = () => {
		this.setState({
			addEditUserChallengeModelIsVisible: false,
		});
	};

	AddEditUserChallengeAction = async (data) => {
		this.setState({
			addEditUserChallengeModelIsVisible: false,
			isLoading: true,
		});

		let [postImg] = await Promise.all([
			data.isVideoUpdated
				? uploadFileS3Bucket(
						data.postUserChallengeVideo,
						`${Date.now()}/${data.postUserChallengeVideo.name.replace(/\.[^/.]+$/, '')}`
				  )
				: data.postUserChallengeVideo,
		]);

		data = { ...data, mediaUrl: postImg };

		if (data.postId) {
			this.props.EditUserChallenge(data);
		} else {
			this.props.AddUserChallenge(data);
		}
	};

	deleteUserChallengeModel = (activeUserChallengedata) => {
		this.setState({
			activeUserChallengedata,
			deleteUserChallengeModelIsVisible: true,
		});
	};

	hideDeleteUserChallengePopup = () => {
		this.setState({
			deleteUserChallengeModelIsVisible: false,
		});
	};

	deleteUserChallengeAction = (e, UserChallengeId) => {
		let data = {
			id: UserChallengeId,
		};
		this.props.deleteUserChallenge(data);
		this.setState({
			deleteUserChallengeModelIsVisible: false,
		});
	};

	handleCategorieChange(value) {
		let data = {
			searchType: this.state.searchType ? this.state.searchType : '',
			search: this.state.searchInput ? this.state.searchInput : '',
			challengeId: value.label && value.label === 'Select Challenge...' ? '' : value.value,
		};
		this.props.getUserChallengeList(data);
		this.setState({ selectedChallenge: value });
	}

	render() {
		return (
			<div className="FormAndHidden">
				<ToastContainer autoClose={8000} />
				<DashboardHead
					secondaryHeadingOne="User Challenge Management "
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
									<option value="name">Full Name</option>
									<option value="email">Email</option>
									<option value="phone">Phone</option>
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
						<div className="select_box" style={{ marginLeft: '15px' }}>
							<Select
								value={this.state.selectedChallenge}
								defaultValue={{ label: 'Select Challenge...', value: 0 }}
								components={Option}
								hideSelectedOptions={false}
								onChange={(value) => this.handleCategorieChange(value)}
								options={this.state.populatedChallenges}
							/>
						</div>
					</div>
				</div>
				<div className="table-responsive">
					<table className="table table-borderless organic-table">
						<thead>
							<tr>
								<th>SNo.</th>
								<th scope="col">Full Name</th>
								<th scope="col">Email</th>
								<th scope="col">Phone No</th>
								<th scope="col">Video Thumbnail</th>
								<th scope="col">Challenge Name</th>
								<th scope="col">Creation Date</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{arrayNotNull(this.state.FilteredData) &&
								this.state.FilteredData.map((post, index) => {
									if (post) {
										return (
											<tr key={index}>
												<td style={{ color: '#212529' }}>{index + 1}.</td>
												<td>{post.fullName}</td>
												<td>{post.email}</td>
												<td>{post.phone}</td>
												<td>
													<img
														src={`${
															post.imageThumbnail
																? post.imageThumbnail
																: '/assets/images/profile-pic.jpeg'
														}`}
														height="50"
														width="50"
													/>
												</td>
												<td>
													{post.challengeName
														? `${
																post.challengeName.length > 110
																	? `${post.challengeName.substr(0, 110)} ...`
																	: post.challengeName
														  }`
														: post.challengeName}
												</td>
												<td>{moment(post.createdAt).format('DD-MM-YYYY')}</td>
												<td>
													<div className="action-type">
														<Link
															to={{
																pathname: routeRules.userchallengedetails,
																state: {
																	id: post.id,
																	userDetails: post,
																},
															}}
															className="detailclass"
														>
															<i className="fa fa-eye" aria-hidden="true"></i>
														</Link>{' '}
														|
														<Link
															to="#"
															onClick={() => this.deleteUserChallengeModel(post)}
															className="detailclass"
														>
															{' '}
															<i className="fa fa-trash-o" aria-hidden="true"></i>
														</Link>{' '}
													</div>
												</td>
											</tr>
										);
									}
								})}
						</tbody>
					</table>
					{this.props.UserChallengeListData &&
					arrayNotNull(this.props.UserChallengeListData.userchallengelist) ? (
						<Pagination
							pages={Math.ceil(this.state.totalDataCount / this.state.dataPerPage)}
							activePage={this.state.activePage}
							onPageChange={this.handlePageChange}
						/>
					) : null}
				</div>
				{this.state.deleteUserChallengeModelIsVisible ? (
					<ModalPopup
						show={this.state.deleteUserChallengeModelIsVisible}
						hidePopup={this.hideDeleteUserChallengePopup}
						activeData={this.state.activeUserChallengedata}
						deleteAction={(e, id) => this.deleteUserChallengeAction(e, id)}
					/>
				) : (
					<></>
				)}
				{this.state.isLoading ? <UploadingImgLoader /> : <></>}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		UserChallengeListData: state.ChallengeManagementReducer.UserChallengeListData,
		UserChallengeListSuccess: state.ChallengeManagementReducer.UserChallengeListSuccess,
		UserChallengeListSuccessMessage:
			state.ChallengeManagementReducer.UserChallengeListSuccessMessage,
		UserChallengeListFailure: state.ChallengeManagementReducer.UserChallengeListFailure,
		UserChallengeListFailureMessage:
			state.ChallengeManagementReducer.UserChallengeListFailureMessage,
		DeleteSuccess: state.ChallengeManagementReducer.DeleteSuccess,
		DeleteSuccessMessage: state.ChallengeManagementReducer.DeleteSuccessMessage,
		DeleteFailure: state.ChallengeManagementReducer.DeleteFailure,
		DeleteFailureMessage: state.ChallengeManagementReducer.DeleteFailureMessage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUserChallengeList: (data) => dispatch(getUserChallengeList(data)),
		deleteUserChallenge: (id) => dispatch(deleteUserChallenge(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChallengeManagement);
