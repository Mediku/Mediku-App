// actions
import {
  ADD_USER,
  ADD_PATIENT,
  FETCH_PROVINCES,
  FETCH_REGENCIES,
  FETCH_DISTRICTS,
  FETCH_SUBDISTRICTS,
  DATA_LOGIN,
  CLINIC,
} from "../keys";

export function addUser(payload) {
  return {
    type: ADD_USER,
    payload,
  };
}

export function addPatient(payload) {
  return {
    type: ADD_PATIENT,
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
export function dataClinic(payload) {
  return {
    type: CLINIC,
    payload,
  };
}

const baseUrl = `http://localhost:9000`;
export function addUserAsync(data) {
  return function (dispatch) {
    return fetch(`${baseUrl}/users/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}
export function addPatientAsync(data) {
  return function (dispatch) {
    return fetch(`${baseUrl}/registrations/user`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
    });
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
export function dataClinicAsync() {
  return function (dispatch) {
    return fetch(`${baseUrl}/clinic/list`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(dataClinic(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function loginUserAsync(data) {
  return function (dispatch) {
    return fetch(`${baseUrl}/users/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}
