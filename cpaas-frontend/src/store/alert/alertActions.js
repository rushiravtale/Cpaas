import { actionTypes } from "./alertActionTypes";

export function showAlert(payload) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SHOW_ALERT,
      payload: {
        isOpen: payload.isOpen,
        title: payload.title,
        type: payload.type,
        msg: payload.msg,
        showError: payload.showError ? false : true,
      },
    });
  };
}
export function hideAlert() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.HIDE_ALERT,
      payload: {},
    });
  };
}
