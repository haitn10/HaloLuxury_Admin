import axios from "axios";
import { baseURL } from "../../api";

export const SET_STATE = "SET_STATE";

export const setState = (state) => ({
  type: SET_STATE,
  state,
});

export const add_product = (credentials) => {
  return async (dispatch, getState) => {
    const state = getState();
    if (state.info_admin.isAdding) {
      return Promise.reject(new Error("Add products in progress...!").message);
    }

    try {
      dispatch(setState({ isAdding: true }));
      const { data } = await axios.post(
        `${baseURL}/products/${state.auth.profile.id}`,
        credentials
      );
      console.log(data);
      dispatch(setState({ isAdding: false }));
      return Promise.resolve();
    } catch (e) {
      dispatch(setState({ isAdding: false }));
      const message = e.response.data ? e.response.data.title : e.message;
      return Promise.reject(message);
    }
  };
};

export const update_product = (credentials) => {
  console.log(credentials);
  return async (dispatch, getState) => {
    const state = getState();
    if (state.info_admin.isUpdating) {
      return Promise.reject(new Error("Update products in progress...!").message);
    }

    try {
      dispatch(setState({ isUpdating: true }));
      const { data } = await axios.put(
        `${baseURL}/products/update/${credentials.id}`,
        credentials.data
      );
      console.log(data);
      dispatch(setState({ isUpdating: false }));
      return Promise.resolve();
    } catch (e) {
      dispatch(setState({ isUpdating: false }));
      const message = e.response.data ? e.response.data.title : e.message;
      return Promise.reject(message);
    }
  };
};
