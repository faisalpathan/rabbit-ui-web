import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookAppointment from '../containers/BookAppointment';

const appNavigation = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={BookAppointment} />
			</Switch>
		</Router>
	);
};

export default appNavigation;
