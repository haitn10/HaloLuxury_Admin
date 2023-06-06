import { SET_PROFILE } from "../action";

const auth = (
  state = {
    isLogggingIn: false,
    profile: sessionStorage.profile
      ? JSON.parse(sessionStorage.getItem("profile"))
      : null,
  },
  action
) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        ...action.state,
      };

    default:
      return state;
  }
};

export default auth;
