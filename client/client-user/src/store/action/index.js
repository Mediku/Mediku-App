// actions
import {
  ADD_USER,
  FETCH_PROVINCES,
  FETCH_REGENCIES,
  FETCH_DISTRICTS,
  FETCH_SUBDISTRICTS,
  DATA_LOGIN,
} from "../keys";
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
export function fetchRegencies(payload) {
  return {
    type: FETCH_REGENCIES,
    payload,
  };
}
export function fetchDistricts(payload) {
  return {
    type: FETCH_DISTRICTS,
    payload,
  };
}
export function fetchSubDistricts(payload) {
  return {
    type: FETCH_SUBDISTRICTS,
    payload,
  };
}
export function loginUser(payload) {
  return {
    type: DATA_LOGIN,
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
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          dispatch(addUser(data));
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
        dispatch(fetchProvinces(data));
        // console.log(data, "provinces");
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function fetchRegenciesAsync(id) {
  return function (dispatch) {
    return fetch(`${baseUrl}/regencies/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(fetchRegencies(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function fetchDistrictsAsync(id) {
  return function (dispatch) {
    return fetch(`${baseUrl}/districts/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(fetchDistricts(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function fetchSubDistrictsAsync(id) {
  return function (dispatch) {
    return fetch(`${baseUrl}/subdistricts/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(fetchSubDistricts(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function loginUserAsync(data) {
  return function (dispatch) {
    return fetch(`${baseUrl}/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        dispatch(loginUser(data));
        console.log(data, "dari action");
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
