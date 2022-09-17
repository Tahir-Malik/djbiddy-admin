import React, { Component } from 'react';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { objectHasKey } from '../../utilities/utilities';
import ValidationRule from './validation';
import { validate } from '../../utilities/validator';
import { addEventCategory, editEventCategory } from '../../Redux/Actions/DashboardAction';
import routeRules from '../../Routes/routeRules';
import { Link } from 'react-router-dom';

class AddorEditEvent extends Component {
	constructor(props) {
		super(props);
		let data = this.props.location.state.EventCategoryDetails;
		this.state = {
			event_category: data ? data.event_category : '',

			AddorEditEventCategoryError: false,
			AddorEditEventCategoryErrorMessage: null,
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;

		this.setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	AddorEditEventCategory = (ev) => {
		ev.preventDefault();
		let Field;
		if (!this.props.location.state.id) {
			Field = {
				event_category: this.state.event_category,
			};
		} else {
			Field = {
				eventCategoryId: this.props.location.state.id,
				event_category: this.state.event_category,
			};
		}

		if (this.Validation(Field, ValidationRule)) {
			if (!this.props.location.state.id) {
				var request = {
					event_category: this.state.event_category,
				};
				this.props.addEventCategory(request);
			} else {
				var request = {
					eventCategoryId: this.props.location.state.id,
					event_category: this.state.event_category,
				};
				this.props.editEventCategory(request);
			}
		}
	};
	Validation = (Field, ValidationRule) => {
		let res = validate(Field, ValidationRule);
		if (res.errors) {
			this.setState((prevState) => ({
				...prevState,
				AddorEditEventCategoryError: {
					event_category: res.errors.event_category ? true : false,
				},
				AddorEditEventCategoryErrorMessage: res.errors,
			}));
		}
		return res.isValid;
	};

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.AddorEditEventCategoryFailureMessage !==
				prevProps.AddorEditEventCategoryFailureMessage &&
			this.props.AddorEditEventCategoryFailureMessage !== ''
		) {
			toast.error(this.props.AddorEditEventCategoryFailureMessage);
		}
		if (
			this.props.AddorEditEventCategorySuccessMessage !==
				prevProps.AddorEditEventCategorySuccessMessage &&
			this.props.AddorEditEventCategorySuccessMessage !== ''
		) {
			toast.success(this.props.AddorEditEventCategorySuccessMessage);
		}
	}

	render() {
		return (
			<div className="AddorEditEventCategory-view">
				<div className="container">
					<ToastContainer autoClose={8000} />
					<div className="row"></div>
					<div className="row">
						<div className="col-12">
							<div className="primary-card">
								<div className="d-flex justify-content-between align-items-center">
									<div>
										<h5 className="primary-heading">
											{this.props.location.state.id ? 'Edit Event' : 'Create New Event'}
										</h5>
										<h2 className="secondary-heading1 mt-3">
											Fill the details to {this.props.location.state.id ? 'edit' : 'create'} Event
										</h2>
									</div>
									<Link
										to={{
											pathname: routeRules.eventCategory,
										}}
										className="adduserbtn"
									>
										{' '}
										Back
									</Link>
								</div>
								<form
									onSubmit={this.AddorEditEventCategory}
									action=""
									name="AddorEditEventCategory"
								>
									<div className="row">
										<div className="col-sm-12 ">
											<Input
												label="Name"
												id="event_category"
												placeholder="Type your event here.."
												name="event_category"
												maxLength={2000}
												errStatus={
													objectHasKey(this.state.AddorEditEventCategoryError, 'event_category')
														? this.state.AddorEditEventCategoryError.event_category
														: false
												}
												errmsg={
													objectHasKey(
														this.state.AddorEditEventCategoryErrorMessage,
														'event_category'
													)
														? this.state.AddorEditEventCategoryErrorMessage.event_category
														: ''
												}
												// required={true}
												value={this.state.event_category}
												onChange={(e) => this.handleChange(e)}
											/>
										</div>
									</div>

									<div className="row mt-3">
										<div className="col-12 text-center">
											<Button
												name={this.props.location.state.id ? 'Edit Event' : 'Create new Event'}
											/>
										</div>
									</div>
								</form>
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
		addEventCategory: (data) => dispatch(addEventCategory(data)),
		editEventCategory: (data) => dispatch(editEventCategory(data)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AddorEditEvent);
