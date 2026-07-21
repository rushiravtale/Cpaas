import Api from "../../service/api";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";
import { actionTypes } from "./authActionTypes";
import { history, getState } from "../configure/configureStore";
import Auth from "../../service/auth";

const getResponseMessage = (res, fallback) =>
  res?.data?.message || res?.message || fallback;

export function login({ roleIds, userName, password }) {
  return (dispatch) => {
    if (!roleIds?.length || userName === "" || password === "") {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Error",
          type: "danger",
          msg: "Fill all fields.",
        })
      );
      return;
    }

    dispatch({
      type: actionTypes.AUTH_PENDING,
      payload: {
        authPending: true,
        authSuccess: false,
        authError: null,
        accessToken: null,
        refreshToken: null,
        profileurl: null,
        loginUser: null,
      },
    });

    dispatch(showLoader());

    Api.post("/auth/signin", {
      roleIds,
      userName,
      password,
    })
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        const data = response.data;

         dispatch(
          showAlert({
            isOpen: true,
            type: "Success",
            title: "Success",
            msg:
               getResponseMessage(response||"")
            ,
          })
        );

        Auth.setTokens(data.accessToken, data.refreshToken, data);

        dispatch({
          type: actionTypes.AUTH_SUCCESS,
          payload: {
            authPending: false,
            authSuccess: true,
            authError: null,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            profileurl: data.profileurl,
            loginUser: data,
          },
        });

        history.push("/");
      })

      .catch((err) => {

        dispatch(hideLoader());

        dispatch({
          type: actionTypes.AUTH_ERROR,
          payload: {
            authPending: false,
            authSuccess: false,
            authError: true,
            accessToken: null,
            refreshToken: null,
            profileurl: null,
            loginUser: null,
          },
        });

        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: getResponseMessage(err, ""),
          })
        );
      });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOGOUT_PENDING,
      payload: {
        logoutPending: true,
        logoutSuccess: false,
        logoutError: null,
      },
    });

    dispatch(showLoader());


    Api.post(
      "auth/logout",
     
    )
      .then((response) => {
          dispatch(hideLoader());
        if (!response || response.__handled) return;


        dispatch({
          type: actionTypes.LOGOUT_SUCCESS,
          payload: {
            logoutPending: false,
            logoutSuccess: true,
            logoutError: null,
            accessToken: null,
            refreshToken: null,
            loginUser: null,
          },
        });


         dispatch(
          showAlert({
            isOpen: true,
            type: "Success",
            title: "Success",
            msg:
               getResponseMessage(response||"")
            ,
          })
        );

        history.push("/login");

        dispatch(hideLoader());

      })
      .catch(() => {
        // dispatch(hideLoader());

        dispatch({
          type: actionTypes.LOGOUT_ERROR,
          payload: {
            logoutPending: false,
            logoutSuccess: false,
            logoutError: true,
          },
        });

        history.push("/login");
      });
  };
}

export function forgotPassword(email) {
  return (dispatch) => {
    dispatch(showLoader());

    Api.post("auth/password/forgot", { userName: email })
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;


        dispatch({
          type: actionTypes.FORGOT_PASSWORD,
          payload: { forgotPassword: true },
        });

        history.push(
          `/reset_password?email=${email}&token=${response.data.otp}`
        );
      })
      .catch(() => {
        dispatch(hideLoader());

        dispatch({
          type: actionTypes.FORGOT_PASSWORD,
          payload: { forgotPassword: false },
        });

        dispatch(
          showAlert({
            isOpen: true,
            type: "danger",
            title: "Error",
            msg: "Error processing request.",
          })
        );
      });
  };
}

export function resetPassword(pwd, cnf_pwd, email, otp) {
  return (dispatch) => {
    if (pwd !== cnf_pwd) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Error",
          type: "danger",
          msg: "Passwords do not match.",
        })
      );
      return;
    }

    dispatch(showLoader());

    Api.post("auth/password/reset", {
      userName: email,
      newPassword: pwd,
      otp,
    })
      .then(() => {
        dispatch(hideLoader());

        dispatch({
          type: actionTypes.RESET_PASSWORD,
          payload: { resetPassword: true },
        });

        history.push("/login");
      })
      .catch(() => {
        dispatch(hideLoader());

        dispatch({
          type: actionTypes.RESET_PASSWORD,
          payload: { resetPassword: false },
        });
      });
  };
}

export function changePassword(old_pwd, pwd, cnf_pwd, token) {
  return (dispatch) => {
    if (pwd !== cnf_pwd) {
      dispatch(
        showAlert({
          isOpen: true,
          type: "danger",
          title: "Error",
          msg: "Passwords do not match.",
        })
      );
      return;
    }

    dispatch({
      type: actionTypes.CHANGE_PASSWORD_PENDING,
      payload: {
        changePasswordPending: true,
        changePasswordSuccess: false,
        changePasswordError: null,
      },
    });

    dispatch(showLoader());

    Api.post(
      "auth/password/change",
      {
        oldPassword: old_pwd,
        newPassword: pwd,
      },
      {
        Authorization: "Bearer " + token,
      }
    )
      .then((response) => {
        dispatch(hideLoader());

        dispatch({
          type: actionTypes.CHANGE_PASSWORD_SUCCESS,
          payload: {
            changePasswordPending: false,
            changePasswordSuccess: true,
            changePasswordError: null,
          },
        });

        dispatch(
          showAlert({
            isOpen: true,
            type: "success",
            title: "Success",
            msg: response.message,
          })
        );
      })
      .catch(() => {
        dispatch(hideLoader());

        dispatch({
          type: actionTypes.CHANGE_PASSWORD_ERROR,
          payload: {
            changePasswordPending: false,
            changePasswordSuccess: false,
            changePasswordError: true,
          },
        });

        dispatch(
          showAlert({
            isOpen: true,
            type: "danger",
            title: "Error",
            msg: "Incorrect old password.",
          })
        );
      });
  };
}

export function updateToken(token, refreshToken) {
  return (dispatch) => {
    Auth.setTokens(token, refreshToken);

    dispatch({
      type: actionTypes.UPDATE_TOKEN_SUCCESS,
      payload: {
        accessToken: token,
        refreshToken,
      },
    });
  };
}
