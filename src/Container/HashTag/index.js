import React, { Component } from 'react';
import DashboardHead from '../../Components/shared/DashboardHead';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	getHashTagList,
	addHashTag,
	editHashTag,
	deleteHashTag,
} from '../../Redux/Actions/DashboardAction';
import { arrayNotNull, objectHasKey, notNull } from '../../utilities/utilities';
import { Link } from 'react-router-dom';
import Pagination from '../../Components/Pagination';
import ModalPopup from '../../Components/ModalPopup';
import AddEditHashTag from './AddEditHashTag';

class HashTagManagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activePage: 0,
			searchtype: '',
			searchinput: '',
			totalpage: 0,
			FilteredData: null,
			page: true,
			isSuspend: '',
			addEditHashtagModelIsVisible: false,
			deleteHashtagModelIsVisible: false,
		};
	}

	componentDidMount() {
		this.props.getHashTagList();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.HashTagListData !== prevProps.HashTagListData && this.props.HashTagListData) {
			let pureval = Math.floor(this.props.HashTagListData.length / 10);
			let restval = this.props.HashTagListData.length % 10;
			if (restval < 10 && restval > 0) {
				this.setState({
					totalpage: pureval + 1,
				});
			} else {
				this.setState({
					totalpage: pureval,
				});
			}
			if (this.state.activePage === 0) {
				let newpagearr = [];
				for (let i = 0; i < 10; i++) {
					let newdata = { id: i, data: this.props.HashTagListData[i] };
					newpagearr.push(newdata);
				}
				this.setState({
					FilteredData: newpagearr,
				});
			}
		}
		if (
			this.props.DeleteSuccessMessage !== prevProps.DeleteSuccessMessage &&
			this.props.DeleteSuccessMessage
		) {
			toast.success(this.props.DeleteSuccessMessage);
			this.props.getHashTagList();
		}
		if (
			this.props.AddorEditHashTagSuccessMessage !== prevProps.AddorEditHashTagSuccessMessage &&
			this.props.AddorEditHashTagSuccessMessage !== ''
		) {
			toast.success(this.props.AddorEditHashTagSuccessMessage);
			this.props.getHashTagList();
		}
	}

	handlePageChange = (page) => {
		this.setState({
			activePage: parseInt(page),
		});
		let arrayCon = [];
		if (page == 0) {
			let newpagearr = [];
			for (let i = 0; i < 10; i++) {
				let newdata = { id: i, data: this.props.HashTagListData[i] };
				newpagearr.push(newdata);
			}
			this.setState({
				FilteredData: newpagearr,
			});
		} else {
			for (let i = page * 10; i < page * 10 + 10 && i < this.props.HashTagListData.length; i++) {
				let newdata = { id: i, data: this.props.HashTagListData[i] };
				arrayCon.push(newdata);
			}
			this.setState({
				FilteredData: arrayCon,
			});
		}
	};

	onSelectChange = (e) => {
		if (this.props.HashTagListData && this.props.HashTagListData.length > 0) {
			if (e.target.value === '') {
				let newpagearr = [];
				for (let i = 0; i < 10; i++) {
					let newdata = { id: i, data: this.props.HashTagListData[i] };
					newpagearr.push(newdata);
				}
				this.setState({
					FilteredData: newpagearr,
					page: true,
				});
			}
			this.setState({ searchtype: e.target.value });
		}
	};

	handleonChange1 = (e) => {
		let newArry;
		if (this.state.searchtype) {
			this.setState({ searchinput: e.target.value });
			if (e.target.value) {
				let arr = [];
				if (this.state.searchtype === 'name') {
					newArry = this.props.HashTagListData.filter((ndata, index) => {
						if (ndata.name) {
							let st = ndata.name.toUpperCase();
							if (st.includes(e.target.value.toUpperCase())) {
								arr.push({ id: index, data: ndata });
							}
						}
						return null;
					});
				}
				this.setState({
					FilteredData: arr,
					page: true,
				});
			} else {
				let newpagearr = [];
				for (let i = 0; i < 10; i++) {
					let newdata = { id: i, data: this.props.HashTagListData[i] };
					newpagearr.push(newdata);
				}
				this.setState({
					FilteredData: newpagearr,
					page: true,
				});
			}
		} else {
			toast.error('please select search type');
		}
	};

	addHashTag = () => {
		this.setState({
			activeHashTagdata: null,
			addEditHashtagModelIsVisible: true,
		});
	};

	editHashTag = (activeHashTagdata) => {
		this.setState({
			activeHashTagdata,
			addEditHashtagModelIsVisible: true,
		});
	};

	hideAddEditPopup = () => {
		this.setState({
			addEditHashtagModelIsVisible: false,
		});
	};

	AddEditHashTagAction = (data) => {
		if (data.hashTagId) {
			this.props.editHashTag(data);
		} else {
			this.props.addHashTag(data);
		}
		this.setState({
			addEditHashtagModelIsVisible: false,
		});
	};

	deleteHashTag = (activeHashTagdata) => {
		this.setState({
			activeHashTagdata,
			deleteHashtagModelIsVisible: true,
		});
	};

	hideDeleteHashTagPopup = () => {
		this.setState({
			deleteHashtagModelIsVisible: false,
		});
	};

	deleteHashTagAction = (e, hashTagId) => {
		let data = {
			id: hashTagId,
		};
		this.props.deleteHashTag(data);
		this.setState({
			deleteHashtagModelIsVisible: false,
		});
	};

	render() {
		return (
			<div className="FormAndHidden">
				<ToastContainer autoClose={8000} />
				<div className="pull-left-custom">
					<DashboardHead
						secondaryHeadingOne="HashTag Management "
						secondaryHeadingTwo="  "
						secondaryHeadingThree="  "
						description=""
					/>
				</div>
				<div className="right__side">
					<Link to="#" onClick={() => this.addHashTag()} className="adduserbtn">
						<i className="fa fa-plus" style={{ fontSize: '20px' }}>
							{' '}
						</i>{' '}
						Add HashTag
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
									name="searchtype"
								>
									<option value="">Select Search</option>
									<option value="name">Name</option>
								</select>
							</label>
						</div>
						<div className="search">
							<i className="fa fa-search" aria-hidden="true"></i>
							<div className="inputGroup">
								<input
									placeholder="Search....."
									value={this.state.searchinput}
									onChange={(e) => this.handleonChange1(e)}
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
								<th scope="col">Name</th>
								<th scope="col">Description</th>
								<th scope="col">Creation Date</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{arrayNotNull(this.state.FilteredData) &&
								this.state.FilteredData.map((hashtag, index) => {
									if (hashtag.data) {
										return (
											<tr key={index}>
												<td style={{ color: '#212529' }}>{hashtag.id + 1}.</td>
												<td>{hashtag.data.name}</td>
												<td>
													{hashtag.data.description
														? `${
																hashtag.data.description.length > 110
																	? `${hashtag.data.description.substr(0, 110)} ...`
																	: hashtag.data.description
														  }`
														: hashtag.data.description}
												</td>
												<td>{hashtag.data.createdAt}</td>
												<td>
													<div className="action-type">
														<Link
															to="#"
															onClick={() => this.deleteHashTag(hashtag.data)}
															className="detailclass"
														>
															{' '}
															<i className="fa fa-trash-o" aria-hidden="true"></i>
														</Link>{' '}
														|
														<Link
															to="#"
															onClick={() => this.editHashTag(hashtag.data)}
															className="detailclass"
														>
															{' '}
															<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
														</Link>
													</div>
												</td>
											</tr>
										);
									}
								})}
						</tbody>
					</table>
					{this.state.page &&
					this.props.HashTagListData &&
					this.props.HashTagListData.length > 10 ? (
						<Pagination
							pages={this.state.totalpage}
							activePage={this.state.activePage}
							onPageChange={this.handlePageChange}
						/>
					) : null}
				</div>
				{this.state.addEditHashtagModelIsVisible ? (
					<AddEditHashTag
						show={this.state.addEditHashtagModelIsVisible}
						hidePopup={this.hideAddEditPopup}
						activeHashTagdata={this.state.activeHashTagdata}
						AddEditHashTagAction={(data) => this.AddEditHashTagAction(data)}
					/>
				) : (
					<></>
				)}
				{this.state.deleteHashtagModelIsVisible ? (
					<ModalPopup
						show={this.state.deleteHashtagModelIsVisible}
						hidePopup={this.hideDeleteHashTagPopup}
						activeData={this.state.activeHashTagdata}
						deleteAction={(e, id) => this.deleteHashTagAction(e, id)}
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
		HashTagListData: state.DashBoardReducer.HashTagListData,
		DeleteSuccess: state.DashBoardReducer.DeleteSuccess,
		DeleteSuccessMessage: state.DashBoardReducer.DeleteSuccessMessage,
		DeleteFailure: state.DashBoardReducer.DeleteFailure,
		DeleteFailureMessage: state.DashBoardReducer.DeleteFailureMessage,
		AddorEditHashTagSuccess: state.DashBoardReducer.AddorEditHashTagSuccess,
		AddorEditHashTagSuccessMessage: state.DashBoardReducer.AddorEditHashTagSuccessMessage,
		AddorEditHashTagFailure: state.DashBoardReducer.AddorEditHashTagFailure,
		AddorEditHashTagFailureMessage: state.DashBoardReducer.AddorEditHashTagFailureMessage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getHashTagList: (data) => dispatch(getHashTagList(data)),
		addHashTag: (data) => dispatch(addHashTag(data)),
		editHashTag: (data) => dispatch(editHashTag(data)),
		deleteHashTag: (id) => dispatch(deleteHashTag(id)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(EventCategoryManagement);
