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
  DATA_REGISTRATIONS,
  SITE_PAYMENT
} from "../keys";

export function addUser(payload) {
  return {
    type: ADD_USER,
    payload,
  };
}
export function dataRegistrations(payload) {
  return {
    type: DATA_REGISTRATIONS,
    payload,
  };
}

export function paymentSite(payload) {
  return {
    type: SITE_PAYMENT,
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

const baseUrl = `https://mediku-app-server.herokuapp.com`;
// const baseUrl = `http://localhost:9000`;
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function dataRegistrationAsync() {
  return function (dispatch) {
    fetch(`${baseUrl}/registrations/user/logined`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(dataRegistrations(data));
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

export function getEndpoint(id) {
  return function (dispatch) {
    return fetch(`${baseUrl}/xendits/invoice/${id}`, {
      method: "POST",
      headers: {
        access_token: localStorage.access_token
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(paymentSite({
          invoiceURL: data.invoiceURL,
          invoiceID: data.invoice_id
        }));
      })
      .catch((err) => console.log(err))
  };
}
