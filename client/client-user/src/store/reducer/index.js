// reducer here
import { ADD_USER, FETCH_PROVINCES } from "../keys";
const initialState = {
  users: [],
  provinces: [],
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      let newUser = state.users.concat(action.payload);
      return { ...state, users: newUser };
    case FETCH_PROVINCES:
      return { ...state, provinces: action.payload };
    default:
      return state;
  }
}

export default reducer;
