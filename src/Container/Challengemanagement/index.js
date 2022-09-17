import React, { Component } from 'react';
import DashboardHead from '../../Components/shared/DashboardHead';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	getChallengeList,
	deleteChallenge,
	AddChallenge,
	EditChallenge,
} from '../../Redux/Actions/ChallengeManageAction';
import { arrayNotNull, objectHasKey } from '../../utilities/utilities';
import { Link } from 'react-router-dom';
import routeRules from '../../Routes/routeRules';
import moment from 'moment';
import ModalPopup from '../../Components/ModalPopup';
import Pagination from '../../Components/Pagination';
import AddEditChallenge from './AddEditChallenge';
import UploadingImgLoader from '../../Components/overlayLoader';
import { uploadFileS3Bucket } from '../../utilities/uploadFileS3Bucket';

class ChallengeManagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activePage: 0,
			searchType: '',
			searchInput: '',
			totalpage: 0,
			totalDataCount: 0,
			dataPerPage: 4,
			FilteredData: null,
			activeChallenge: '',
			deleteChallengeModelIsVisible: false,
			isLoading: false,
		};
	}

	componentDidMount() {
		let data = { searchType: '', search: '', pageNo: parseInt(this.state.activePage) };
		this.props.getChallengeList(data);
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.ChallengeListData !== prevProps.ChallengeListData &&
			this.props.ChallengeListData
		) {
			this.setState({
				totalDataCount: this.props.ChallengeListData.totalPage,
				FilteredData: this.props.ChallengeListData.challengelist,
			});
		}
		let data = {
			searchType: this.state.searchType ? this.state.searchType : '',
			search: this.state.search ? this.state.search : '',
			pageNo: parseInt(this.state.activePage),
		};
		if (
			this.props.DeleteSuccessMessage !== prevProps.DeleteSuccessMessage &&
			this.props.DeleteSuccessMessage
		) {
			toast.success(this.props.DeleteSuccessMessage);
			this.props.getChallengeList(data);
		}
		if (
			this.props.AddorEditchallengeSuccessMessage !== prevProps.AddorEditchallengeSuccessMessage &&
			this.props.AddorEditchallengeSuccessMessage
		) {
			toast.success(this.props.AddorEditchallengeSuccessMessage);
			this.setState({ isLoading: false });
			this.props.getChallengeList(data);
		}
	}

	handlePageChange = (page) => {
		this.setState({ activePage: parseInt(page) });
		let data = {
			searchType: this.state.searchType ? this.state.searchType : '',
			search: this.state.search ? this.state.search : '',
			pageNo: parseInt(page),
		};
		this.props.getChallengeList(data);
	};

	onSelectChange = (e) => {
		this.setState({ searchType: e.target.value });
	};

	handleOnChange = (e) => {
		if (this.state.searchType) {
			this.setState({ searchInput: e.target.value, activePage: 0 });
			let data = { searchType: this.state.searchType, search: e.target.value, pageNo: 0 };
			this.props.getChallengeList(data);
		} else {
			toast.error('Please select search type');
		}
	};

	addChallenge = () => {
		this.setState({
			activeChallengedata: null,
			addEditChallengeModelIsVisible: true,
		});
	};

	editChallenge = (activeChallengedata) => {
		this.setState({
			activeChallengedata,
			addEditChallengeModelIsVisible: true,
		});
	};

	hideAddEditPopup = () => {
		this.setState({
			addEditChallengeModelIsVisible: false,
		});
	};

	AddEditChallengeAction = async (data) => {
		this.setState({
			addEditChallengeModelIsVisible: false,
			isLoading: true,
		});

		let [challengeImg] = await Promise.all([
			data.isVideoUpdated
				? uploadFileS3Bucket(
						data.challengePostVideo,
						`${Date.now()}/${data.challengePostVideo.name.replace(/\.[^/.]+$/, '')}`
				  )
				: data.challengePostVideo,
		]);

		data = { ...data, mediaUrl: challengeImg };

		if (data.challengeId) {
			this.props.EditChallenge(data);
		} else {
			this.props.AddChallenge(data);
		}
	};

	deleteChallengeModel = (activeChallengedata) => {
		this.setState({
			activeChallengedata,
			deleteChallengeModelIsVisible: true,
		});
	};

	hideDeleteChallengePopup = () => {
		this.setState({
			deleteChallengeModelIsVisible: false,
		});
	};

	deleteChallengeAction = (e, ChallengeId) => {
		let data = {
			id: ChallengeId,
		};
		this.props.deleteChallenge(data);
		this.setState({
			deleteChallengeModelIsVisible: false,
		});
	};

	render() {
		return (
			<div className="FormAndHidden">
				<ToastContainer autoClose={8000} />
				<div className="pull-left-custom">
					<DashboardHead
						secondaryHeadingOne="Challenge Management "
						secondaryHeadingTwo="  "
						secondaryHeadingThree="  "
						description=""
					/>
				</div>
				<div className="right__side">
					<Link to="#" onClick={() => this.addChallenge()} className="adduserbtn">
						<i className="fa fa-plus" style={{ fontSize: '20px' }}>
							{' '}
						</i>{' '}
						Add Challenge
					</Link>
				</div>
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
									<option value="name">Challenge Name</option>
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
				</div>
				<div className="table-responsive">
					<table className="table table-borderless organic-table">
						<thead>
							<tr>
								<th>SNo.</th>
								<th scope="col">Video Thumbnail</th>
								<th scope="col">Challenge Name</th>
								<th scope="col">Description</th>
								<th scope="col">Creation Date</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{arrayNotNull(this.state.FilteredData) &&
								this.state.FilteredData.map((challenge, index) => {
									if (challenge) {
										return (
											<tr key={index}>
												<td style={{ color: '#212529' }}>{index + 1}.</td>
												<td>
													<img
														src={`${
															challenge.imageThumbnail
																? challenge.imageThumbnail
																: '/assets/images/profile-pic.jpeg'
														}`}
														height="50"
														width="50"
													/>
												</td>
												<td>{challenge.name}</td>
												<td>
													{challenge.description
														? `${
																challenge.description.length > 110
																	? `${challenge.description.substr(0, 110)} ...`
																	: challenge.description
														  }`
														: challenge.description}
												</td>
												<td>{moment(challenge.createdAt).format('DD-MM-YYYY')}</td>
												<td>
													<div className="action-type">
														<Link
															to="#"
															onClick={() => this.deleteChallengeModel(challenge)}
															className="detailclass"
														>
															{' '}
															<i className="fa fa-trash-o" aria-hidden="true"></i>
														</Link>{' '}
														|
														<Link
															to="#"
															onClick={() => this.editChallenge(challenge)}
															className="detailclass"
														>
															{' '}
															<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
														</Link>{' '}
													</div>
												</td>
											</tr>
										);
									}
								})}
						</tbody>
					</table>
					{this.props.ChallengeListData &&
					arrayNotNull(this.props.ChallengeListData.challengelist) ? (
						<Pagination
							pages={Math.ceil(this.state.totalDataCount / this.state.dataPerPage)}
							activePage={this.state.activePage}
							onPageChange={this.handlePageChange}
						/>
					) : null}
				</div>
				{this.state.addEditChallengeModelIsVisible ? (
					<AddEditChallenge
						show={this.state.addEditChallengeModelIsVisible}
						hidePopup={this.hideAddEditPopup}
						activeChallengedata={this.state.activeChallengedata}
						AddEditChallengeAction={(data) => this.AddEditChallengeAction(data)}
					/>
				) : (
					<></>
				)}
				{this.state.deleteChallengeModelIsVisible ? (
					<ModalPopup
						show={this.state.deleteChallengeModelIsVisible}
						hidePopup={this.hideDeleteChallengePopup}
						activeData={this.state.activeChallengedata}
						deleteAction={(e, id) => this.deleteChallengeAction(e, id)}
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
		ChallengeListData: state.ChallengeManagementReducer.ChallengeListData,
		ChallengeListSuccess: state.ChallengeManagementReducer.ChallengeListSuccess,
		ChallengeListSuccessMessage: state.ChallengeManagementReducer.ChallengeListSuccessMessage,
		ChallengeListFailure: state.ChallengeManagementReducer.ChallengeListFailure,
		ChallengeListFailureMessage: state.ChallengeManagementReducer.ChallengeListFailureMessage,
		DeleteSuccess: state.ChallengeManagementReducer.DeleteSuccess,
		DeleteSuccessMessage: state.ChallengeManagementReducer.DeleteSuccessMessage,
		DeleteFailure: state.ChallengeManagementReducer.DeleteFailure,
		DeleteFailureMessage: state.ChallengeManagementReducer.DeleteFailureMessage,
		AddorEditchallengeSuccess: state.ChallengeManagementReducer.AddorEditchallengeSuccess,
		AddorEditchallengeSuccessMessage:
			state.ChallengeManagementReducer.AddorEditchallengeSuccessMessage,
		AddorEditchallengeFailure: state.ChallengeManagementReducer.AddorEditchallengeFailure,
		AddorEditchallengeFailureMessage:
			state.ChallengeManagementReducer.AddorEditchallengeFailureMessage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getChallengeList: (data) => dispatch(getChallengeList(data)),
		deleteChallenge: (id) => dispatch(deleteChallenge(id)),
		AddChallenge: (data) => dispatch(AddChallenge(data)),
		EditChallenge: (data) => dispatch(EditChallenge(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeManagement);
