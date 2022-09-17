import React, { Component } from 'react';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { objectHasKey } from '../../utilities/utilities';
import ValidationRule from './validation';
import { Basepath } from '../../config';
import Option from '../../Components/multipleOption';
import Select from 'react-select';
import { validate } from '../../utilities/validator';
import ErrorMessage from '../../Components/errorMessage';
import { EditUser, getUserDetails } from '../../Redux/Actions/UsermanageAction';
import { Link } from 'react-router-dom';
import routeRules from '../../Routes/routeRules';

class AddorEditUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: '',
			fullName: '',
			username: '',
			email: '',
			gender: '',
			mobileNo: '',
			age: '',
			profilePic: '',
			AddorEditUserError: false,
			AddorEditUserErrorMessage: null,
			bio: '',
			populatedCategories: [],
			selectedCategorieOption: [],
		};
	}

	componentDidMount() {
		if (this.props.location.state && this.props.location.state.id) {
			const data = { id: this.props.location.state.id };
			this.props.getUserDetails(data);
			this.getCategoriesData();
			this.setState({
				userId: this.props.location.state.id,
				redirect: this.props.location.state.redirect,
			});
		}
	}

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

	componentDidUpdate(prevProps, prevState) {
		if (this.props.UserDetailsData !== prevProps.UserDetailsData && this.props.UserDetailsData) {
			this.setState({
				fullName:
					objectHasKey(this.props.UserDetailsData.userDetails, 'fullName') &&
					this.props.UserDetailsData.userDetails.fullName,
				username:
					objectHasKey(this.props.UserDetailsData.userDetails, 'username') &&
					this.props.UserDetailsData.userDetails.username,
				email:
					objectHasKey(this.props.UserDetailsData.userDetails, 'email') &&
					this.props.UserDetailsData.userDetails.email,
				gender:
					objectHasKey(this.props.UserDetailsData.userDetails, 'gender') &&
					this.props.UserDetailsData.userDetails.gender,
				mobileNo:
					objectHasKey(this.props.UserDetailsData.userDetails, 'phone') &&
					this.props.UserDetailsData.userDetails.phone,
				age:
					objectHasKey(this.props.UserDetailsData.userDetails, 'age') &&
					this.props.UserDetailsData.userDetails.age,
				profilePic:
					objectHasKey(this.props.UserDetailsData.userDetails, 'profilePic') &&
					this.props.UserDetailsData.userDetails.profilePic,
				bio:
					objectHasKey(this.props.UserDetailsData.userDetails, 'bio') &&
					this.props.UserDetailsData.userDetails.bio,
				selectedCategorieOption:
					objectHasKey(this.props.UserDetailsData.userDetails, 'categorie') &&
					this.props.UserDetailsData.userDetails.categorie
						? this.props.UserDetailsData.userDetails.categorie
								.split(',')
								.map(this.splitStr)
								.map((h) => {
									return { value: h.id, label: h.name };
								})
						: [],
			});
		}
		if (
			this.props.AddorEdituserSuccessMessage !== prevProps.AddorEdituserSuccessMessage &&
			this.props.AddorEdituserSuccessMessage
		) {
			toast.success(this.props.AddorEdituserSuccessMessage);
			const data = { id: this.props.location.state.id };
			this.props.getUserDetails(data);
		}
		if (
			this.props.AddorEdituserFailureMessage !== prevProps.AddorEdituserFailureMessage &&
			this.props.AddorEdituserFailureMessage
		) {
			toast.error(this.props.AddorEdituserFailureMessage);
		}
	}

	splitStr = (x) => {
		const y = x.split(':');
		return { id: parseInt(y[0].trim()), name: y[1].trim() };
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	AddorEditUser = (e) => {
		e.preventDefault();

		if (!this.formValidation()) return null;

		if (this.props.location.state.id) {
			const stateData = { ...this.state };
			let dataFields = {
				userId: stateData.userId,
				fullName: stateData.fullName,
				userName: stateData.username,
				email: stateData.email,
				gender: stateData.gender,
				phone: stateData.mobileNo,
				age: stateData.age,
				bio: stateData.bio,
				categories:
					stateData.selectedCategorieOption &&
					stateData.selectedCategorieOption.map((p) => p.value).join(','),
			};

			if (this.formValidation()) {
				this.props.EditUser(dataFields);
			}
		}
	};

	formValidation = () => {
		const cloneState = { ...this.state };
		let validationFields = {
			fullName: cloneState.fullName ? cloneState.fullName : '',
			username: cloneState.username ? cloneState.username : '',
			email: cloneState.email ? cloneState.email : '',
			mobileNo: cloneState.mobileNo ? cloneState.mobileNo : '',
		};
		return this.validation(true, validationFields, ValidationRule);
	};

	validation = (isSubmit, Field, Rules) => {
		const Res = validate(Field, Rules);
		const prop = isSubmit
			? {
					isSubmit: isSubmit,
					AddorEditUserError: true,
					AddorEditUserErrorMessage: Res.errors,
			  }
			: { AddorEditUserError: true, AddorEditUserErrorMessage: Res.errors };
		this.setState((prevState) => ({
			...prevState,
			...prop,
		}));
		return Res.isValid;
	};

	handleCategorieChange = (selectedCategorieOption) => {
		this.setState({
			selectedCategorieOption,
		});
	};

	render() {
		const { AddorEditUserError, AddorEditUserErrorMessage } = this.state;
		return (
			<div className="AddorEditUser-view">
				<div className="container">
					<ToastContainer autoClose={8000} />
					<div className="row">
						<div className="col-12">
							<div className="primary-card">
								<div className="d-flex justify-content-between align-items-center">
									<div>
										<h1 className="primary-heading">Edit User</h1>
										<h2 className="secondary-heading1">Fill the details to edit user</h2>
									</div>
									<Link
										to={{
											pathname: routeRules.usermanagement,
										}}
										className="adduserbtn"
									>
										{' '}
										Back
									</Link>
								</div>
								<form onSubmit={this.AddorEditUser} action="" name="AddorEditUser">
									<div className="col-sm-12 form-group">
										<label htmlFor="exampleEmail" className="card-title">
											General Info
										</label>
										<div className="tasks-div">
											<div className="row">
												<div className="col-sm-12 col-md-6 col-lg-6">
													<Input
														label="Full Name"
														id="fullName"
														placeholder="Type your full name here.."
														name="fullName"
														maxLength={20}
														className={`form-control ${
															AddorEditUserError && 'fullName' in AddorEditUserErrorMessage
																? 'error-input'
																: ''
														}`}
														value={this.state.fullName}
														onChange={(e) => this.handleChange(e)}
													/>
													<ErrorMessage
														error={AddorEditUserError}
														message={AddorEditUserErrorMessage}
														field="fullName"
													/>
												</div>
												<div className="col-sm-12 col-md-6 col-lg-6">
													<Input
														label="User Name"
														id="username"
														placeholder="Type your user name here.."
														name="username"
														maxLength={20}
														className={`form-control ${
															AddorEditUserError && 'username' in AddorEditUserErrorMessage
																? 'error-input'
																: ''
														}`}
														value={this.state.username}
														onChange={(e) => this.handleChange(e)}
													/>
													<ErrorMessage
														error={AddorEditUserError}
														message={AddorEditUserErrorMessage}
														field="username"
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-12 col-md-6 col-lg-6">
													<Input
														label="Email"
														id="email"
														maxLength={50}
														name="email"
														className={`form-control ${
															AddorEditUserError && 'email' in AddorEditUserErrorMessage
																? 'error-input'
																: ''
														}`}
														placeholder="Your email address here.."
														value={this.state.email}
														onChange={(e) => this.handleChange(e)}
													/>
													<ErrorMessage
														error={AddorEditUserError}
														message={AddorEditUserErrorMessage}
														field="email"
													/>
												</div>
												<div className="col-sm-12 col-md-6 col-lg-6">
													<Input
														label="Mobile Number"
														id="mobileNo"
														type="number"
														name="mobileNo"
														maxLength={10}
														required={true}
														className={`form-control ${
															AddorEditUserError && 'mobileNo' in AddorEditUserErrorMessage
																? 'error-input'
																: ''
														}`}
														placeholder="Mobile number here.."
														value={this.state.mobileNo}
														onChange={(e) => this.handleChange(e)}
													/>
													<ErrorMessage
														error={AddorEditUserError}
														message={AddorEditUserErrorMessage}
														field="mobileNo"
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-12 col-md-6 col-lg-6">
													<p1 className="inputLable">Gender</p1>
													<select
														name="gender"
														label="Gender"
														style={{ marginTop: '0px' }}
														className="green-select"
														value={this.state.gender}
														onChange={(e) => this.handleChange(e)}
													>
														<option value="">Select Gender</option>
														<option value="MALE">Male</option>
														<option value="FEMALE">Female</option>
													</select>
												</div>
												<div className="col-sm-12 col-md-6 col-lg-6">
													<Input
														label="Age"
														id="age"
														type="string"
														name="age"
														required={true}
														className={`form-control`}
														placeholder="Enter your Age"
														value={this.state.age}
														onChange={(e) => this.handleChange(e)}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="col-sm-12 form-group">
										<label htmlFor="exampleEmail" className="card-title">
											Other Info
										</label>
										<div className="tasks-div">
											<div className="row">
												<div className="col-sm-12 col-md-6 col-lg-6">
													<Input
														label="Bio"
														id="bio"
														type="string"
														name="bio"
														className={`form-control`}
														placeholder="bio  here.."
														value={this.state.bio}
														onChange={(e) => this.handleChange(e)}
													/>
												</div>
												<div className="col-sm-12 col-md-6 col-lg-6">
													<p className="inputLable">Categories</p>
													<Select
														className="green-select"
														value={
															this.state.selectedCategorieOption
																? this.state.selectedCategorieOption
																: []
														}
														defaultValue={{ label: 'Select Categories...', value: 0 }}
														components={Option}
														isMulti
														closeMenuOnSelect={false}
														hideSelectedOptions={false}
														onChange={this.handleCategorieChange}
														options={this.state.populatedCategories}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-12 text-center">
											<Button
												name={this.props.location.state.id ? 'Edit User' : 'Create new User'}
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
		UserDetailsData: state.UserManagementReducer.UserDetailsData,
		UserDetailsSuccess: state.UserManagementReducer.UserDetailsSuccess,
		UserDetailsSuccessMessage: state.UserManagementReducer.UserDetailsSuccessMessage,
		UserDetailsFailure: state.UserManagementReducer.UserDetailsFailure,
		UserDetailsFailureMessage: state.UserManagementReducer.UserDetailsFailureMessage,
		AddorEdituserSuccess: state.UserManagementReducer.AddorEdituserSuccess,
		AddorEdituserSuccessMessage: state.UserManagementReducer.AddorEdituserSuccessMessage,
		AddorEdituserFailure: state.UserManagementReducer.AddorEdituserFailure,
		AddorEdituserFailureMessage: state.UserManagementReducer.AddorEdituserFailureMessage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUserDetails: (id) => dispatch(getUserDetails(id)),
		EditUser: (data) => dispatch(EditUser(data)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AddorEditUser);
