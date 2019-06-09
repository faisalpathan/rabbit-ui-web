import React, { Component } from 'react';
import { connect } from 'react-redux';
import Websocket from 'react-websocket';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { addBTCGraphData } from '../actions';
import { filterBTCData, rempaChartData } from '../helpers';

class BTCGraph extends Component {
	state = {
		lineData: {},
	};

	handleOnUnConfirmedSubMessageReceived = data => {
		const { btcChartData } = this.props;
		const parsedData = JSON.parse(data);
		const filtetedBTCdata = filterBTCData(parsedData, btcChartData);
		this.props.addBTCGraphData(filtetedBTCdata);
		const lineData = rempaChartData(btcChartData);
		this.setState({
			lineData,
		});
	};

	handleIsConnectedUnconfirmedSub = () => {
		console.log('IS unconfirmed sub connected');
		this.handleSendUnConfirmedSubMessage({ op: 'unconfirmed_sub' });
	};

	handleSendUnConfirmedSubMessage = message => {
		this.refWebSocket.sendMessage(JSON.stringify(message));
	};

	renderLineGraphComponent = () => {};

	render() {
		return (
			<div>
				<Websocket
					url="wss://ws.blockchain.info/inv"
					onMessage={this.handleOnUnConfirmedSubMessageReceived}
					onOpen={this.handleIsConnectedUnconfirmedSub}
					ref={Websocket => {
						this.refWebSocket = Websocket;
					}}
				/>

				<br />
				<p>
					<Link to="/btcSearchBar">Search</Link>
				</p>
				<br />
				<Line data={this.state.lineData} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	btcChartData: state.btcData.btcChartData,
});

export default connect(
	mapStateToProps,
	{
		addBTCGraphData,
	}
)(BTCGraph);
