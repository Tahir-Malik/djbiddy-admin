import React from "react";
import { Route } from "react-router";
import DefaultLayout from "../Layouts/DefaultLayout";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
          <DefaultLayout>
            <Component {...matchProps} props={rest} />
          </DefaultLayout> 
      )}
    />
  );
};

export default PublicRoute;
