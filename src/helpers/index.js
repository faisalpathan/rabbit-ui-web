import moment from 'moment';
import Constants from '../constants';

export const filterBTCData = (currentData, allBTCData) => {
	if (isObjectEmpty(currentData)) {
		return allBTCData;
	}
	const value = currentData.x.out[0].value;
	if (!value || convertValueIntoBTCCoinValue(value) < 1) {
		return allBTCData;
	}
	const hash = currentData.x.hash || null;
	const time = formatTimeStamp(currentData.x.time);
	const dataToBeAdddedToAllBTCData = {
		value,
		hash,
		usdAmount: btcValueIntoUSDCurrency(value),
		time,
	};
	if (allBTCData.length <= 10) {
		return [dataToBeAdddedToAllBTCData, ...allBTCData];
	}
	allBTCData.shift();
	return [dataToBeAdddedToAllBTCData, ...allBTCData];
};

export const isObjectEmpty = reveivedObject => {
	if (Object.keys(reveivedObject).length === 0) {
		return true;
	}
	return false;
};

export const convertValueIntoBTCCoinValue = value => {
	return value / 10 ** 8;
};

export const btcValueIntoUSDCurrency = btcValue => {
	return Constants.SINGLE_BTC_COIN_VALUE_IN_DOLLARS * btcValue || 0;
};

export const formatTimeStamp = timeStamp => {
	return moment(timeStamp)
		.local()
		.format('YYYY-MM-DD');
};

export const rempaChartData = btcChartData => {
	const latestTimeStamps = btcChartData.map(currentChartData => currentChartData.time);
	const btcValue = btcChartData.map(currentChartData => currentChartData.value);
	return {
		labels: latestTimeStamps,
		datasets: [
			{
				label: 'BTC value',
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'rgba(75,192,192,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: btcValue,
			},
		],
	};
};

export const getClosestMatchResult = (btcChartData, searchedValue, selectedSearchParamerter) => {
	const closestItems = [];
	let i = 0;
	while (i < 3) {
		if (selectedSearchParamerter === 'BTN') {
			const closest = btcChartData.reduce(function(prev, curr) {
				return Math.abs(curr.value - searchedValue) < Math.abs(prev - searchedValue)
					? curr.value
					: prev;
			}, 0);
			for (let i = 0; i < btcChartData.length; i++) {
				if (btcChartData[i].value === closest) {
					closestItems.push(btcChartData[i]);
					btcChartData.splice(i, 1);
					break;
				}
			}
		} else {
			const closest = btcChartData.reduce(function(prev, curr) {
				return Math.abs(curr.usdAmount - searchedValue) < Math.abs(prev - searchedValue)
					? curr.usdAmount
					: prev;
			}, 0);
			for (let i = 0; i < btcChartData.length; i++) {
				if (btcChartData[i].usdAmount === closest) {
					closestItems.push(btcChartData[i]);
					btcChartData.splice(i, 1);
					break;
				}
			}
		}
		i++;
	}
	return closestItems;
};
