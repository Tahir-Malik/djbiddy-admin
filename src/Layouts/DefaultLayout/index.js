import React, { useEffect } from "react";
import Header from "../../Components/layout/Header";
import { useLocation } from 'react-router-dom'

const DefaultLayout = props => {
    const location = useLocation();
    return (
        <>
            {location.pathname === "/termsandconditions" ?
                <div className="defaultLayout1">
                    {props.children}
                </div>
                    : location.pathname === "/" ? 
                        <div className="loginLayout">
                            {props.children}
                        </div> : 
                        <div className="defaultLayout">
                            <Header {...props} />
                            {props.children}
                        </div>
            }
        </>

    );
};

export default DefaultLayout;
