import React, { Component } from 'react';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import { Basepath } from '../../config';
import history from '../../Store/history';
import routeRules from '../../Routes/routeRules';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import queryString from 'query-string';
// forgotPassword
class ResetPasswordComp extends Component {
	constructor(props) {
		super(props);
		const value = queryString.parse(this.props.location.search);
		const token = value.token;
		this.state = {
			password: '',
			confirmPassword: '',
			secret: token,
		};
	}

	forgotPassword = () => {
		let data = {
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			secret: this.state.secret,
		};
		if (!this.state.password) {
			toast.error("Password field can't be empty");
		} else if (!this.state.confirmPassword) {
			toast.error("confirm Password field can't be empty");
		} else if (this.state.password == this.state.confirmPassword) {
			let fetchData = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			};
			fetch(`${Basepath}/auth/verify-forgot`, fetchData)
				.then((response) => response.json())
				.then((data) => {
					if (data.statusCode == 400) {
						toast.error(data.message);
					} else {
						console.log('verify forgot :------>', data);
						toast.success(data.message);
						history.push(routeRules.landingPage, toast.success(data.message));
					}
				});
		} else {
			toast.error('confirm Password must be match to password');
		}
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<div className="reset-pass-view">
				<div className="container">
					<ToastContainer autoClose={8000} />
					<div className="row">
						<div className="col-12 text-center">
							<h2 className="secondary-heading1">Reset Your App Admin Password</h2>
						</div>
					</div>
					<div className="row" style={{ justifyContent: 'center' }}>
						<div className="col-sm-12 col-md-12 col-lg-6">
							<div className="primary-card">
								<div className="row">
									<div className="col-12">
										<Input
											label="New Password"
											type="password"
											placeholder="New Password"
											name="password"
											value={this.state.password}
											onChange={(e) => this.handleChange(e)}
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-12">
										<Input
											label="Confirm Password"
											type="password"
											placeholder="Password"
											name="confirmPassword"
											value={this.state.confirmPassword}
											onChange={(e) => this.handleChange(e)}
										/>
									</div>
								</div>
								<div className="row mt-4">
									<div className="col-12 text-center">
										<Button name="Set Password!" onClick={this.forgotPassword} />
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

export default ResetPasswordComp;
