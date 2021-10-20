import {
  GET_REGISTRATIONS,
  SET_REGISTRATIONS,
  SET_USER_LOGIN,
  SET_PATIENT_DAY,
  FETCH_ALL_PATIENTS,
  FETCH_PATIENT,
} from "./../keys";

let initialState = {
  registrations: [],
  login: false,
  patientToday: [],
  allPatients: [],
  dataPatient: {},
};
function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_REGISTRATIONS:
      return state.registrations;

    case SET_REGISTRATIONS:
      return { ...state, registrations: payload };

    case SET_USER_LOGIN:
      return { ...state, login: true };

    case SET_PATIENT_DAY:
      return { ...state, patientToday: payload };

    case FETCH_ALL_PATIENTS:
      return { ...state, allPatients: payload };

    case FETCH_PATIENT:
      return { ...state, dataPatient: payload };

    default:
      return state;
  }
}

export default reducer;
