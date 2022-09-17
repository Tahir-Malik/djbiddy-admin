import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Input from '../../Components/LoginInput';
import Button from '../../Components/Button';
import { Link } from 'react-router-dom';
import { objectHasKey } from '../../utilities/utilities';
import 'react-toastify/dist/ReactToastify.css';
import routeRules from '../../Routes/routeRules';
import { connect } from 'react-redux';
import ValidationRule from './Validation';
import { HandleSignIn } from '../../Redux/Actions/SignInAction';
import { validate } from '../../utilities/validator';

import './login.css';
import logo from './logo1.png';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: this.props.rememberMe ? this.props.email : '',
			password: '',
			LoginError: '',
			LoginErrorMessage: null,
			rememberMe: this.props.rememberMe ? true : false,
		};
	}

	componentDidMount() {
		if (localStorage.getItem('sessionId')) {
			this.props.history.push(routeRules.dashboard);
		}
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.SignInSuccessMessage !== prevProps.SignInSuccessMessage &&
			this.props.SignInSuccessMessage !== ''
		) {
			this.props.history.push(routeRules.dashboard);
		} else if (
			this.props.SignInFailure !== prevProps.SignInFailure &&
			this.props.SignInFailureMessage !== ''
		) {
			toast.error('Email or password was incorrect');
		}
	}

	loginrequest = (ev) => {
		ev.preventDefault();
		var request = { email: this.state.email, password: this.state.password };
		if (this.Validation(request, ValidationRule)) {
			this.props.ReqSignIn(request, this.state.rememberMe);
		}
	};

	Validation = (Field, Rule) => {
		let res = validate(Field, Rule);
		if (res.errors) {
			this.setState((prevState) => ({
				...prevState,
				LoginError: {
					email: res.errors.email ? true : false,
					password: res.errors.password ? true : false,
				},
				LoginErrorMessage: res.errors,
			}));
		}
		return res.isValid;
	};
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<img src={logo} className="logo"></img>
					</div>
				</div>
				<ToastContainer autoClose={8000} />
				<div className="d-flex justify-content-center">
					<div className="card mt-2">
						<div className="card-header">
							<div className="text-center login-first-heading text-white my-4">Admin Login</div>
							<div className="text-center login-second-heading text-white">
								Login to your profile
							</div>
						</div>
						<div className="card-body">
							<form>
								<Input
									label="Email Address"
									type="email"
									maxLength={50}
									placeholder="Your email address.."
									name="email"
									errStatus={
										objectHasKey(this.state.LoginError, 'email')
											? this.state.LoginError.email
											: false
									}
									errmsg={
										objectHasKey(this.state.LoginErrorMessage, 'email')
											? this.state.LoginErrorMessage.email
											: ''
									}
									required={true}
									value={this.state.email}
									onChange={(e) => this.handleChange(e)}
								/>
								<Input
									containerClass="mt-4"
									label="Password"
									type="password"
									placeholder="Your password.."
									required={true}
									name="password"
									errStatus={
										objectHasKey(this.state.LoginError, 'password')
											? this.state.LoginError.password
											: false
									}
									errmsg={
										objectHasKey(this.state.LoginErrorMessage, 'password')
											? this.state.LoginErrorMessage.password
											: ''
									}
									value={this.state.password}
									onChange={(e) => this.handleChange(e)}
								/>
								<div className="row">
									<div className="col-12 forget-row">
										<Link to={routeRules.forget}>
											<div className="forget-pass">Forget Password?</div>
										</Link>
									</div>
								</div>
								<div className="form-group text-center login-div">
									<input
										type="submit"
										value="Sign In"
										className="btn login_btn"
										onClick={this.loginrequest}
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			// <div className="login-view">
			//   <div className="container">
			//     <ToastContainer autoClose={8000} />
			//     <div className="row">
			//       <div className="col-12">
			//         <h1 className="primary-heading">Admin Login</h1>
			//         <h2 className="secondary-heading">Login to your profile</h2>
			//       </div>
			//     </div>
			//     <div className="row" style={{ justifyContent: "center" }} >
			//       <div className="col-sm-12 col-md-12 col-lg-6">
			//         <div className="primary-card">
			//           <div className="row">
			//             <div className="col-12">
			//               <Input
			//                 label="Email Address"
			//                 type="email"
			//                 maxLength={50}
			//                 placeholder="Your email address.."
			//                 name="email"
			//                 errStatus={
			//                   objectHasKey(this.state.LoginError, "email")
			//                     ? this.state.LoginError.email
			//                     : false
			//                 }
			//                 errmsg={
			//                   objectHasKey(this.state.LoginErrorMessage, "email")
			//                     ? this.state.LoginErrorMessage.email
			//                     : ""
			//                 }
			//                 required={true}
			//                 value={this.state.email}
			//                 onChange={(e) => this.handleChange(e)}
			//               />
			//             </div>
			//             <div className="col-12">
			//               <Input
			//                 label="Password"
			//                 type="password"
			//                 placeholder="Your password.."
			//                 required={true}
			//                 name="password"
			//                 errStatus={
			//                   objectHasKey(this.state.LoginError, "password")
			//                     ? this.state.LoginError.password
			//                     : false
			//                 }
			//                 errmsg={
			//                   objectHasKey(this.state.LoginErrorMessage, "password")
			//                     ? this.state.LoginErrorMessage.password
			//                     : ""
			//                 }
			//                 value={this.state.password}
			//                 onChange={(e) => this.handleChange(e)}
			//               />
			//             </div>
			//           </div>

			//           <div className="row">
			//             <div className="col-12 forget-row">
			//               <div>
			//                 <label className="cc">
			//                   Remember me
			//                   <input type="checkbox"
			//                     checked={this.state.rememberMe}
			//                     onChange={(e) =>
			//                       this.setState({
			//                         rememberMe: !this.state.rememberMe,
			//                       })
			//                     }
			//                   />
			//                   <span className="cm"></span>
			//                 </label>
			//               </div>
			//               <Link to={routeRules.forget}>
			//                 <div className="forget-pass">Forget Password?</div>
			//               </Link>
			//             </div>
			//           </div>
			//           <div className="row">
			//             <div className="col-12">
			//               <Button name="Sign In" onClick={this.loginrequest} />
			//             </div>
			//           </div>
			//         </div>
			//       </div>
			//     </div>
			//   </div>
			// </div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		SignInSuccess: state.SignInReducer.SignInSuccess,
		SignInSuccessMessage: state.SignInReducer.SignInSuccessMessage,
		SignInFailure: state.SignInReducer.SignInFailure,
		SignInFailureMessage: state.SignInReducer.SignInFailureMessage,
		SignInData: state.SignInReducer.SignInData,
		email: state.SignInReducer.email,
		rememberMe: state.SignInReducer.rememberMe,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		ReqSignIn: (data, rem) => dispatch(HandleSignIn(data, rem)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
