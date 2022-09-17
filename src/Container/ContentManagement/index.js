import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import DashboardHead from '../../Components/shared/DashboardHead';
import 'react-quill/dist/quill.snow.css';
import { AddEditContent, getContentData } from '../../Redux/Actions/ContentManageAction';
import Button from '../../Components/Button';
import './newcss.css';
import 'react-toastify/dist/ReactToastify.css';

class ContentManagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			content: 'privacy',
			contentData: null,
			contentId: '',
		};
	}

	componentDidMount() {
		this.props.getContentData();
	}

	handleDataChange = (e) => {
		if (e.target.value === 'privacy') {
			this.setState({
				content: e.target.value,
				text: this.state.contentData.privacyPolicy,
			});
		} else if (e.target.value === 'term') {
			this.setState({
				content: e.target.value,
				text: this.state.contentData.termsAndConditions,
			});
		}
	};

	handleChange = (value) => {
		this.setState({ text: value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.content === 'privacy') {
			let data = { contentId: this.state.contentId, privacyPolicy: this.state.text };
			this.props.AddEditContent(data);
		}
		if (this.state.content === 'term') {
			let data = { contentId: this.state.contentId, termsAndConditions: this.state.text };
			this.props.AddEditContent(data);
		}
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.props.ContentData !== prevProps.ContentData && this.props.ContentData) {
			this.setState({
				text:
					this.state.content && this.state.content === 'privacy'
						? this.props.ContentData.privacyPolicy
						: this.state.content === 'term'
						? this.props.ContentData.termsAndConditions
						: this.props.ContentData.privacyPolicy,
				content: this.state.content ? this.state.content : 'privacy',
				contentData: this.props.ContentData,
				contentId: this.props.ContentData.id,
			});
		}
		if (
			this.props.ContentManageSuccessMessage !== prevProps.ContentManageSuccessMessage &&
			this.props.ContentManageSuccessMessage
		) {
			toast.success(this.props.ContentManageSuccessMessage);
			this.props.getContentData();
		}
	}

	render() {
		return (
			<div className="FormAndHidden">
				<ToastContainer autoClose={8000} />
				<DashboardHead
					secondaryHeadingOne="Manage "
					secondaryHeadingTwo={
						this.state.content === 'privacy'
							? ' Privacy Policy'
							: this.state.content === 'term'
							? 'Terms and Conditions'
							: ''
					}
					secondaryHeadingThree=""
					description=""
				/>
				<div className="inputGroup" style={{ display: 'flex', marginBottom: '10px' }}>
					<label className="inputLabel select_hh">Select Content Type</label>
					<div className="col-12 col-md-12 col-lg-4">
						<div className="select_box content">
							<label>
								<select className="green-select" onChange={(e) => this.handleDataChange(e)}>
									<option value="privacy">Privacy Policy</option>
									<option value="term">Terms & Conditions</option>
								</select>
							</label>
						</div>
					</div>
				</div>
				<div className="contentmanage">
					<ReactQuill
						value={this.state.text}
						onChange={this.handleChange}
						className="quil-hgt"
						modules={ContentManagement.modules}
						formats={ContentManagement.formats}
						bounds={'.contentmanage'}
					/>
				</div>
				<div className="row">
					<div
						className="col-12"
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '84px',
						}}
					>
						<br></br>
						<Button name="Submit" onClick={this.handleSubmit} />
					</div>
				</div>
			</div>
		);
	}
}

ContentManagement.modules = {
	toolbar: [
		[{ header: '1' }, { header: '2' }, { font: [] }],
		[{ size: [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote', 'bolder'],
		[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
		['link', 'image', 'video'],
		['clean'],
	],
	clipboard: {
		matchVisual: false,
	},
};
ContentManagement.formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'indent',
	'link',
	'image',
	'video',
];
const mapStateToProps = (state) => {
	return {
		ContentData: state.ContentManagementReducer.ContentData,
		ContentManageSuccess: state.ContentManagementReducer.ContentManageSuccess,
		ContentManageSuccessMessage: state.ContentManagementReducer.ContentManageSuccessMessage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		AddEditContent: (content) => dispatch(AddEditContent(content)),
		getContentData: () => dispatch(getContentData()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ContentManagement);
