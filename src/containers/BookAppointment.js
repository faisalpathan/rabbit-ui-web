import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { addAppointment } from '../actions';

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '35vw',
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: '35vw',
	},
	button: {
		margin: theme.spacing.unit,
	},
});

class BookAppointment extends Component {
	state = {
		firstName: '',
		lastName: '',
		city: '',
		dateOfAppointment: moment().format('YYYY-MM-DD'),
		timeOfAppoinment: moment().format('hh:mm'),
	};

	handleOnSubmit = () => {
		const { addAppointment } = this.props;
		const { firstName, lastName, city, dateOfAppointment, timeOfAppoinment } = this.state;
		console.log(this.state);
		addAppointment(firstName, lastName, city, dateOfAppointment, timeOfAppoinment);
	};

	handleOnTextChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	handleOnSelectChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	renderTextFieldComponent = (value, label = '', stateName, handleOnChange, type = 'text') => {
		const { classes } = this.props;
		return (
			<>
				<br />
				<Typography variant="h6" gutterBottom>
					{label}
				</Typography>
				<TextField
					id={stateName}
					label={label}
					className={classes.textField}
					value={value}
					type={type}
					onChange={handleOnChange(stateName)}
					margin="normal"
				/>
			</>
		);
	};

	renderSelectComponent = (label, value, handleOnSelectChange, stateName) => {
		const { classes } = this.props;
		return (
			<>
				<br />
				<Typography variant="h6" gutterBottom>
					{label}
				</Typography>
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor={stateName}>{label}</InputLabel>
					<Select
						value={value}
						onChange={handleOnSelectChange}
						inputProps={{
							name: stateName,
							id: stateName,
						}}
					>
						<MenuItem value="Mumbai">Mumbai</MenuItem>
						<MenuItem value="Navi Mumbai">Navi Mumbai</MenuItem>
						<MenuItem value="Thane">Thane</MenuItem>
					</Select>
				</FormControl>
			</>
		);
	};

	renderButtonComponent = (name, handleOnClick, color = 'primary') => {
		const { classes } = this.props;
		return (
			<Button variant="contained" color={color} className={classes.button} onClick={handleOnClick}>
				{name}
			</Button>
		);
	};

	render() {
		console.log(this.props);
		const { classes } = this.props;
		const { firstName, lastName, city, dateOfAppointment, timeOfAppoinment } = this.state;
		return (
			<div>
				<Paper className={classes.root} elevation={1}>
					<Grid container direction="column" justify="center" alignItems="center">
						<Typography variant="h3" gutterBottom>
							Book An Appointment
						</Typography>
						{this.renderTextFieldComponent(
							firstName,
							'First Name',
							'firstName',
							this.handleOnTextChange
						)}
						{this.renderTextFieldComponent(
							lastName,
							'Last Name',
							'lastName',
							this.handleOnTextChange
						)}
						{this.renderSelectComponent('Select City', city, this.handleOnSelectChange, 'city')}
						{this.renderTextFieldComponent(
							dateOfAppointment,
							'Date Of Appointment',
							'dateOfAppointment',
							this.handleOnTextChange,
							'date'
						)}
						{this.renderTextFieldComponent(
							timeOfAppoinment,
							'Date Of Appointment',
							'timeOfAppoinment',
							this.handleOnTextChange,
							'time'
						)}
						{this.renderButtonComponent('Submit', this.handleOnSubmit)}
					</Grid>
				</Paper>
			</div>
		);
	}
}

export default connect(
	null,
	{
		addAppointment,
	}
)(withStyles(styles)(BookAppointment));
