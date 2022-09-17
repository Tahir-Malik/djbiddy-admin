import React from "react";
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import routesData from "./Routes/routesData";
import { store, persistor } from './Store/store';
import { PersistGate } from 'redux-persist/integration/react';
import history from "./Store/history";
function App(params) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate persistor={persistor}>
          <Switch>
            {
              routesData.map((route, index) => {
                if (route.auth) {
                  return <PrivateRoute {...route} key={index}  />
                } else {
                  return <PublicRoute {...route} key={index} />
                }
              })
            }
          </Switch>
        </PersistGate>

      </ConnectedRouter>
    </Provider>
  );
}
export default App;
