import React, { useEffect, useState, Fragment, useRef } from "react";
import axios from 'axios';
import CustomModal from "../../Components/modal";
import challengeValidationRule from './validation';
import { validate } from '../../utilities/validator';
import { objectHasKey, notNull } from "../../utilities/utilities";
import ErrorMessage from "../../Components/errorMessage";
import { Basepath } from "../../config";
import Option from '../../Components/multipleOption';
import Select from 'react-select';
import "../../../node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";

const AddEditChallenge = props => {
    const { show, hidePopup, AddEditChallengeAction, activeChallengedata } = props;
    const initialState = {
        challengeError: false,
        challengeErrorMessage: "",
        challengeName: "",
        description: "",
        challengePostVideo: "",
        challengeId: null,
        isSubmit: false,
        isVideoUpdated: false,
        selectedHashtagOption: [],
        populatedHashtag: []
    };
    const [state, setState] = useState(initialState);

    useEffect(() => {
        let challengeId = notNull(activeChallengedata) && objectHasKey(activeChallengedata, "id") && activeChallengedata.id ? activeChallengedata.id : "";
        let fetchData = { method: 'GET', headers: { "Content-Type": "application/json", authenticate: localStorage.getItem('sessionId') } }
        fetch(`${Basepath}/api/admin/getChallengeDetails?id=${challengeId}`, fetchData)
            .then(response => response.json())
            .then(res => {
                setState(prevState => {
                    return {
                        ...prevState,
                        challengeId: notNull(res.data) && objectHasKey(res.data, "id") && res.data.id ? res.data.id : "",
                        challengeName: notNull(res.data) && objectHasKey(res.data, "name") && res.data.name ? res.data.name : "",
                        selectedHashtagOption: notNull(res.data) && objectHasKey(res.data, "hashtag") && res.data.hashtag ? res.data.hashtag.split(',').map(splitStr).map(h => {
                            return { value: h.id, label: h.name };
                        }) : [],
                        description: notNull(res.data) && objectHasKey(res.data, "description") && res.data.description ? res.data.description : "",
                        challengePostVideo: notNull(res.data) && objectHasKey(res.data, "mediaUrl") && res.data.mediaUrl ? res.data.mediaUrl : "",
                    };
                });
            })
            .catch(err => console.log(err));

    }, [activeChallengedata])

    useEffect(() => {
        getHashtags();
    }, [])

    const splitStr = (x) => {
        const y = x.split(':');
        return { id: parseInt(y[0].trim()), name: y[1].trim() };
    }

    const handleInputChange = ({ target }) => {
        if (state.isSubmit) {
            let validationFields = {
                challengeName: target.name === 'challengeName' ? target.value : state.challengeName
            }
            validation(false, validationFields, challengeValidationRule)
        }
        setState(prevState => {
            return {
                ...prevState,
                [target.name]: target.value
            };
        });
    };

    const handleAddEditChallenge = async (e) => {
        if (e)
            e.preventDefault();

        if (!formValidation())
            return null;

        let challengeFields = {
            name: state.challengeName,
            hashtags: state.selectedHashtagOption && state.selectedHashtagOption.map(p => p.value).join(','),
            description: state.description,
            challengePostVideo: state.challengePostVideo,
            isVideoUpdated: state.isVideoUpdated,
            challengeId: state.challengeId
        };

        if (formValidation()) {
            AddEditChallengeAction(challengeFields);
        }
    };

    const formValidation = () => {
        const cloneState = { ...state };
        let validationFields = {
            challengePostVideo: cloneState.challengePostVideo ? cloneState.challengePostVideo : '',
            challengeName: cloneState.challengeName ? cloneState.challengeName : '',
            hashtags: cloneState.hashtags ? cloneState.hashtags : ''
        };
        return validation(true, validationFields, challengeValidationRule)
    };

    const validation = (isSubmit, Field, Rules) => {
        const Res = validate(Field, Rules);
        const prop = isSubmit ? {
            isSubmit: isSubmit, challengeError: true, challengeErrorMessage: Res.errors
        } : { challengeError: true, challengeErrorMessage: Res.errors }
        setState(prevState => {
            return {
                ...prevState,
                ...prop
            };
        });
        return Res.isValid;
    };

    const handleUploadChallengePostVideo = e => {
        e.persist()
        if (e.target.files && e.target.files[0]) {
            setState(prevState => {
                return {
                    ...prevState,
                    challengePostVideo: e.target.files[0],
                    isVideoUpdated: true
                };
            });
            if (state.isSubmit) {
                let validationFields = {
                    challengePostVideo: e.target.files[0],
                    challengeName: state.challengeName ? state.challengeName : '',
                    hashtags: state.hashtags ? state.hashtags : ''
                }
                return validation(true, validationFields, challengeValidationRule)
            }
        }
    };

    const getHashtags = () => {
        let temp = [...state.populatedHashtag];
        let fetchData = {
            method: 'GET', headers: {
                "Content-Type": "application/json", authenticate: localStorage.getItem('sessionId')
            }
        }
        fetch(`${Basepath}/api/admin/hashtagList`, fetchData)
            .then(response => response.json())
            .then(res => {
                res.data.forEach(element => {
                    let hashtags = {
                        value: element.id,
                        label: `${element.name}`,
                    };
                    temp.push(hashtags);
                });
            })
            .catch(err => console.log(err));
        setState(prevState => {
            return {
                ...prevState,
                populatedHashtag: temp
            };
        });
    }

    const handleHashtagChange = selectedHashtagOption => {
        setState(prevState => {
            return {
                ...prevState,
                selectedHashtagOption
            };
        });
    };

    return (
        <CustomModal show={show} hidePopup={hidePopup}>
            <div className="modal-header">
                <h5 className="modal-title"> {`${state.challengeId ? 'Edit Challenge' : 'Add challenge'}`} </h5>
                <button
                    onClick={hidePopup}
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="">
                    <div className="needs-validation">
                        <div className="form-row">
                            <div className="col-md-5 m-2-Tr">
                                <div className="form-group">
                                    <label htmlFor="validationCustom01">Upload Challenge Video</label>
                                    <div className="category-image-add">
                                        <Player
                                            playsInline
                                            src={notNull(state.challengePostVideo) ? state.challengePostVideo.name === undefined ? state.challengePostVideo : URL.createObjectURL(state.challengePostVideo) : "/assets/images/image_available.png"}
                                            fluid={false}
                                            width={201}
                                            height={128}
                                        />
                                        <div className="upload-btn">
                                            <label className="pe-7s-camera upload-button">
                                                <input
                                                    type="file"
                                                    name="challengePostVideo"
                                                    multiple="false"
                                                    accept="video/mp4,video/x-m4v,video/*"
                                                    className={`uploadFile img ${state.challengeError && 'challengePostVideo' in state.challengeErrorMessage ? "error-input" : ""}`}
                                                    style={{ "width": "0px", "height": "0px", "overflow": "hidden" }}
                                                    onChange={(e) => handleUploadChallengePostVideo(e)}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <ErrorMessage
                                        error={state.challengeError}
                                        message={state.challengeErrorMessage}
                                        field='challengePostVideo'
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="validationCustom01">Challenge Name</label>
                                    <input
                                        type="text"
                                        name="challengeName"
                                        className={`form-control ${state.challengeError && 'challengeName' in state.challengeErrorMessage ? "error-input" : ""}`}
                                        placeholder="Enter challenge Name"
                                        value={state.challengeName}
                                        maxLength="30"
                                        onChange={handleInputChange}
                                    />
                                    <ErrorMessage
                                        error={state.challengeError}
                                        message={state.challengeErrorMessage}
                                        field='challengeName'
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="validationCustom01">HashTags</label>
                                    <Select
                                        className="green-select"
                                        value={state.selectedHashtagOption ? state.selectedHashtagOption : []}
                                        defaultValue={{ label: 'Select Hashtag...', value: 0 }}
                                        components={Option}
                                        isMulti
                                        closeMenuOnSelect={false}
                                        hideSelectedOptions={false}
                                        onChange={handleHashtagChange}
                                        options={state.populatedHashtag}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <label htmlFor="validationCustom01">Description</label>
                                        <textarea
                                            name="description"
                                            placeholder="Enter description here.."
                                            className={`form-control ${state.challengeError && 'startDate' in state.challengeErrorMessage ? "error-input" : ""}`}
                                            value={state.description}
                                            maxLength="700"
                                            style={{ height: "auto", marginTop: "0px" }}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 buttons-cs bottom-btn-add" style={{ justifyContent: "flex-end", display: "flex", marginTop: "60px" }}>
                                <button onClick={handleAddEditChallenge} className="mb-2 mr-2 btn btn-focus adduserbtn">{`${state.challengeId ? 'Edit challenge' : 'Add challenge'}`}
                                </button>
                                <button onClick={hidePopup} className="mb-2 mr-2 btn btn-danger adduserbtn">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomModal>
    );
}

export default AddEditChallenge;



