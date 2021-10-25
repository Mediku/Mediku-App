// reducer here
import {
  ADD_USER,
  ADD_PATIENT,
  FETCH_PROVINCES,
  FETCH_REGENCIES,
  FETCH_DISTRICTS,
  DATA_LOGIN,
  FETCH_SUBDISTRICTS,
  CLINIC,
  DATA_REGISTRATIONS,
  SITE_PAYMENT,
} from "../keys";
const initialState = {
  users: [],
  patients: [],
  provinces: [],
  districts: [],
  subDistricts: [],
  dataLogin: {},
  regencies: [],
  dataClinic: {},
  dataRegistrations: [],
  sitePayment: {},
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      let newUser = state.users.concat(action.payload);
      return { ...state, users: newUser };
    case ADD_PATIENT:
      let newPatient = state.patients.concat(action.payload);
      return { ...state, users: newPatient };
    case FETCH_PROVINCES:
      return { ...state, provinces: action.payload };
    case FETCH_REGENCIES:
      return { ...state, regencies: action.payload };
    case FETCH_DISTRICTS:
      return { ...state, districts: action.payload };
    case FETCH_SUBDISTRICTS:
      return { ...state, subDistricts: action.payload };
    case DATA_LOGIN:
      return { ...state, dataLogin: action.payload };
    case CLINIC:
      return { ...state, dataClinic: action.payload };
    case DATA_REGISTRATIONS:
      return { ...state, dataRegistrations: action.payload };
    case SITE_PAYMENT:
      return { ...state, sitePayment: action.payload };
    default:
      return state;
  }
}

export default reducer;
