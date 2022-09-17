import React, { Component } from 'react';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { objectHasKey } from '../../utilities/utilities';
import ValidationRule from './validation';
import { validate } from '../../utilities/validator';
import { Basepath } from '../../config';
import { addEvent } from '../../Redux/Actions/DashboardAction';
import routeRules from '../../Routes/routeRules';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
class AddorEditEvent extends Component {
	constructor(props) {
		super(props);
		let data = this.props.location.state.EventCategoryDetails;
		console.log(data)
		this.state = {
			categoryList:[],
			event_category: data ? data.event_category : '',
			event_name: data ? data.event_name : '',
			start_time:data?new Date(data.event_date) : '',
			event_date: data ? new Date(data.event_date) : '',
			end_time:data?new Date(data.event_date) : '',
			event_duration: data ? data.event_duration : '',
			event_description:data?data.event_description:'',
			special_requirement_message: data ? data.special_requirement_message : '',
			
		};
	}
	componentDidMount() {
		let fetchData = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authenticate: localStorage.getItem('sessionId'),
			},
			
		};
		fetch(`${Basepath}/api/admin/getEventCategory`, fetchData)
			.then((response) => response.json())
			.then((data) => {
				if (data.statusCode == 200) {
					this.setState({
						categoryList: data.data
					});
				} 
			});
	}
	handleChange = (e) => {
		const { name, value } = e.target;
		console.log( name, value )
		this.setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	handleChange_date = date => {
      console.log(date)
		this.setState({
			event_date: date
		});
	  };
	
	  handleChange_start = date => {
		
		this.setState({
			start_time: date
		},()=>this.calculateDuration());
	  };
	  handleChange_end = date => {
		
		this.setState({
			end_time: date
		},()=>this.calculateDuration());
	  };
	  onSelectChange = (e) => {
		this.setState({ event_category: e.target.value });
	};

	AddorEditEventCategory = (ev) => {
		ev.preventDefault();
		
		if (!this.props.location.state.id) {
			var request = {
				event_name: this.state.event_name ,
				event_category: this.state.event_category ,
				start_time:this.state.start_time,
				event_date: this.state.event_date,
				end_time:this.state.end_time,
				event_duration: this.state.event_duration,
				event_description:this.state.event_description,
				special_requirement_message: this.state.special_requirement_message ,
				is_completed_stream:0,
				payment_status:0,
				unique_stream_id:0,
			};
			this.props.addEvent(request);
		} else {
			var request = {
				event_id: this.props.location.state.id,
				event_category: this.state.event_category ,
				event_name: this.state.event_name ,
				start_time:this.state.start_time,
				event_date: this.state.event_date,
				end_time:this.state.end_time,
				event_duration: this.state.event_duration,
				event_description:this.state.event_description,
				special_requirement_message: this.state.special_requirement_message ,
				is_completed_stream:0,
				payment_status:0,
				unique_stream_id:0,
			};
			this.props.addEvent(request);
		}
	};
	
	calculateDuration(){
		var start = this.state.start_time
		var end  = this.state.end_time
		if(start && end ){
			var diff = this.diff(moment(start).format('yyyy/MM/DD HH:mm:ss'),moment(end).format('yyyy/MM/DD HH:mm:ss') );
			var string ='';
			if(diff.d>0){
				string = string+diff.d+" days ";
			}
			if(diff.h>0){
				string = string+diff.h+" hours ";
			}
			if(diff.m>0){
				string = string+diff.m+" min ";
			}
		}
		this.setState({
			event_duration: string
		});
	  };
	
	diff(str1,str2){
		console.log(str1,str2)
		if(str1, str2 ){
			var diff = Date.parse( str2 ) - Date.parse( str1 ); 
			return isNaN( diff ) ? NaN : {
				diff : diff,
				ms : Math.floor( diff            % 1000 ),
				s  : Math.floor( diff /     1000 %   60 ),
				m  : Math.floor( diff /    60000 %   60 ),
				h  : Math.floor( diff /  3600000 %   24 ),
				d  : Math.floor( diff / 86400000        )
			};
		}
	}
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
										<h1 className="primary-heading">
											{this.props.location.state.id ? 'Edit Event' : 'Create New Event'}
										</h1>
										<h2 className="secondary-heading1">
											Fill the details to {this.props.location.state.id ? 'edit' : 'create'} Event
										</h2>
									</div>
									<Link
										to={{
											pathname: routeRules.event,
										}}
										className="addEventCategorybtn"
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
												label="Event Name"
												id="event_name"
												placeholder="Type your event here.."
												name="event_name"
												maxLength={2000}
												required={true}
												value={this.state.event_name}
												onChange={(e) => this.handleChange(e)}
											/>
											</div>
											<div className="col-sm-12 ">
											<div className="inputGroup">
												<label className="inputLabel">
													Event Date
												</label>
											</div>
											<DatePicker
											style={{height:"40px"}}
											className="colji"
												placeholderText="Event Date"
												dateFormat="dd/MM/yyyy"
												required={true}
												selected={this.state.event_date}
												onChange={this.handleChange_date}
											/>
											</div>
											<div className="col-sm-12 ">
											<div className="inputGroup">
												<label className="inputLabel">
													Start Time
												</label>
											</div>
											<DatePicker
											style={{height:"40px"}}
											className="colji"
											required={true}
												placeholderText="Start Time"
												dateFormat="dd/MM/yyyy HH:mm:ss"
												showTimeSelect
												timeIntervals={15}
												selected={this.state.start_time}
												onChange={this.handleChange_start}
											/>
											</div>
											<div className="col-sm-12 ">
											<div className="inputGroup">
												<label className="inputLabel">
													End Time
												</label>
											</div>	
											<DatePicker
											style={{height:"40px"}}
											className="colji"
											required={true}
												placeholderText="End Time"
												dateFormat="dd/MM/yyyy HH:mm:ss"
												showTimeSelect
												timeIntervals={15}
												selected={this.state.end_time}
												onChange={this.handleChange_end}
											/>
											<Input
												label="Event Duration"
												id="event_duration"
												placeholder="0"
												name="event_duration"
												maxLength={200}
												value={this.state.event_duration}
												disabled={true}
											/>
										</div>
										<br/>
										<div className="col-sm-12 ">
										<div className="inputGroup">
												<label className="inputLabel">
													Select Category
												</label>
											</div>	
										<label>
											<select
												className="green-select"
												style={{ marginTop: '0px', width:"500px" }}
												onChange={(e) => this.onSelectChange(e)}
												name="event_category"
												value={this.state.event_category}
											>
												{this.state.categoryList.map((cat, index) => {
													return (
														<option key={index} value={cat.event_category}>{cat.event_category}</option>
													)
												})}
												
											</select>
										</label>
									
										</div>
										<div className="col-sm-12 ">
										<div className="inputGroup">
												<label className="inputLabel">
												Event Description
												</label>
											</div>	
											<textarea rows="6" cols="100" value={this.state.event_description} name="event_description" onChange={(e) => this.handleChange(e)}>

											</textarea >
											<div className="inputGroup">
												<label className="inputLabel">
												Message
												</label>
											</div>	
											<textarea rows="6" cols="100" value={this.state.special_requirement_message} name="special_requirement_message" onChange={(e) => this.handleChange(e)}>

											</textarea >
										
											{/* <Input
												label="Event Description"
												id="event_description"
												placeholder="Type your event here.."
												name="event_description"
												maxLength={2000}
												 required={true}
												value={this.state.event_description}
												onChange={(e) => this.handleChange(e)}
											/> */}
											{/* <Input
												label="Message"
												id="special_requirement_message"
												placeholder="Type your event here.."
												name="special_requirement_message"
												maxLength={2000}
												
												value={this.state.special_requirement_message}
												onChange={(e) => this.handleChange(e)}
											/> */}
											
										</div>
									</div>

									<div className="row">
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
		addEvent: (data) => dispatch(addEvent(data)),
		
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AddorEditEvent);
