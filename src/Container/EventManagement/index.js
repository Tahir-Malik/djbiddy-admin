import React, { Component } from 'react';
import DashboardHead from '../../Components/shared/DashboardHead';
// import Card from "../../components/shared/Card";
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notNull } from '../../utilities/utilities';
import { getEventList, deleteEvent } from '../../Redux/Actions/DashboardAction';
import { arrayNotNull } from '../../utilities/utilities';
import { Link } from 'react-router-dom';
import routeRules from '../../Routes/routeRules';
import Button from '../../Components/Button';
import Pagination from '../../Components/Pagination';
// import'bootstrap/dist/css/bootstrap.min.css' ;
class EventCategoryManagement extends Component {
	// const [state, setState] = useState();

	constructor(props) {
		super(props);
		this.state = {
			activePage: 0,
			NewUserList: [],
			modalStatus: false,
			deleteItem: '',
			searchtype: '',
			searchinput: '',
			totalpage: 0,
			FilteredData: null,
			page: true,
		};
	}
	
	componentDidMount() {
		this.props.getEventList();
	}
	DeleteUser = () => {
		alert(1)
		let data = {
			id: this.state.deleteItem,
		};
		this.props.deleteEvent(data);
	};
	DeleteModal = (id) => {
		this.setState({
			modalStatus: !this.state.modalStatus,
			deleteItem: id,
		});
	};

	componentDidUpdate(prevProps, prevState) {
		
		if (
			this.props.CategoryListData !== prevProps.CategoryListData &&
			this.props.CategoryListData
		) {
			console.log("pppp",this.props.CategoryListData.length % 10)
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
				console.log(this.state.totalpage)
			}
		}

		if (
			this.props.DeleteSuccessMessage !== prevProps.DeleteSuccessMessage &&
			this.props.DeleteSuccessMessage
		) {
			this.setState({
				modalStatus: false,
			});
			toast.success(this.props.DeleteSuccessMessage);
			this.props.getEventList();
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
			
			for (
				let i = page * 10; i < page * 10 + 10 && i < this.props.CategoryListData.length;
				i++
			) {
				let newdata = { id: i, data: this.props.CategoryListData[i] };
				arrayCon.push(newdata);
			}
			this.setState({
				FilteredData: arrayCon,
			});
		}
	};
	onSelectChange = (e) => {
		if (e.target.value === '') {
			let newpagearr = [];
			for (let i = 0; i < 10; i++) {
				let newdata = { id: i, data: this.props.EventCategoryListData[i] };
				newpagearr.push(newdata);
			}
			this.setState({
				FilteredData: newpagearr,
				page: true,
			});
		}
		this.setState({ searchtype: e.target.value });
	};
	handleonChange = (e) => {
		let newArry;
		if (this.state.searchtype) {
			this.setState({ searchinput: e.target.value });

			if (e.target.value) {
				let arr = [];
				if (this.state.searchtype === 'name') {
					newArry = this.props.EventCategoryListData.filter((ndata, index) => {
						let st = ndata.firstName.toUpperCase();
						if (st.includes(e.target.value.toUpperCase())) {
							arr.push({ id: index, data: ndata });
						}

						return null;
					});
				} else if (this.state.searchtype === 'email') {
					newArry = this.props.EventCategoryListData.filter((ndata, index) => {
						let st = ndata.email.toUpperCase();
						if (st.includes(e.target.value.toUpperCase())) {
							arr.push({ id: index, data: ndata });
						}
						return null;
					});
				}

				this.setState({
					FilteredData: arr,
					page: false,
				});
			} else {
				let newpagearr = [];
				for (let i = 0; i < 10; i++) {
					let newdata = { id: i, data: this.props.EventCategoryListData[i] };
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
	render() {
		// var formcls3 = classNames("col-12", "col-md-12", "col-lg-1");
		return (
			<div className="FormAndHidden">
				<ToastContainer autoClose={8000} />
				<div className="pulll-left-custom">
					<div className="pull-left-custom">
						<DashboardHead
							secondaryHeadingOne="  Event Management "
							secondaryHeadingTwo="  "
							secondaryHeadingThree="  "
							description=""
						/>
					</div>
				</div>
				
				<div
					className="remodal shadow-lg"
					style={
						this.state.modalStatus
							? {
									display: 'block',
									maxHeight: '240px',
									maxWidth: '670px',
									position: 'fixed',
									zIndex: 1050,
									width: '100%',
							  }
							: { display: 'none' }
					}
				>
					<i onClick={() => this.DeleteModal()} className="fa fa-times" aria-hidden="true"></i>

					<div className="terms-modal">
						<h1 className="seconday-heading" style={{ fontSize: '25px', lineHeight: '60px' }}>
							Do you really want to Delete ?
						</h1>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								flexDirection: 'row',
							}}
						>
							<div className="col-4 text-right">
								<Button name="Delete" onClick={() => this.DeleteUser()} className="adduserbtn" />
							</div>
							<div className="col-4 text-right">
								<Button name="Cancel" className="adduserbtn" onClick={() => this.DeleteModal()} />
							</div>
						</div>
					</div>
				</div>
				{/* <div className="primary-card"> */}
				<div className="right__side">
					<Link
						to={{
							pathname: routeRules.addoreditEvent,
							state: {
								id: '',
								EventCategoryDetails: '',
							},
						}}
						className="adduserbtn"
					>
						<i className="fa fa-plus" style={{ fontSize: '20px' }}>
							{' '}
						</i>{' '}
						Add Event
					</Link>
				</div>
				<div className="table-responsive">
					<table className="table table-borderless organic-table">
						<thead>
						 
							<tr>
								<th>SNo.</th>
								<th scope="col">Event Name</th>
								<th scope="col">Event Date</th>
								<th scope="col">Event Start Time</th>
								<th scope="col">Event End Time</th>
								<th scope="col">Event Duration</th>
								<th scope="col">Event Description</th>
								<th scope="col">Event Message</th>
								<th scope="col">Event Category</th>
								<th scope="col">Event Created Date</th>
								<th scope="col">Payment Status</th>
								
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{arrayNotNull(this.state.FilteredData) &&
								this.state.FilteredData.map((EventCategory, index) => {
									if (EventCategory.data) {
										return (
											<tr key={index}>
												<td style={{ color: '#212529' }}>{EventCategory.id + 1}.</td>
												<td>{EventCategory.data.event_name}</td>
												<td>{EventCategory.data.event_date}</td>
												<td>{EventCategory.data.start_time}</td>
												<td>{EventCategory.data.end_time}</td>
												<td>{EventCategory.data.event_duration}</td>
												<td>{EventCategory.data.event_description}</td>
												<td>{EventCategory.data.special_requirement_message}</td>
												<td>{EventCategory.data.event_category}</td>
												<td>{EventCategory.data.created_at}</td>
												<td>{EventCategory.data.payment_status==0?"Pending":"completed"}</td>
												<td>
													<Link
														to="#"
														onClick={() => this.DeleteModal(EventCategory.data.id)}
														className="detailclass"
													>
														{' '}
														<i className="fa fa-trash-o" aria-hidden="true"></i>
													</Link>{' '}
													|
													<Link
														to={{
															pathname: routeRules.addoreditEvent,
															state: {
																id: EventCategory.data.id,
																EventCategoryDetails: EventCategory.data,
															},
														}}
														className="detailclass"
													>
														{' '}
														<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
													</Link>
												</td>
											</tr>
										);
									}
								})}
						</tbody>
					</table>
					<Pagination
							pages={this.state.totalpage}
							activePage={this.state.activePage}
							onPageChange={this.handlePageChange}
						/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	//console.log('object', state.DashBoardReducer.CategoryListData);
	return {
		CategoryListData: state.DashBoardReducer.CategoryListData,
		DeleteSuccess: state.DashBoardReducer.DeleteSuccess,
		DeleteSuccessMessage: state.DashBoardReducer.DeleteSuccessMessage,
		DeleteFailure: state.DashBoardReducer.DeleteFailure,
		DeleteFailureMessage: state.DashBoardReducer.DeleteFailureMessage,
		AddorEditEventCategorySuccess: state.DashBoardReducer.AddorEditEventCategorySuccess,
		AddorEditEventCategorySuccessMessage:
			state.DashBoardReducer.AddorEditEventCategorySuccessMessage,
		AddorEditEventCategoryFailure: state.DashBoardReducer.AddorEditEventCategoryFailure,
		AddorEditEventCategoryFailureMessage:
			state.DashBoardReducer.AddorEditEventCategoryFailureMessage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getEventList: () => dispatch(getEventList()),
		deleteEvent: (id) => dispatch(deleteEvent(id)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(EventCategoryManagement);
