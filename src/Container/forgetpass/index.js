import React, { Component } from 'react';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
// import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { ForgotPassword } from '../../Redux/Actions/ProfileAction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// forgotPassword
class ForgotPasswordComp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
		};
	}

	forgotPassword = () => {
		let data = {
			email: this.state.email,
		};
		if (this.state.email) {
			this.props.forgotPassword(data);
		} else {
			toast.error("Email field can't be empty");
		}
	};

	handleInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentDidUpdate(prevProps, prevState) {
		console.log('this.props.ForgotPassSuccessMessage :----->', this.props.ForgotPassSuccessMessage);
		console.log(
			'prevProps.ForgotPassSuccessMessage :-------->',
			prevProps.ForgotPassSuccessMessage
		);
		if (
			prevProps.ForgotPassSuccessMessage !== this.props.ForgotPassSuccessMessage &&
			this.props.ForgotPassSuccessMessage
		) {
			toast.success('Mail has been sent please check your mail');
		} else if (prevProps.ForgotPassFailureMessage !== this.props.ForgotPassFailureMessage) {
			if (this.props.ForgotPassFailureMessage !== '') {
				toast.error(this.props.ForgotPassFailureMessage);
			}
		}
	}

	render() {
		return (
			<div className="forget-pass-view">
				<ToastContainer autoClose={8000} />
				<div className="container">
					<div className="row">
						<div className="col-12 text-center">
							<h2 className="secondary-heading1">Forget Your Password</h2>
							<p className="primary-para">
								Please enter your email address to recieve your password.
							</p>
						</div>
					</div>
					<div className="row" style={{ justifyContent: 'center' }}>
						<div className="col-sm-12 col-md-12 col-lg-6">
							<div className="primary-card">
								<div className="row">
									<div className="col-12">
										<Input
											label="Email Address"
											type="email"
											onChange={this.handleInputChange}
											value={this.state.email}
											name="email"
											placeholder="Your email address"
										/>
									</div>
								</div>
								<div className="row mt-4">
									<div className="col-12 text-center">
										<Button name="Submit Now!" onClick={this.forgotPassword} />
									</div>
								</div>
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
		isFetching: state.ProfileReducer.isFetching,
		ForgotPassSuccess: state.ProfileReducer.ForgotPassSuccess,
		ForgotPassSuccessMessage: state.ProfileReducer.ForgotpassSuccessMessage,
		ForgotPassFailure: state.ProfileReducer.ForgotPassFailure,
		ForgotPassFailureMessage: state.ProfileReducer.ForgotpassFailureMessage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		forgotPassword: (data) => dispatch(ForgotPassword(data)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordComp);
