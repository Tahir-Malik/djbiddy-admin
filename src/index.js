import React from 'react';
import { render } from 'react-dom';
import App from './App';
// import'bootstrap/dist/js/bootstrap.bundle.min';


const renderApp = () => render(<App />, document.getElementById('root'));

/*Blocked for server without https server*/
if (process.env.NODE_ENV !== 'production' && module.hot) {

    module.hot.accept('./App', renderApp);
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
