import Constants from '../constants';

const INITIAL_STATE = {
  firstName: null,
  lastName: null,
  city: null,
  dateOfAppointment: null,
  timeOfAppoinment: null,
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Constants.ADD_APPOINTMENT:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
