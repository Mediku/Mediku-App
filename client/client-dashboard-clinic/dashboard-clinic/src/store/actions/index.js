import axios from "axios";
import {
  SET_REGISTRATIONS,
  SET_USER_LOGIN,
  SET_PATIENT_DAY,
  SET_COMPLETED_TEST,
  FETCH_ALL_PATIENTS,
  FETCH_PATIENT,
} from "./../keys";

// const baseUrl = "https://mediku-app-server.herokuapp.com";
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
  return () => {
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

export const setCompletedPatient = (payload) => ({
  type: SET_COMPLETED_TEST
})

export const fetchPatientByDay = () => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/registrations/clinic/today`, {
        headers: {
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
    axios
      .get(`${baseUrl}/registrations/clinic`, {
        headers: {
          access_token: localStorage.access_token,
        },
      })
      .then(({ data }) => {
        dispatch(fetchAllPatients(data));
      })
      .catch((err) => console.log(err));
  };
};
export const fetchPatientAsync = (id) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/registrations/clinic/${id}`, {
        headers: {
          access_token: localStorage.access_token,
        },
      })
      .then(({ data }) => {
        dispatch(fetchPatient(data));
      })
      .catch((err) => console.log(err));
  };
};

export const updateTestResult = (result, id) => {
  return (dispatch) => {
    axios.patch(`${baseUrl}/registrations/clinic/test/result/${id}`, {
      test_result: result
    }, {
      headers: {
        access_token: localStorage.access_token
      }
    })
      .then((_) => {
        dispatch(fetchAllPatientsAsync())
      })
      .catch(err => console.log(err.response.data))
  };
};

export const changeIsTested = (id) => {
  return (dispatch) => {
    return axios
      .patch(`${baseUrl}/registrations/clinic/istested/${id}`, {
        is_tested: true
      }, {
        headers: {
          access_token: localStorage.access_token,
        }
      })

  }
}

export const getCompletedTest = () => ({
  type: SET_COMPLETED_TEST,
})

export const setFiltered = (filter) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/registrations/clinic`, {
        headers: {
          access_token: localStorage.access_token,
        },
      })
      .then(({ data }) => {

        let filtered;
        switch (filter) {

          case "completed":
            filtered = data.filter(e => e.test_result !== null)
            break

          case "tested":
            filtered = data.filter(e => e.is_tested === true && e.test_result === null)
            break

          case "waiting":
            filtered = data.filter(e => e.is_tested === false)
            break

          default:
            filtered = [...data]

        }
        dispatch(fetchAllPatients(filtered));

      })
      .catch((err) => console.log(err));
  }
}