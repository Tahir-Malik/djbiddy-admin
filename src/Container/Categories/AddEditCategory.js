import React, { useEffect, useState, Fragment } from "react";
import CustomModal from "../../Components/modal";
import categoryValidationRule from './validation';
import { validate } from '../../utilities/validator';
import { objectHasKey, notNull } from "../../utilities/utilities";
import { uploadFileS3Bucket } from "../../utilities/uploadFileS3Bucket";
import ErrorMessage from "../../Components/errorMessage";
import { Basepath } from "../../config";

const AddEditCategory = props => {
    const { show, hidePopup, AddEditCategoryAction, activeCategorydata } = props;
    const initialState = {
        isExist: false,
        categoryError: false,
        categoryErrorMessage: "",
        categoryName: "",
        backgroundColor: "",
        description: "",
        categoryImage: "",
        categoryId: null,
        isSubmit: false,
        isImageUpdated: false
    };
    const [state, setState] = useState(initialState);

    useEffect(() => {
        setState(prevState => {
            return {
                ...prevState,
                categoryId: notNull(activeCategorydata) && objectHasKey(activeCategorydata, "id") && activeCategorydata.id ? activeCategorydata.id : "",
                categoryName: notNull(activeCategorydata) && objectHasKey(activeCategorydata, "name") && activeCategorydata.name ? activeCategorydata.name : "",
                backgroundColor: notNull(activeCategorydata) && objectHasKey(activeCategorydata, "backgroundColor") && activeCategorydata.backgroundColor ? activeCategorydata.backgroundColor : "",
                description: notNull(activeCategorydata) && objectHasKey(activeCategorydata, "description") && activeCategorydata.description ? activeCategorydata.description : "",
                categoryImage: notNull(activeCategorydata) && objectHasKey(activeCategorydata, "image") && activeCategorydata.image ? activeCategorydata.image : "",
            };
        });
    }, [activeCategorydata])

    const handleInputChange = ({ target }) => {
        if (state.isSubmit) {
            let validationFields = {
                categoryName: target.name === 'categoryName' ? target.value : state.categoryName,
                backgroundColor: target.name === 'backgroundColor' ? target.value : state.backgroundColor
            }
            validation(false, validationFields, categoryValidationRule)
        }
        setState(prevState => {
            return {
                ...prevState,
                [target.name]: target.value
            };
        });
    };

    const handleAddEditCategory = async (e) => {
        if (e)
            e.preventDefault();

        if (!formValidation() || state.isExist)
            return null;

        let [categoryImg] = await Promise.all([
            state.isImageUpdated ? uploadFileS3Bucket(state.categoryImage, `${Date.now()}-${state.categoryImage.name}`) : state.categoryImage
        ])

        let categoryFields = {
            name: state.categoryName,
            backgroundColor: state.backgroundColor,
            description: state.description,
            image: categoryImg,
            categoryId: state.categoryId
        };

        if (formValidation() || !state.isExist) {
            AddEditCategoryAction(categoryFields);
        }
    };

    const formValidation = () => {
        const cloneState = { ...state };
        let validationFields = {
            categoryImage: cloneState.categoryImage ? cloneState.categoryImage : '',
            categoryName: cloneState.categoryName ? cloneState.categoryName : '',
            backgroundColor: cloneState.backgroundColor ? cloneState.backgroundColor : ''
        };
        return validation(true, validationFields, categoryValidationRule)
    };

    const validation = (isSubmit, Field, Rules) => {
        const Res = validate(Field, Rules);
        const prop = isSubmit ? {
            isSubmit: isSubmit, categoryError: true, categoryErrorMessage: Res.errors
        } : { categoryError: true, categoryErrorMessage: Res.errors }
        setState(prevState => {
            return {
                ...prevState,
                ...prop
            };
        });
        return Res.isValid;
    };

    const handleUploadCategoryImage = e => {
        e.persist()
        if (e.target.files && e.target.files[0]) {
            setState(prevState => {
                return {
                    ...prevState,
                    categoryImage: e.target.files[0],
                    isImageUpdated: true
                };
            });
            if (state.isSubmit) {
                let validationFields = {
                    categoryImage: e.target.files[0],
                    categoryName: state.categoryName ? state.categoryName : '',
                    backgroundColor: state.backgroundColor ? state.backgroundColor : ''
                }
                return validation(true, validationFields, categoryValidationRule)
            }
        }
    };

    const handleDuplicateCategory = (value) => {
        const categoryId = notNull(activeCategorydata) && objectHasKey(activeCategorydata, "id") && activeCategorydata.id ? activeCategorydata.id : 'add';
        const data = { categoryId: categoryId, categoryName: value };
        let fetchData = {
            method: 'POST', headers: {
                "Content-Type": "application/json", authenticate: localStorage.getItem('sessionId')
            }, body: JSON.stringify(data)
        }
        fetch(`${Basepath}/api/admin/checkCategory`, fetchData)
            .then(response => response.json())
            .then(res => {
                console.log('res :-------->', res)
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
                <h5 className="modal-title"> {`${state.categoryId ? 'Edit Category' : 'Add category'}`} </h5>
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
                                    <label htmlFor="validationCustom01">Upload Image</label>
                                    <div className="category-image-add">
                                        <img src={notNull(state.categoryImage) ? state.categoryImage.name === undefined ? state.categoryImage : URL.createObjectURL(state.categoryImage) : "/assets/images/image_available.png"} alt="" />
                                        <div className="upload-btn">
                                            <label className="pe-7s-camera upload-button">
                                                <input
                                                    type="file"
                                                    name="categoryImage"
                                                    accept="image/*"
                                                    className={`uploadFile img ${state.categoryError && 'categoryImage' in state.categoryErrorMessage ? "error-input" : ""}`}
                                                    style={{ "width": "0px", "height": "0px", "overflow": "hidden" }}
                                                    onChange={(e) => handleUploadCategoryImage(e)}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <ErrorMessage
                                        error={state.categoryError}
                                        message={state.categoryErrorMessage}
                                        field='categoryImage'
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="validationCustom01">Category Name</label>
                                    <input
                                        type="text"
                                        name="categoryName"
                                        className={`form-control ${state.categoryError && 'categoryName' in state.categoryErrorMessage ? "error-input" : ""}`}
                                        placeholder="Enter category Name"
                                        value={state.categoryName}
                                        maxLength="30"
                                        onBlur={(e) => handleDuplicateCategory(e.target.value)}
                                        onChange={handleInputChange}
                                    />
                                    {state.isExist ? (
                                        <Fragment>
                                            <div className="error-duplicate-msg">
                                                {'This category already exists'}
                                            </div>
                                        </Fragment>
                                    ) : (
                                            <Fragment />
                                        )}
                                    <ErrorMessage
                                        error={state.categoryError}
                                        message={state.categoryErrorMessage}
                                        field='categoryName'
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="validationCustom01">Background Color</label>
                                    <input
                                        type="color"
                                        name="backgroundColor"
                                        className={`form-control ${state.categoryError && 'backgroundColor' in state.categoryErrorMessage ? "error-input" : ""}`}
                                        placeholder="Enter background color"
                                        value={state.backgroundColor}
                                        maxLength="30"
                                        onChange={handleInputChange}
                                    />
                                    <ErrorMessage
                                        error={state.categoryError}
                                        message={state.categoryErrorMessage}
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
                                            className={`form-control ${state.categoryError && 'startDate' in state.categoryErrorMessage ? "error-input" : ""}`}
                                            value={state.description}
                                            maxLength="700"
                                            style={{ height: "auto", marginTop: "0px" }}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 buttons-cs bottom-btn-add" style={{ justifyContent: "flex-end", display: "flex", marginTop: "60px" }}>
                                <button onClick={handleAddEditCategory} className="mb-2 mr-2 btn btn-focus adduserbtn">{`${state.categoryId ? 'Edit category' : 'Add category'}`}
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

export default AddEditCategory;



