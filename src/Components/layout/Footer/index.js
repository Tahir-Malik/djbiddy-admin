import React from "react";
import { Link } from "react-router-dom";
import routeRules from "../../../Routes/routeRules";

const Footer = () => {
    return (
        <footer>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-lg-4">
                        <div className="copyright">© 2019 AllTags.</div>
                    </div>
                    <div className="col-sm-12 col-lg-8">
                        <div className="at-ftr-nav">
                            <ul className="nav">
                                <li>
                                    <Link to={routeRules.termandcond}>Terms & Conditions</Link>
                                </li>
                                <li>
                                    <Link to={routeRules.privacypolicy}>Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to={routeRules.cookies}>Cookie Policy</Link>
                                </li>
                                <li>
                                    <Link to={routeRules.aboutus}> About Us </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
