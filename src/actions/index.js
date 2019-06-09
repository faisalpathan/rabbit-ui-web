import Constants from '../constants';

export const addAppointment = (
	firstName,
	lastName,
	city,
	dateOfAppointment,
	timeOfAppoinment
) => ({
	type: Constants.ADD_APPOINTMENT,
	payload: {
		firstName,
		lastName,
		city,
		dateOfAppointment,
		timeOfAppoinment,
	},
});
