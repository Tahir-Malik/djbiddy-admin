import React, { Component } from 'react';
import DashboardHead from '../../Components/shared/DashboardHead';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	getCategoryList,
	addCategory,
	editCategory,
	deleteCategory,
} from '../../Redux/Actions/DashboardAction';
import { arrayNotNull, objectHasKey, notNull } from '../../utilities/utilities';
import { Link } from 'react-router-dom';
import Pagination from '../../Components/Pagination';
import ModalPopup from '../../Components/ModalPopup';
import AddEditCategory from './AddEditCategory';

class CategoryManagement extends Component {
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
			addEditCategoryModelIsVisible: false,
			deleteCategoryModelIsVisible: false,
		};
	}

	componentDidMount() {
		this.props.getCategoryList();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.CategoryListData !== prevProps.CategoryListData && this.props.CategoryListData) {
			let pureval = Math.floor(this.props.CategoryListData.length / 10);
			let restval = this.props.CategoryListData.length % 10;
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
					let newdata = { id: i, data: this.props.CategoryListData[i] };
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
			this.props.getCategoryList();
		}
		if (
			this.props.AddorEditCategorySuccessMessage !== prevProps.AddorEditCategorySuccessMessage &&
			this.props.AddorEditCategorySuccessMessage !== ''
		) {
			toast.success(this.props.AddorEditCategorySuccessMessage);
			this.props.getCategoryList();
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
				let newdata = { id: i, data: this.props.CategoryListData[i] };
				newpagearr.push(newdata);
			}
			this.setState({
				FilteredData: newpagearr,
			});
		} else {
			for (let i = page * 10; i < page * 10 + 10 && i < this.props.CategoryListData.length; i++) {
				let newdata = { id: i, data: this.props.CategoryListData[i] };
				arrayCon.push(newdata);
			}
			this.setState({
				FilteredData: arrayCon,
			});
		}
	};

	onSelectChange = (e) => {
		if (this.props.CategoryListData && this.props.CategoryListData.length > 0) {
			if (e.target.value === '') {
				let newpagearr = [];
				for (let i = 0; i < 10; i++) {
					let newdata = { id: i, data: this.props.CategoryListData[i] };
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
		if (this.state.searchtype) {
			this.setState({ searchinput: e.target.value });
			if (e.target.value) {
				let arr = [];
				if (this.state.searchtype === 'name') {
					this.props.CategoryListData.filter((ndata, index) => {
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
					let newdata = { id: i, data: this.props.CategoryListData[i] };
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

	addCategory = () => {
		this.setState({
			activeCategorydata: null,
			addEditCategoryModelIsVisible: true,
		});
	};

	editCategory = (activeCategorydata) => {
		this.setState({
			activeCategorydata,
			addEditCategoryModelIsVisible: true,
		});
	};

	hideAddEditPopup = () => {
		this.setState({
			addEditCategoryModelIsVisible: false,
		});
	};

	AddEditCategoryAction = (data) => {
		if (data.categoryId) {
			this.props.editCategory(data);
		} else {
			this.props.addCategory(data);
		}
		this.setState({
			addEditCategoryModelIsVisible: false,
		});
	};

	deleteCategory = (activeCategorydata) => {
		this.setState({
			activeCategorydata,
			deleteCategoryModelIsVisible: true,
		});
	};

	hideDeleteCategoryPopup = () => {
		this.setState({
			deleteCategoryModelIsVisible: false,
		});
	};

	deleteCategoryAction = (e, categoryId) => {
		let data = {
			id: categoryId,
		};
		this.props.deleteCategory(data);
		this.setState({
			deleteCategoryModelIsVisible: false,
		});
	};

	render() {
		return (
			<div className="FormAndHidden">
				<ToastContainer autoClose={8000} />
				<div className="pull-left-custom">
					<DashboardHead
						secondaryHeadingOne="Category Management "
						secondaryHeadingTwo="  "
						secondaryHeadingThree="  "
						description=""
					/>
				</div>
				<div className="right__side">
					<Link to="#" onClick={() => this.addCategory()} className="adduserbtn">
						<i className="fa fa-plus" style={{ fontSize: '20px' }}>
							{' '}
						</i>{' '}
						Add Category
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
								this.state.FilteredData.map((category, index) => {
									if (category.data) {
										return (
											<tr key={index}>
												<td style={{ color: '#212529' }}>{category.id + 1}.</td>
												<td>{category.data.name}</td>
												<td>
													{category.data.description
														? `${
																category.data.description.length > 110
																	? `${category.data.description.substr(0, 110)} ...`
																	: category.data.description
														  }`
														: category.data.description}
												</td>
												<td>{category.data.createdAt}</td>
												<td>
													<div className="action-type">
														<Link
															to="#"
															onClick={() => this.deleteCategory(category.data)}
															className="detailclass"
														>
															{' '}
															<i className="fa fa-trash-o" aria-hidden="true"></i>
														</Link>{' '}
														|
														<Link
															to="#"
															onClick={() => this.editCategory(category.data)}
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
					this.props.CategoryListData &&
					this.props.CategoryListData.length > 10 ? (
						<Pagination
							pages={this.state.totalpage}
							activePage={this.state.activePage}
							onPageChange={this.handlePageChange}
						/>
					) : null}
				</div>
				{this.state.addEditCategoryModelIsVisible ? (
					<AddEditCategory
						show={this.state.addEditCategoryModelIsVisible}
						hidePopup={this.hideAddEditPopup}
						activeCategorydata={this.state.activeCategorydata}
						AddEditCategoryAction={(data) => this.AddEditCategoryAction(data)}
					/>
				) : (
					<></>
				)}
				{this.state.deleteCategoryModelIsVisible ? (
					<ModalPopup
						show={this.state.deleteCategoryModelIsVisible}
						hidePopup={this.hideDeleteCategoryPopup}
						activeData={this.state.activeCategorydata}
						deleteAction={(e, id) => this.deleteCategoryAction(e, id)}
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
		CategoryListData: state.DashBoardReducer.CategoryListData,
		DeleteSuccess: state.DashBoardReducer.DeleteSuccess,
		DeleteSuccessMessage: state.DashBoardReducer.DeleteSuccessMessage,
		DeleteFailure: state.DashBoardReducer.DeleteFailure,
		DeleteFailureMessage: state.DashBoardReducer.DeleteFailureMessage,
		AddorEditCategorySuccess: state.DashBoardReducer.AddorEditCategorySuccess,
		AddorEditCategorySuccessMessage: state.DashBoardReducer.AddorEditCategorySuccessMessage,
		AddorEditCategoryFailure: state.DashBoardReducer.AddorEditCategoryFailure,
		AddorEditCategoryFailureMessage: state.DashBoardReducer.AddorEditCategoryFailureMessage,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getCategoryList: (data) => dispatch(getCategoryList(data)),
		addCategory: (data) => dispatch(addCategory(data)),
		editCategory: (data) => dispatch(editCategory(data)),
		deleteCategory: (id) => dispatch(deleteCategory(id)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryManagement);
