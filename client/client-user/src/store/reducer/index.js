// reducer here
import {
  ADD_USER,
  FETCH_PROVINCES,
  FETCH_REGENCIES,
  FETCH_DISTRICTS,
  DATA_LOGIN,
  FETCH_SUBDISTRICTS,
} from "../keys";
const initialState = {
  users: [],
  provinces: [],
  districts: [],
  subDistricts: [],
  dataLogin: {},
  regencies: [],
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      let newUser = state.users.concat(action.payload);
      return { ...state, users: newUser };
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
    default:
      return state;
  }
}

export default reducer;
