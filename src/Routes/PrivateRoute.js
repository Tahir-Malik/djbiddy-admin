import React from "react";
import { Route, Redirect } from "react-router";
import DashboardLayout from "../Layouts/DashboardLayout";
// import { asyncLocalStorage } from '../utilities/utilities'
import routeRules from "./routeRules";
// import auth from "../auth/auth";


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('sessionId')? (
          <DashboardLayout {...props} props={rest} >
            <Component {...props} props={rest} />
          </DashboardLayout>
        ) : (
            <Redirect
              to={{
                pathname: routeRules.landingPage,
                state: { from: props.location }
              }}
            />
          )

      }
    />
  )

}


export default PrivateRoute;
