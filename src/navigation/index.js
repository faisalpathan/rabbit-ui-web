import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BTCGraph from '../containers/BTCGraph';
import BTCSearchBar from '../containers/BTCSearchBar';

const appNavigation = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={BTCGraph} />
				<Route exact path="/btcGraph" component={BTCGraph} />
				<Route exact path="/btcSearchBar" component={BTCSearchBar} />
			</Switch>
		</Router>
	);
};

export default appNavigation;
