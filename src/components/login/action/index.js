import axios from "axios";
import { baseURL } from "../../../api";

export const SET_PROFILE = "SET_PROFILE";

export const setState = (state) => ({
  type: SET_PROFILE,
  state,
});

export const login = (credential) => async (dispatch, getState) => {
  const state = getState().auth;
  if (state.isLoggingIn) {
    return Promise.reject(new Error("You are being logged in.").message);
  }

  try {
    dispatch(setState({ isLoggingIn: true }));
    const data = await axios.post(`${baseURL}/users/login`, credential);
    axios.defaults.headers = { Authorization: data.data.token };
    dispatch(setState({ isLoggingIn: false, profile: data.data }));
    sessionStorage.setItem("profile", JSON.stringify(data.data));
    return Promise.resolve(data);
  } catch (e) {
    dispatch(setState({ isLoggingIn: false }));
    const status = e.response.statusText ? e.response.statusText : e.message;
    return Promise.reject(status);
  }
};
