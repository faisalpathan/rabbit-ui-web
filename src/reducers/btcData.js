import Constants from '../constants';

const INITIAL_STATE = {
	btcChartData: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Constants.ADD_CHART_DATA:
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
};
