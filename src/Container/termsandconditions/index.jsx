import React, { Component } from "react";
import { connect } from "react-redux";
import { getTermsAndConditions } from "../../Redux/Actions/SignInAction";
import { notNull } from '../../utilities/utilities';
import styles from './TermsAndConditions.module.scss';

class TermsAndConditions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            termsAndConditions: null
        };
    }

    componentDidMount() {
        this.props.getTermsAndConditions();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.TermsAndConditionsData !== prevProps.TermsAndConditionsData && this.props.TermsAndConditionsData) {
            this.setState({
                termsAndConditions: this.props.TermsAndConditionsData.privacy_policy
            })
        }
    }

    render() {
        return (
            <div>
                <div className={styles.logo}>
                    <img src="./assets/images/logo.png" />
                </div>
                <div className={`container ${styles.content}`}>
                    <div dangerouslySetInnerHTML={{ __html: notNull(this.state.termsAndConditions) && this.state.termsAndConditions }} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        TermsAndConditionsData: state.SignInReducer.TermsAndConditionsData,
        TermsAndConditionsSuccess: state.SignInReducer.TermsAndConditionsSuccess,
        TermsAndConditionsSuccessMessage: state.SignInReducer.TermsAndConditionsSuccessMessage,
        TermsAndConditionsFailure: state.SignInReducer.TermsAndConditionsFailure,
        TermsAndConditionsFailureMessage: state.SignInReducer.TermsAndConditionsFailureMessage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTermsAndConditions: () => dispatch(getTermsAndConditions())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TermsAndConditions);

