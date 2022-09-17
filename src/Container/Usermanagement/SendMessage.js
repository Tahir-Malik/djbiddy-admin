// import React, { Component } from "react";
// import CustomModal from "../../Components/modal";
// import { toast, ToastContainer } from "react-toastify";
// import msgValidationRule from './validationRule/msgValidate';
// import { validate } from '../../utilities/validator';
// import { notNull, objectHasKey, defaultDate, arrayNotNull } from '../../utilities/utilities';
// import ErrorMessage from "../../Components/errorMessage";
// // import MessageCard from "../MessageManagement/MessageCard";
// import { connect } from "react-redux";
// import { getMessageDetails, sendAdminMessageResponse } from "../../Redux/Actions/DashboardAction";


// class SendMessage extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             activeData: null,
//             messageDetails: null,
//             textMessage: "",
//             adminId: "",
//             messageId: "",
//             chats: [],
//             userId: ""
//         };
//     }

//     componentDidMount() {
//         if (this.props.activeMessageData) {
//             let { _id: userId } = this.props.activeMessageData;
//             let adminId = localStorage.getItem("adminId");
//             this.setState({
//                 adminId,
//                 messageId: "",
//                 userId: userId,
//                 activeData: this.props.activeMessageData
//             });
//             let data = { adminId, messageId: "", userId }
//             this.props.getMessageDetails(data);
//         }
//     }

//     componentDidUpdate(prevProps, prevState) {
//         console.log('this.props.QueryDetailsData :----->', this.props.QueryDetailsData)
//         if (this.props.QueryDetailsData !== prevProps.QueryDetailsData && this.props.QueryDetailsData !== null) {
//             this.setState({
//                 messageDetails: this.props.QueryDetailsData,
//                 chats: this.props.QueryDetailsData.chats
//             })
//         }
//         if (this.props.SendAdminQueryResponseSuccessMessage !== prevProps.SendAdminQueryResponseSuccessMessage && this.props.SendAdminQueryResponseSuccessMessage !== "") {
//             toast.success("Message send successfully.");
//         }
//     }

//     sendMessage = async (e) => {
//         if (e)
//             e.preventDefault();
//         if (this.state.textMessage === "") {
//             toast.error("please Add message text");
//             return null
//         }
//         const message = {
//             messageId: this.state.messageId,
//             message: this.state.textMessage,
//             senderType: 'Admin',
//             adminId: this.state.adminId,
//             receiverId: this.state.userId
//         };
//         this.props.sendAdminMessageResponse(message);
//         this.setState(prevState => {
//             return {
//                 ...prevState,
//                 textMessage: ""
//             };
//         });
//     };

//     handleInputChange = ({ target }) => {
//         this.setState(prevState => {
//             return {
//                 ...prevState,
//                 [target.name]: target.value
//             };
//         });
//     };

//     render() {
//         const { messageDetails, chats, activeData } = this.state;
//         return (
//             <CustomModal show={this.props.show} hidePopup={this.props.hidePopup}>
//                 <div className="modal-header">
//                     <h5 className="modal-title"> Send Message </h5>
//                     <button
//                         onClick={this.props.hidePopup}
//                         type="button"
//                         className="close"
//                         data-dismiss="modal"
//                         aria-label="Close"
//                     >
//                         <span aria-hidden="true">&times;</span>
//                     </button>
//                 </div>
//                 <div className="modal-body">
//                     <div className="">
//                         <div className="needs-validation">
//                             <div className="form-row">
//                                 <div className="col-md-12">

//                                     <div className="message-inbx">
//                                         <div className="row">
//                                             <div className="col-md-12">
//                                                 <div className="chat">
//                                                     <div className="chat-header clearfix">
//                                                         <img src={notNull(activeData) && objectHasKey(activeData, 'profileImage') && notNull(activeData.profileImage) ? activeData.profileImage : "/assets/images/profile-pic.jpeg"} alt="avatar" />
//                                                         <div className="chat-about">
//                                                             <div className="chat-with">{notNull(activeData) && objectHasKey(activeData, 'firstName') ? `${activeData.firstName} ${activeData.lastName}` : ''}</div>
//                                                         </div>
//                                                         <div className="chat-about">
//                                                             <div className="notification-box">
//                                                                 <div className="btn-group show">
//                                                                     <a className="p-0 btn"><i className="pe-7s-bell"> </i><span className="badge badge-pill badge-warning">{arrayNotNull(chats) ? chats.length : 0}</span></a>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className="chat-history" style={{ height: "280px" }} id="style-1">
//                                                         <ul>
//                                                             {
//                                                                 arrayNotNull(chats) &&
//                                                                 chats.map((msg, index) => {
//                                                                     const isSender = msg.senderType === "User";
//                                                                     const name = isSender ?
//                                                                         `${messageDetails.user.firstName} ${messageDetails.user.lastName}` :
//                                                                         `${messageDetails.admin.name}`;
//                                                                     return (
//                                                                         <MessageCard
//                                                                             key={msg._id}
//                                                                             name={name}
//                                                                             time={msg.createdDate}
//                                                                             message={msg.text}
//                                                                             senders={isSender}
//                                                                             isDeleted={false}
//                                                                             files={msg.files}
//                                                                         />
//                                                                     )
//                                                                 })
//                                                             }
//                                                         </ul>
//                                                     </div>
//                                                     <div className="chat-message clearfix">
//                                                         <div className="chhose-file">
//                                                             <ul className="felx-bx">
//                                                                 <li className="text-area">
//                                                                     <textarea
//                                                                         name="textMessage"
//                                                                         value={this.state.textMessage}
//                                                                         placeholder="Send a message..."
//                                                                         onChange={this.handleInputChange}
//                                                                         rows="3"
//                                                                     ></textarea>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                         {/* <button onClick={sendMessage} className="adduserbtn">Send Message</button> */}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </div>
//                                 <div className="col-sm-12 buttons-cs bottom-btn-add" style={{ justifyContent: "flex-end", display: "flex" }}>
//                                     <button onClick={this.sendMessage} className="mb-2 mr-2 btn btn-focus adduserbtn">Send Message
//                                     </button>
//                                     <button onClick={this.props.hidePopup} className="mb-2 mr-2 btn btn-danger adduserbtn">Cancel</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </CustomModal>
//         );
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         QueryDetailsData: state.DashBoardReducer.QueryDetailsData,
//         SendAdminQueryResponseSuccess: state.DashBoardReducer.SendAdminQueryResponseSuccess,
//         SendAdminQueryResponseSuccessMessage: state.DashBoardReducer.SendAdminQueryResponseSuccessMessage,
//         SendAdminQueryResponseFailure: state.DashBoardReducer.SendAdminQueryResponseFailure,
//         SendAdminQueryResponseFailureMessage: state.DashBoardReducer.SendAdminQueryResponseFailureMessage,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getMessageDetails: (data) => dispatch(getMessageDetails(data)),
//         sendAdminMessageResponse: (data) => dispatch(sendAdminMessageResponse(data)),
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);
