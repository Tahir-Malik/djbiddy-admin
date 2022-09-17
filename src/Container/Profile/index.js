import React, { Component } from 'react';
// import "./addSub.css";
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import routeRules from '../../Routes/routeRules';
import { notNull, objectHasKey } from '../../utilities/utilities';
import { validate } from '../../utilities/validator';
import 'react-toastify/dist/ReactToastify.css';
import ValidationRule from './Validation';
import ValidationRuleWithPassword from './ValidationWithPassword';
import { uploadFileS3Bucket } from '../../utilities/uploadFileS3Bucket';
import { UpdateProfile, GetProfile } from '../../Redux/Actions/ProfileAction';

class Adminprofile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ProfileError: false,
			ProfileErrorMessage: '',
			email: localStorage.getItem('email'),
			password: '',
			fullName: '',
			confirmpassword: '',
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	onSubmit = async (ev) => {
		ev.preventDefault();

		let profileData;
		let Field;
		if (this.state.password) {
			profileData = {
				password: this.state.password,
				fullName: this.state.fullName,
				email: this.state.email,
			};
		} else {
			profileData = {
				fullName: this.state.fullName,
				email: this.state.email,
			};
		}

		if (this.state.password) {
			Field = {
				fullName: this.state.fullName,
				email: this.state.email,
				password: this.state.password,
				confirmpassword: this.state.password,
				confirmpasswordConfirm: this.state.confirmpassword,
			};
		} else {
			Field = {
				fullName: this.state.fullName,
				email: this.state.email,
			};
		}

		if (this.Validation(Field, this.state.password ? ValidationRuleWithPassword : ValidationRule)) {
			this.props.UpdateAdminprofile(profileData);
		}
	};

	Validation = (Field, ValidationRule) => {
		let res = validate(Field, ValidationRule);
		if (res.errors) {
			this.setState((prevState) => ({
				...prevState,
				ProfileError: {
					fullName: res.errors.fullName ? true : false,
					email: res.errors.email ? true : false,
					password: res.errors.password ? true : false,
					confirmpassword: res.errors.confirmpasswordConfirm ? true : false,
				},
				ProfileErrorMessage: res.errors,
			}));
		}
		return res.isValid;
	};

	componentDidMount() {
		if (localStorage.getItem('sessionId')) {
			let data = { adminId: localStorage.getItem('adminId') };
			this.props.getAdminProfile(data);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.ProfileFailureMessage !== prevProps.ProfileFailureMessage &&
			this.props.ProfileFailureMessage !== ''
		) {
			toast.error(this.props.ProfileFailureMessage);
		}
		if (
			this.props.ProfileSuccessMessage !== prevProps.ProfileSuccessMessage &&
			this.props.ProfileSuccessMessage !== ''
		) {
			toast.success('profile updated successfully');
			if (localStorage.getItem('adminId')) {
				let data = { adminId: localStorage.getItem('adminId') };
				this.props.getAdminProfile(data);
			}
		}
		if (this.props.ProfileData !== prevProps.ProfileData && this.props.ProfileData) {
			this.setState({
				email: this.props.ProfileData.email,
				profilePic: this.props.ProfileData.profilePic,
				fullName: this.props.ProfileData.fullName,
			});
		}
	}

	handleUploadCategoryImage = (e) => {
		e.persist();
		if (e.target.files && e.target.files[0]) {
			// if (state.isSubmit) {
			//     let validationFields = {
			//         categoryImage: e.target.files[0],
			//         categoryName: state.categoryName ? state.categoryName : '',
			//         backgroundColor: state.backgroundColor ? state.backgroundColor : '',
			//         description: state.description ? state.description : ''
			//     }
			//     return validation(true, validationFields, categoryValidationRule)
			// }
			this.setState({
				profilePic: e.target.files[0],
				isImageUpdated: true,
			});
		}
	};

	render() {
		return (
			<div className="Profile-view admin__pd">
				<div className="subs-head">
					<ToastContainer autoClose={8000} />

					<div>
						<h2 className="secondary-heading1">
							Admin <span>Profile</span> section.
						</h2>
					</div>
					<div className="subs-his"></div>
				</div>

				<this.step1 {...this.state} />
			</div>
		);
	}

	step1 = () => {
		return (
			<div className="Profile-card-list">
				<div className="Profile-card Profile-card-light">
					<div className="Profile-card-right" style={{ width: '100%', borderRadius: '20px' }}>
						<div className="Profile-card-right-body">
							<div
								style={{
									width: '100%',
									padding: '10px',
								}}
							>
								<div className="Profile-card-description-list">
									<div className="Profile-card-description-list-item">
										<div className="row">
											<div className="col-md-5 m-2-Tr">
												<div className="form-group"></div>
											</div>
											<div className="col-12">
												<Input
													label="Full Name"
													type="text"
													maxLength={20}
													placeholder="Your Name.."
													name="fullName"
													errStatus={
														objectHasKey(this.state.ProfileError, 'fullName')
															? this.state.ProfileError.fullName
															: false
													}
													errmsg={
														objectHasKey(this.state.ProfileErrorMessage, 'fullName')
															? this.state.ProfileErrorMessage.fullName
															: ''
													}
													required={true}
													value={this.state.fullName}
													onChange={(e) => this.handleChange(e)}
												/>
											</div>
											<div className="col-12">
												<Input
													label="Email"
													type="email"
													maxLength={50}
													placeholder="Your email address.."
													name="email"
													errStatus={
														objectHasKey(this.state.ProfileError, 'email')
															? this.state.ProfileError.email
															: false
													}
													errmsg={
														objectHasKey(this.state.ProfileErrorMessage, 'email')
															? this.state.ProfileErrorMessage.email
															: ''
													}
													required={true}
													value={this.state.email}
													onChange={(e) => this.handleChange(e)}
												/>
											</div>

											<div className="col-sm-12 col-md-6 col-lg-12">
												<Input
													label="Password"
													type="password"
													name="password"
													value={this.state.password}
													errStatus={
														objectHasKey(this.state.ProfileError, 'password')
															? this.state.ProfileError.password
															: false
													}
													errmsg={
														objectHasKey(this.state.ProfileErrorMessage, 'password')
															? this.state.ProfileErrorMessage.password
															: ''
													}
													onChange={(e) => this.handleChange(e)}
												/>
											</div>
											<div className="col-sm-12 col-md-6 col-lg-12">
												<Input
													label="Confirm Password"
													errStatus={
														objectHasKey(this.state.ProfileError, 'confirmpassword')
															? this.state.ProfileErrorMessage.confirmpasswordConfirm
															: false
													}
													errmsg={
														objectHasKey(this.state.ProfileErrorMessage, 'confirmpasswordConfirm')
															? this.state.ProfileErrorMessage.confirmpasswordConfirm
															: ''
													}
													type="password"
													name="confirmpassword"
													value={this.state.confirmpassword}
													onChange={(e) => this.handleChange(e)}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row mt-4">
								<div className="col-12 text-center">
									<Button
										name="Apply Changes"
										id="profilechange"
										onClick={(e) => this.onSubmit(e)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
}

const mapStateToProps = (state) => {
	return {
		isFetching: state.ProfileReducer.isFetching,
		ProfileSuccess: state.ProfileReducer.ProfileSuccess,
		ProfileSuccessMessage: state.ProfileReducer.ProfileSuccessMessage,
		ProfileFailure: state.ProfileReducer.ProfileFailure,
		ProfileFailureMessage: state.ProfileReducer.ProfileFailureMessage,
		ProfileData: state.ProfileReducer.ProfileData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		UpdateAdminprofile: (data) => dispatch(UpdateProfile(data)),
		getAdminProfile: (data) => dispatch(GetProfile(data)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Adminprofile);
