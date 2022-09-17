import React from "react";
import CustomModal from '../modal';

const ModalPopup = props => {
    const { show, hidePopup, deleteAction, activeData, popupType } = props;
    return (
        <CustomModal show={show} hidePopup={hidePopup}>
            <div className="modal-header">
                <h4 className="modal-title">{(popupType === 'Active') ? 'Active Action' : 'Delete Action'}</h4>
                <button
                    onClick={hidePopup}
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                > <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="terms-modal">
                    <h1 className="seconday-heading">
                        {`Do you really want to ${(popupType === 'Active') ? 'Active' : 'Delete'} this user ?`}
                    </h1>
                    <div className="col-sm-12 buttons-cs" style={{ justifyContent: "flex-end", display: "flex" }}>
                        <button onClick={hidePopup} className="adduserbtn">
                            Cancel
                        </button>&nbsp;&nbsp;&nbsp;
                        <button
                            onClick={(e) => deleteAction(e, activeData.id)}
                            className="adduserbtn">
                            {(popupType === 'Active') ? 'Active Item' : 'Delete Item'}
                        </button>
                    </div>
                </div>
            </div>
        </CustomModal>
    )
};

export default ModalPopup;