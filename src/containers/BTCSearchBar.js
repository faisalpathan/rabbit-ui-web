import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { getClosestMatchResult } from '../helpers';

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		minWidth: '80vw',
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: '80vw',
		flexDirection: 'column',
		alignItems: 'center',
	},
	button: {
		margin: theme.spacing.unit,
		minWidth: '80vw',
	},
	textStyle: {
		wordWrap: 'break-word',
	},
});

class BTCSearchBar extends Component {
	state = {
		selectedSearchParamerter: 'BTN',
		searchedValue: 0,
		showData: false,
	};

	handleOnTextChange = event => {
		this.setState({ searchedValue: event.target.value });
	};

	handleOnSelectChange = event => {
		this.setState({ selectedSearchParamerter: event.target.value });
	};

	renderOutputContainer = closestValue => {
		const { classes } = this.props;
		return (
			<React.Fragment key={closestValue.hash}>
				<Paper className={classes.root}>
					<Typography component="p" className={classes.textStyle}>
						HASH value : {closestValue.hash}{' '}
					</Typography>

					<Typography component="p" className={classes.textStyle}>
						BTC value: {closestValue.value}{' '}
					</Typography>

					<Typography component="p" className={classes.textStyle}>
						USD value: {closestValue.usdAmount}{' '}
					</Typography>
				</Paper>
				<br />
			</React.Fragment>
		);
	};

	renderMatchedResults = () => {
		const { btcChartData } = this.props;
		const { searchedValue, selectedSearchParamerter } = this.state;
		const closestSearchResults = getClosestMatchResult(
			btcChartData,
			searchedValue,
			selectedSearchParamerter
		);
		return closestSearchResults.map(currentResults => {
			return this.renderOutputContainer(currentResults);
		});
	};

	render() {
		const { classes } = this.props;
		const { selectedSearchParamerter, searchedValue, showData } = this.state;
		return (
			<div>
				<p>
					<Link to="/btcGraph">Graph</Link>
				</p>
				<br />
				<TextField
					id="searchedValue"
					label="Search BTC or USD Value"
					className={classes.textField}
					value={searchedValue}
					type="number"
					onChange={this.handleOnTextChange}
					margin="normal"
				/>
				<br />
				<FormControl className={classes.formControl}>
					<Select value={selectedSearchParamerter} onChange={this.handleOnSelectChange}>
						<MenuItem value="BTN">BTN Value</MenuItem>
						<MenuItem value="USD">USD value</MenuItem>
					</Select>
				</FormControl>
				<br />
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={() =>
						this.setState(prevState => ({
							showData: !prevState.showData,
						}))
					}
				>
					Search
				</Button>
				<br />
				<br />
				{!!showData && this.renderMatchedResults()}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	btcChartData: state.btcData.btcChartData,
});

export default connect(
	mapStateToProps,
	{}
)(withStyles(styles)(BTCSearchBar));
