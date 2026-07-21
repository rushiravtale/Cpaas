import { actionTypes } from "./loaderActionTypes";

let lastShowTime = 0;

export function showLoader() {
  return (dispatch) => {
    lastShowTime = Date.now(); 

    dispatch({
      type: actionTypes.SHOW_LOADER,
      payload: { isOpen: true },

    });
  };
}

export function hideLoader() {
  return (dispatch) => {
    const now = Date.now();
    const elapsed = now - lastShowTime;
    const minDuration = 1000; 

    if (elapsed < minDuration) {
      setTimeout(() => {
        dispatch({
          type: actionTypes.HIDE_LOADER,
          payload: { isOpen: false },
        });
      }, minDuration - elapsed);
    } else {
      dispatch({
        type: actionTypes.HIDE_LOADER,
        payload: { isOpen: false },
      });
    }
  };
}
