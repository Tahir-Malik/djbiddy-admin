import React from "react";
import CustomModal from "../../Components/modal";

const UserSuspendPopup = props => {
    const { show, hidePopup, resumeSuspendAction, activeUserdata } = props;
    return (
        <CustomModal show={show} hidePopup={hidePopup}>
            <div className="modal-header">
                <h4 className="modal-title">{'Resume/Suspend Action'}</h4>
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
                        {`Do you really want to ${activeUserdata.isActive === 1 ? 'Suspend' : 'Resume'} this user ?`}
                    </h1>
                    <div className="col-sm-12 buttons-cs" style={{ justifyContent: "flex-end", display: "flex" }}>
                        <button onClick={hidePopup} className="adduserbtn">
                            Cancel
                        </button>&nbsp;&nbsp;&nbsp;
                        <button
                            onClick={(e) => resumeSuspendAction(e, activeUserdata.id, activeUserdata.isActive === 0 ? 1 : 0)}
                            className="adduserbtn">
                            {`${activeUserdata.isActive === 1 ? 'Suspend' : 'Resume'}`}
                        </button>
                    </div>
                </div>
            </div>
        </CustomModal>
    )
};

export default UserSuspendPopup;