import {
  GET_REGISTRATIONS,
  SET_REGISTRATIONS,
  SET_USER_LOGIN,
  SET_PATIENT_DAY,
  FETCH_ALL_PATIENTS,
  FETCH_PATIENT,
  GET_PATIENT_DAY,
  SET_COMPLETED_TEST
} from "./../keys";

let initialState = {
  registrations: [],
  login: false,
  patientToday: [],
  allPatients: [],
  dataPatient: {},
  completedTest: 0
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

    case GET_PATIENT_DAY:
      return state.patientToday

    case SET_COMPLETED_TEST:
      let completed = state.allPatients.filter( e => e.test_result !== null)
      return {...state, completedTest: completed.length}

    default:
      return state;
  }
}

export default reducer;
