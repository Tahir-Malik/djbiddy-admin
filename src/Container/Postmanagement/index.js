import React, { Component } from 'react';
import DashboardHead from '../../Components/shared/DashboardHead';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPostList, deletePost } from '../../Redux/Actions/PostManageAction';
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

class PostManagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activePage: 0,
			searchType: '',
			searchInput: '',
			totalDataCount: 0,
			dataPerPage: 10,
			FilteredData: null,
			deletePostModelIsVisible: false,
			isLoading: false,
			populatedCategories: [{ label: 'Select Categories...', value: 0 }],
			selectedCategory: { label: 'Select Categories...', value: 0 },
		};
	}

	componentDidMount() {
		let data = {
			searchType: '',
			search: '',
			category: '',
			pageNo: parseInt(this.state.activePage) + 1,
		};
		this.props.getPostList(data);
		this.getCategoriesData();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.PostListData !== prevProps.PostListData && this.props.PostListData) {
			this.setState({
				totalDataCount: this.props.PostListData.totalPage,
				FilteredData: this.props.PostListData.postlist,
			});
		}
		let data = {
			searchType: this.state.searchType ? this.state.searchType : '',
			search: this.state.searchInput,
			category:
				this.state.selectedCategory && this.state.selectedCategory.label === 'Select Categories...'
					? ''
					: this.state.selectedCategory.label,
			pageNo: parseInt(this.state.activePage) + 1,
		};
		if (
			this.props.DeleteSuccessMessage !== prevProps.DeleteSuccessMessage &&
			this.props.DeleteSuccessMessage
		) {
			toast.success(this.props.DeleteSuccessMessage);
			this.props.getPostList(data);
		}
	}

	handlePageChange = (page) => {
		this.setState({ activePage: parseInt(page) });
		let data = {
			searchType: this.state.searchType ? this.state.searchType : '',
			search: this.state.search ? this.state.search : '',
			category:
				this.state.selectedCategory && this.state.selectedCategory.label === 'Select Categories...'
					? ''
					: this.state.selectedCategory.label,
			pageNo: parseInt(page) + 1,
		};
		this.props.getPostList(data);
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
				category:
					this.state.selectedCategory &&
					this.state.selectedCategory.label === 'Select Categories...'
						? ''
						: this.state.selectedCategory.label,
				pageNo: parseInt(0) + 1,
			};
			this.props.getPostList(data);
		} else {
			toast.error('Please select search type');
		}
	};

	getCategoriesData = () => {
		let temp = [...this.state.populatedCategories];
		let fetchData = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authenticate: localStorage.getItem('sessionId'),
			},
		};
		fetch(`${Basepath}/api/admin/categoryList`, fetchData)
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
			populatedCategories: temp,
		}));
	};

	addPost = () => {
		this.setState({
			activePostdata: null,
			addEditPostModelIsVisible: true,
		});
	};

	editPost = (activePostdata) => {
		this.setState({
			activePostdata,
			addEditPostModelIsVisible: true,
		});
	};

	hideAddEditPopup = () => {
		this.setState({
			addEditPostModelIsVisible: false,
		});
	};

	AddEditPostAction = async (data) => {
		this.setState({
			addEditPostModelIsVisible: false,
			isLoading: true,
		});

		let [postImg] = await Promise.all([
			data.isVideoUpdated
				? uploadFileS3Bucket(
						data.postPostVideo,
						`${Date.now()}/${data.postPostVideo.name.replace(/\.[^/.]+$/, '')}`
				  )
				: data.postPostVideo,
		]);

		data = { ...data, mediaUrl: postImg };

		if (data.postId) {
			this.props.EditPost(data);
		} else {
			this.props.AddPost(data);
		}
	};

	deletePostModel = (activePostdata) => {
		this.setState({
			activePostdata,
			deletePostModelIsVisible: true,
		});
	};

	hideDeletePostPopup = () => {
		this.setState({
			deletePostModelIsVisible: false,
		});
	};

	deletePostAction = (e, PostId) => {
		let data = {
			id: PostId,
		};
		this.props.deletePost(data);
		this.setState({
			deletePostModelIsVisible: false,
		});
	};

	handleCategorieChange(value) {
		let data = {
			searchType: this.state.searchType ? this.state.searchType : '',
			search: this.state.searchInput ? this.state.searchInput : '',
			category: value.label && value.label === 'Select Categories...' ? '' : value.label,
		};
		this.props.getPostList(data);
		this.setState({ selectedCategory: value });
	}

	render() {
		return (
			<div className="FormAndHidden">
				<ToastContainer autoClose={8000} />
				<DashboardHead
					secondaryHeadingOne="Post Management "
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
								value={this.state.selectedCategory}
								defaultValue={{ label: 'Select Categories...', value: 0 }}
								components={Option}
								hideSelectedOptions={false}
								onChange={(value) => this.handleCategorieChange(value)}
								options={this.state.populatedCategories}
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
								<th scope="col">Category Name</th>
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
												<td>{post.name}</td>
												<td>{moment(post.createdAt).format('DD-MM-YYYY')}</td>
												<td>
													<div className="action-type">
														<Link
															to={{
																pathname: routeRules.postdetails,
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
															onClick={() => this.deletePostModel(post)}
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
					{this.props.PostListData && arrayNotNull(this.props.PostListData.postlist) ? (
						<Pagination
							pages={Math.ceil(this.state.totalDataCount / this.state.dataPerPage)}
							activePage={this.state.activePage}
							onPageChange={this.handlePageChange}
						/>
					) : null}
				</div>
				{this.state.deletePostModelIsVisible ? (
					<ModalPopup
						show={this.state.deletePostModelIsVisible}
						hidePopup={this.hideDeletePostPopup}
						activeData={this.state.activePostdata}
						deleteAction={(e, id) => this.deletePostAction(e, id)}
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
		PostListData: state.PostManagementReducer.PostListData,
		PostListSuccess: state.PostManagementReducer.PostListSuccess,
		PostListSuccessMessage: state.PostManagementReducer.PostListSuccessMessage,
		PostListFailure: state.PostManagementReducer.PostListFailure,
		PostListFailureMessage: state.PostManagementReducer.PostListFailureMessage,
		DeleteSuccess: state.PostManagementReducer.DeleteSuccess,
		DeleteSuccessMessage: state.PostManagementReducer.DeleteSuccessMessage,
		DeleteFailure: state.PostManagementReducer.DeleteFailure,
		DeleteFailureMessage: state.PostManagementReducer.DeleteFailureMessage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPostList: (data) => dispatch(getPostList(data)),
		deletePost: (id) => dispatch(deletePost(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PostManagement);
