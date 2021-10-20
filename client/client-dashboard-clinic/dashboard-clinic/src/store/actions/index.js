import { clinicApi } from "./../apis";
import axios from "axios";
import {
  GET_REGISTRATIONS,
  SET_REGISTRATIONS,
  SET_USER_LOGIN,
  SET_PATIENT_DAY,
  FETCH_ALL_PATIENTS,
  FETCH_PATIENT,
} from "./../keys";

const baseUrl = "http://localhost:9000";

export const setRegistration = (payload) => ({
  type: SET_REGISTRATIONS,
  payload,
});

export const setUserLogin = (payload) => ({
  type: SET_USER_LOGIN,
  payload,
});

export const userLogin = (payload) => {
  return (dispatch) => {
    return axios.post(`${baseUrl}/clinic/login`, payload);
  };
};

export const setPatientThisDay = (payload) => ({
  type: SET_PATIENT_DAY,
  payload,
});
export const fetchAllPatients = (payload) => ({
  type: FETCH_ALL_PATIENTS,
  payload,
});
export const fetchPatient = (payload) => ({
  type: FETCH_PATIENT,
  payload,
});

export const getPatientByDay = () => {
  return (dispatch) => {
    return axios
      .get(`${baseUrl}/registrations/clinic/today`, {
        header: {
          access_token: localStorage.access_token,
        },
      })
      .then(({ data }) => {
        dispatch(setPatientThisDay(data));
      })
      .catch((err) => console.log(err));
  };
};
export const fetchAllPatientsAsync = () => {
  return (dispatch) => {
    return axios
      .get(`${baseUrl}/registrations/clinic`, {
        headers: {
          access_token: localStorage.access_token,
        },
      })
      .then(({ data }) => {
        // console.log(data, "dari action");
        dispatch(fetchAllPatients(data));
      })
      .catch((err) => console.log(err));
  };
};
export const fetchPatientAsync = (id) => {
  return (dispatch) => {
    return axios
      .get(`${baseUrl}/registrations/clinic/${id}`, {
        headers: {
          access_token: localStorage.access_token,
        },
      })
      .then(({ data }) => {
        console.log(data, "dari action");
        // dispatch(fetchPatient(data));
      })
      .catch((err) => console.log(err));
  };
};
