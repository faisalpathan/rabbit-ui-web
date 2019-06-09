import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import reducers from './reducers';
import Sagas from './sagas';
import AppNavigation from './navigation';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(Sagas);

export { store };

class App extends Component {
	render() {
		return (
			<div>
				<Provider store={store}>
					<AppNavigation />
				</Provider>
			</div>
		);
	}
}

export default App;
