import Constants from '../constants';

export const addBTCGraphData = btcChartData => ({
	type: Constants.ADD_CHART_DATA,
	payload: {
		btcChartData,
	},
});
