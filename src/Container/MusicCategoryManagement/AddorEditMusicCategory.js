import React, { Component } from 'react';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { objectHasKey } from '../../utilities/utilities';
import ValidationRule from './validation';
import { validate } from '../../utilities/validator';
import { addMusicCategory, editMusicCategory } from '../../Redux/Actions/DashboardAction';
import routeRules from '../../Routes/routeRules';
import { Link } from 'react-router-dom';

class AddorEditMusic extends Component {
	constructor(props) {
		super(props);
		let data = this.props.location.state.MusicCategoryDetails;
		this.state = {
			music_category: data ? data.music_category : '',

			AddorEditMusicCategoryError: false,
			AddorEditMusicCategoryErrorMessage: null,
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;

		this.setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	AddorEditMusicCategory = (ev) => {
		ev.preventDefault();
		let Field;
		if (!this.props.location.state.id) {
			Field = {
				music_category: this.state.music_category,
			};
		} else {
			Field = {
				musicCategoryId: this.props.location.state.id,
				music_category: this.state.music_category,
			};
		}

		if (this.Validation(Field, ValidationRule)) {
			if (!this.props.location.state.id) {
				var request = {
					music_category: this.state.music_category,
				};
				this.props.addMusicCategory(request);
			} else {
				var request = {
					musicCategoryId: this.props.location.state.id,
					music_category: this.state.music_category,
				};
				this.props.editMusicCategory(request);
			}
		}
	};
	Validation = (Field, ValidationRule) => {
		let res = validate(Field, ValidationRule);
		if (res.errors) {
			this.setState((prevState) => ({
				...prevState,
				AddorEditMusicCategoryError: {
					music_category: res.errors.music_category ? true : false,
				},
				AddorEditMusicCategoryErrorMessage: res.errors,
			}));
		}
		return res.isValid;
	};

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.AddorEditMusicCategoryFailureMessage !==
				prevProps.AddorEditMusicCategoryFailureMessage &&
			this.props.AddorEditMusicCategoryFailureMessage !== ''
		) {
			toast.error(this.props.AddorEditMusicCategoryFailureMessage);
		}
		if (
			this.props.AddorEditMusicCategorySuccessMessage !==
				prevProps.AddorEditMusicCategorySuccessMessage &&
			this.props.AddorEditMusicCategorySuccessMessage !== ''
		) {
			toast.success(this.props.AddorEditMusicCategorySuccessMessage);
		}
	}

	render() {
		return (
			<div className="AddorEditMusicCategory-view">
				<div className="container">
					<ToastContainer autoClose={8000} />
					<div className="row"></div>
					<div className="row">
						<div className="col-12">
							<div className="primary-card">
								<div className="d-flex justify-content-between align-items-center">
									<div>
										<h5 className="primary-heading">
											{this.props.location.state.id ? 'Edit Music' : 'Create New Music'}
										</h5>
										<h2 className="secondary-heading1 mt-3">
											Fill the details to {this.props.location.state.id ? 'edit' : 'create'} Music
										</h2>
									</div>
									<Link
										to={{
											pathname: routeRules.musicCategory,
										}}
										className="adduserbtn"
									>
										{' '}
										Back
									</Link>
								</div>
								<form
									onSubmit={this.AddorEditMusicCategory}
									action=""
									name="AddorEditMusicCategory"
								>
									<div className="row">
										<div className="col-sm-12 ">
											<Input
												label="Name"
												id="music_category"
												placeholder="Type your music here.."
												name="music_category"
												maxLength={2000}
												errStatus={
													objectHasKey(this.state.AddorEditMusicCategoryError, 'music_category')
														? this.state.AddorEditMusicCategoryError.music_category
														: false
												}
												errmsg={
													objectHasKey(
														this.state.AddorEditMusicCategoryErrorMessage,
														'music_category'
													)
														? this.state.AddorEditMusicCategoryErrorMessage.music_category
														: ''
												}
												// required={true}
												value={this.state.music_category}
												onChange={(e) => this.handleChange(e)}
											/>
										</div>
									</div>

									<div className="row mt-3">
										<div className="col-12 text-center">
											<Button
												name={this.props.location.state.id ? 'Edit Music' : 'Create new Music'}
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
		AddorEditMusicCategorySuccess: state.DashBoardReducer.AddorEditMusicCategorySuccess,
		AddorEditMusicCategorySuccessMessage:
			state.DashBoardReducer.AddorEditMusicCategorySuccessMessage,
		AddorEditMusicCategoryFailure: state.DashBoardReducer.AddorEditMusicCategoryFailure,
		AddorEditMusicCategoryFailureMessage:
			state.DashBoardReducer.AddorEditMusicCategoryFailureMessage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addMusicCategory: (data) => dispatch(addMusicCategory(data)),
		editMusicCategory: (data) => dispatch(editMusicCategory(data)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AddorEditMusic);
