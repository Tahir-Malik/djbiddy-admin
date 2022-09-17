import React from 'react';
import {Link} from "react-router-dom";
import {arrayNotNull} from "../../utilities/utilities";

const PageTitleHeading = (props) => {
    return (
        <div className="page-title-heading">
            <ul className="pagination-custom">
                {
                    arrayNotNull(props.tittleData) &&
                    props.tittleData.map((list, index) => {
                        if (index < props.tittleData.length - 1) {
                            return <li key={list.key} className={list.activePage ? "active-page" : ""}>
                                <Link to={list.route}>
                                    {list.label}
                                </Link>
                                {
                                    index < props.tittleData.length - 1 ?
                                        <i className="pe-7s-angle-right"/>:
                                        <></>
                                }
                            </li>
                        } else {
                            return <li key={list.key} className={list.activePage ? "active-page" : ""}>

                                {list.label}
                            </li>
                        }
                    })
                }
            </ul>
        </div>
    );
};

export default PageTitleHeading;