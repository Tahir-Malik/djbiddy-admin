import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getPostDetails } from "../../Redux/Actions/PostManageAction";
import { notNull, arrayNotNull, objectHasKey } from "../../utilities/utilities";
import { Spring } from 'react-spring/renderprops';
import routeRules from "../../Routes/routeRules";
import { Link } from "react-router-dom";
import "../../../node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";

class PostDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: "",
            postlist: null,
            redirect: null
        };
    }

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.id) {
            const data = { postId: this.props.location.state.id }
            this.props.getPostDetails(data)
            this.setState({
                postId: this.props.location.state.id,
                redirect: this.props.location.state.redirect
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('this.props.PostDetailsData :----->', this.props.PostDetailsData)
        if (this.props.PostDetailsData !== prevProps.PostDetailsData && this.props.PostDetailsData) {
            this.setState({
                postDetail: this.props.PostDetailsData
            });
        }
    }

    render() {
        const postDetail = notNull(this.state.postDetail) && { ...this.state.postDetail };
        return (
            <div className="autotagging-view">
                <div className="container">
                    <div className="row">
                        <div className="col-12 ">
                            <div className={`UserDetails-sidenav-right`}>
                                <div className="UserDetail-sidenav-right-content">
                                    <div className="sidenav-card sidenav-card-user">
                                        <div className="heading__b">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h2 className="secondary-heading1">Post Details</h2>
                                                <Link
                                                    to={{
                                                        pathname: routeRules.postmanagement
                                                    }}
                                                    className="adduserbtn" > Back
                                    </Link>
                                            </div>
                                        </div>
                                        <div className="sidenav-card-body">
                                            <div className="sidenav-card-left">
                                                <img
                                                    className="sidenav-card-img user__Details__img"
                                                    style={{ borderRadius: "0px" }}
                                                    src={notNull(postDetail) && objectHasKey(postDetail, "profilePic") && postDetail.profilePic ? postDetail.profilePic : "/assets/images/profile-pic.jpeg"}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="sidenav-card-right">
                                                <div className="user__Details_container">
                                                    <div className="user__details_box">
                                                        <div className="sidenav-card-heading">
                                                            Personal Detail
                                                        </div>
                                                        <div className="sidenav-card-para sidenav-card-para-user">
                                                            Full Name:{" "}
                                                            <span>
                                                                {notNull(postDetail) && objectHasKey(postDetail, "fullName") ? postDetail.fullName : ""}
                                                            </span>
                                                        </div>
                                                        <div className="sidenav-card-para sidenav-card-para-user">
                                                            User Name:{" "}
                                                            <span>
                                                                {notNull(postDetail) && objectHasKey(postDetail, "username") ? postDetail.username : ""}
                                                            </span>
                                                        </div>
                                                        <div className="sidenav-card-para sidenav-card-para-user">
                                                            Email:{" "}
                                                            <span>
                                                                {notNull(postDetail) && objectHasKey(postDetail, "email") ? postDetail.email : ""}
                                                            </span>
                                                        </div>
                                                        <div className="sidenav-card-para sidenav-card-para-user">
                                                            Contact No.{" "}
                                                            <span>
                                                                {notNull(postDetail) && objectHasKey(postDetail, "phone") ? postDetail.phone : ""}
                                                            </span>
                                                        </div>
                                                        <div className="sidenav-card-para sidenav-card-para-user">
                                                            Gender :{" "}
                                                            <span>
                                                                {notNull(postDetail) && objectHasKey(postDetail, "gender") ? postDetail.gender && postDetail.gender === 'MALE' ? 'Male' : 'Female' : ""}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="user__details_box">
                                                        <div className="sidenav-card-heading">
                                                            Post Info
                                                        </div>
                                                        <div className="sidenav-card-para sidenav-card-para-user">
                                                            Hashtags :{" "}
                                                            <span>
                                                                {notNull(postDetail) && objectHasKey(postDetail, "hashtags") ? postDetail.hashtags : ""}
                                                            </span>
                                                        </div>
                                                        <div className="sidenav-card-para sidenav-card-para-user">
                                                            Categories :{" "}
                                                            <span>
                                                                {notNull(postDetail) && objectHasKey(postDetail, "categories") ? postDetail.categories : ""}
                                                            </span>
                                                        </div>
                                                        <div className="sidenav-card-para2 sidenav-card-para-user">
                                                            Description :{" "}
                                                            <span>
                                                                {notNull(postDetail) && objectHasKey(postDetail, "description") ? postDetail.description : ""}
                                                            </span>
                                                        </div>
                                                        <div className="sidenav-card-para2 sidenav-card-para-user">
                                                            Uploaded Post :{" "}
                                                            <span style={{ display: "flex", marginLeft: "250px" }}>
                                                                <Player
                                                                    playsInline
                                                                    src={notNull(postDetail) && objectHasKey(postDetail, "mediaUrl") ? postDetail.mediaUrl : "/assets/images/image_available.png"}
                                                                    fluid={false}
                                                                    width={201}
                                                                    height={128}
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
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
        PostDetailsData: state.PostManagementReducer.PostDetailsData,
        PostDetailsSuccess: state.PostManagementReducer.PostDetailsSuccess,
        PostDetailsSuccessMessage: state.PostManagementReducer.PostDetailsSuccessMessage,
        PostDetailsFailure: state.PostManagementReducer.PostDetailsFailure,
        PostDetailsFailureMessage: state.PostManagementReducer.PostDetailsFailureMessage,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getPostDetails: (id) => dispatch(getPostDetails(id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);