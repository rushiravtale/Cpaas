import {
actionTypes
} from "./authActionTypes";

const initialState = {
  authPending: false,
  authSuccess: false,
  authError: null,

  accessToken: null,
  refreshToken: null,
  profileurl: null,
  loginUser: null,

  resetPassword: false,
  forgotPassword: false,

  changePasswordPending: false,
  changePasswordSuccess: false,
  changePasswordError: null,

  logoutPending: false,
  logoutSuccess: false,
  logoutError: null,
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.AUTH_PENDING:
    case actionTypes.AUTH_SUCCESS:
    case actionTypes.AUTH_ERROR:
      return { ...state, ...payload };

    case actionTypes.CHANGE_PASSWORD_PENDING:
    case actionTypes.CHANGE_PASSWORD_SUCCESS:
    case actionTypes.CHANGE_PASSWORD_ERROR:
      return { ...state, ...payload };

    case actionTypes.UPDATE_TOKEN_SUCCESS:
      return { ...state, ...payload };

    case actionTypes.RESET_PASSWORD:
      return { ...state, resetPassword: payload.resetPassword };

    case actionTypes.FORGOT_PASSWORD:
      return { ...state, forgotPassword: payload.forgotPassword };

    case actionTypes.LOGOUT_PENDING:
    case actionTypes.LOGOUT_SUCCESS:
    case actionTypes.LOGOUT_ERROR:
      return { ...state, ...payload };

    default:
      return state;
  }
}
