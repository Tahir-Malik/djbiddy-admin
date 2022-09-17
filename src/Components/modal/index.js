import React from "react";
import "./modal.css";
import PropTypes from "prop-types";

export default class CustomModal extends React.Component {
  hidePopup = e => {
    this.props.hidePopup && this.props.hidePopup(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="custom_modal" id="modal">
        <div className={`${this.props.selectUsermodel ? 'content1' : 'content'}`} style={{ ...this.props.custStyle }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
CustomModal.propTypes = {
  hidePopup: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  custStyle: PropTypes.object
};