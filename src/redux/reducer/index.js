import { SET_STATE } from "../action";

const info_admin = (state = { isAdding: false }, action) => {
  switch (action.type) {
    case SET_STATE:
      return {
        ...state,
        ...action.state,
      };

    default:
      return state;
  }
};

export default info_admin;
