import React from "react";
import styles from "./DashboardHead.module.css";

class DashboardHead extends React.Component {
    primaryHeadingJsx = () => {
        const { primaryHeading } = this.props;
        if (primaryHeading) return <h1> {primaryHeading} </h1>;
        return null;
    };

    secondaryHeadingJsx = () => {
        const {
            secondaryHeadingOne,
            secondaryHeadingTwo,
            secondaryHeadingThree
        } = this.props;
        if (secondaryHeadingOne)
            return (
                <h2 className={styles.secondary}>
                    {secondaryHeadingOne} <span> {secondaryHeadingTwo} </span>{" "}
                    {secondaryHeadingThree}
                </h2>
            );
        return null;
    };

    descriptionJsx = () => {
        const { description } = this.props;
        if (description)
            return <p className={styles.description}> {description} </p>;
        return null;
    };

    render() {
        return (
            <div className={styles.dashboardHead}>
                {this.primaryHeadingJsx()}
                {this.secondaryHeadingJsx()}
                {this.descriptionJsx()}
            </div>
        );
    }
}
export default DashboardHead;
