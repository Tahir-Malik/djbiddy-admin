import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../Redux/Reducers/rootReducer';
import rootEpic from '../Middleware/Epic/rootEpic';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import history from './history';
import { persistStore } from 'redux-persist';

//create an instance of the redux-observable middleware//
import { createEpicMiddleware } from 'redux-observable';
const epicMiddleware = createEpicMiddleware();


function configureStore() {
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        connectRouter(history)(rootReducer),
        {},
        composeEnhancers(applyMiddleware(epicMiddleware, routerMiddleware(history)))
    );
    epicMiddleware.run(rootEpic);
    return store;
}

export const store = configureStore();

export const persistor = persistStore(store);

export default { store, persistor };
