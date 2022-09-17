import React, { useEffect, useState, Fragment } from "react";
import CustomModal from "../../Components/modal";
import hashTagValidationRule from './validation';
import { validate } from '../../utilities/validator';
import { objectHasKey, notNull } from "../../utilities/utilities";
import ErrorMessage from "../../Components/errorMessage";
import { Basepath } from "../../config";

const AddEditHashTag = props => {
    const { show, hidePopup, AddEditHashTagAction, activeHashTagdata } = props;
    const initialState = {
        isExist: false,
        hashtagError: false,
        hashtagErrorMessage: "",
        hashTagName: "",
        backgroundColor: "",
        description: "",
        hashTagId: null,
        isSubmit: false
    };
    const [state, setState] = useState(initialState);

    useEffect(() => {
        setState(prevState => {
            return {
                ...prevState,
                hashTagId: notNull(activeHashTagdata) && objectHasKey(activeHashTagdata, "id") && activeHashTagdata.id ? activeHashTagdata.id : "",
                hashTagName: notNull(activeHashTagdata) && objectHasKey(activeHashTagdata, "name") && activeHashTagdata.name ? activeHashTagdata.name : "",
                backgroundColor: notNull(activeHashTagdata) && objectHasKey(activeHashTagdata, "backgroundColor") && activeHashTagdata.backgroundColor ? activeHashTagdata.backgroundColor : "",
                description: notNull(activeHashTagdata) && objectHasKey(activeHashTagdata, "description") && activeHashTagdata.description ? activeHashTagdata.description : ""
            };
        });
    }, [activeHashTagdata])

    const handleInputChange = ({ target }) => {
        if (state.isSubmit) {
            let validationFields = {
                hashTagName: target.name === 'hashTagName' ? target.value : state.hashTagName,
                backgroundColor: target.name === 'backgroundColor' ? target.value : state.backgroundColor
            }
            validation(false, validationFields, hashTagValidationRule)
        }
        setState(prevState => {
            return {
                ...prevState,
                [target.name]: target.value
            };
        });
    };

    const handleAddEditHashTag = async (e) => {
        if (e)
            e.preventDefault();

        if (!formValidation() || state.isExist)
            return null;

        let hashTagFields = {
            name: state.hashTagName,
            backgroundColor: state.backgroundColor,
            description: state.description,
            hashTagId: state.hashTagId
        };

        if (formValidation() || !state.isExist) {
            AddEditHashTagAction(hashTagFields);
        }
    };

    const formValidation = () => {
        const cloneState = { ...state };
        let validationFields = {
            hashTagName: cloneState.hashTagName ? cloneState.hashTagName : '',
            backgroundColor: cloneState.backgroundColor ? cloneState.backgroundColor : ''
        };
        return validation(true, validationFields, hashTagValidationRule)
    };

    const validation = (isSubmit, Field, Rules) => {
        const Res = validate(Field, Rules);
        const prop = isSubmit ? {
            isSubmit: isSubmit, hashtagError: true, hashtagErrorMessage: Res.errors
        } : { hashtagError: true, hashtagErrorMessage: Res.errors }
        setState(prevState => {
            return {
                ...prevState,
                ...prop
            };
        });
        return Res.isValid;
    };

    const handleDuplicateHashTag = (value) => {
        const hashTagId = notNull(activeHashTagdata) && objectHasKey(activeHashTagdata, "id") && activeHashTagdata.id ? activeHashTagdata.id : 'add';
        const data = { hashTagId: hashTagId, hashTagName: value };
        let fetchData = {
            method: 'POST', headers: {
                "Content-Type": "application/json", authenticate: localStorage.getItem('sessionId')
            }, body: JSON.stringify(data)
        }
        fetch(`${Basepath}/api/admin/checkHashTag`, fetchData)
            .then(response => response.json())
            .then(res => {
                console.log('res :----->', res)
                if (res.success) {
                    setState(prevState => {
                        return { ...prevState, isExist: true };
                    });
                } else {
                    setState(prevState => {
                        return { ...prevState, isExist: false };
                    });
                }
            })
            .catch(err => console.log(err));
    }


    return (
        <CustomModal show={show} hidePopup={hidePopup}>
            <div className="modal-header">
                <h5 className="modal-title"> {`${state.hashTagId ? 'Edit HashTag' : 'Add HashTag'}`} </h5>
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
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="validationCustom01">HashTag Name</label>
                                    <input
                                        type="text"
                                        name="hashTagName"
                                        className={`form-control ${state.hashtagError && 'hashTagName' in state.hashtagErrorMessage ? "error-input" : ""}`}
                                        placeholder="Enter HashTag Name"
                                        value={state.hashTagName}
                                        maxLength="30"
                                        onBlur={(e) => handleDuplicateHashTag(e.target.value)}
                                        onChange={handleInputChange}
                                    />
                                    {state.isExist ? (
                                        <Fragment>
                                            <div className="error-duplicate-msg">
                                                {'This hashtag already exists'}
                                            </div>
                                        </Fragment>
                                    ) : (
                                            <Fragment />
                                        )}
                                    <ErrorMessage
                                        error={state.hashtagError}
                                        message={state.hashtagErrorMessage}
                                        field='hashTagName'
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="validationCustom01">Background Color</label>
                                    <input
                                        type="color"
                                        name="backgroundColor"
                                        className={`form-control ${state.hashtagError && 'backgroundColor' in state.hashtagErrorMessage ? "error-input" : ""}`}
                                        placeholder="Enter background color"
                                        value={state.backgroundColor}
                                        maxLength="30"
                                        onChange={handleInputChange}
                                    />
                                    <ErrorMessage
                                        error={state.hashtagError}
                                        message={state.hashtagErrorMessage}
                                        field='backgroundColor'
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
                                            className={`form-control ${state.hashtagError && 'startDate' in state.hashtagErrorMessage ? "error-input" : ""}`}
                                            value={state.description}
                                            maxLength="700"
                                            style={{ height: "auto", marginTop: "0px" }}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 buttons-cs bottom-btn-add" style={{ justifyContent: "flex-end", display: "flex", marginTop: "60px" }}>
                                <button onClick={handleAddEditHashTag} className="mb-2 mr-2 btn btn-focus adduserbtn">{`${state.hashTagId ? 'Edit HashTag' : 'Add HashTag'}`}
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

export default AddEditHashTag;



