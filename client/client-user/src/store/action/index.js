// actions
import { ADD_USER, FETCH_PROVINCES } from "../keys";
export function addUser(payload) {
  return {
    type: ADD_USER,
    payload,
  };
}
export function fetchProvinces(payload) {
  return {
    type: FETCH_PROVINCES,
    payload,
  };
}
const baseUrl = `http://localhost:9000`;
export function addUserAsync(data) {
  return async function (dispatch) {
    console.log(data.full_name, data.phone_number, "+++");
    try {
      fetch(`${baseUrl}/register`, {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data, "<<");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchProvincesAsync() {
  return function (dispatch) {
    fetch(`${baseUrl}/provinces`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //   dispatch(fetchData(data));
        console.log(data, "provinces");
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
