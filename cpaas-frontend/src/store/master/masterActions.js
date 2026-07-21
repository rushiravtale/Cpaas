import Api from "../../service/api";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";
import { masterActionTypes } from "./masterActionTypes";

export function fetchUserRoles() {
  return (dispatch) => {
    dispatch({
      type: masterActionTypes.FETCH_ROLES_PENDING,
    });

    dispatch(showLoader());

    Api.get("master/getRoles", {})
      .then((response) => {
        dispatch(hideLoader());
        // if (!response || response.__handled) return;


        dispatch({
          type: masterActionTypes.FETCH_ROLES_SUCCESS,
          payload: {
            roles: response.data || [],
          },
        });
      })
      .catch((error) => {
        dispatch(hideLoader());

        dispatch({
          type: masterActionTypes.FETCH_ROLES_ERROR,
        });

        
    

        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg:
              error?.message,
          })
        
        );
      });
  };
}

export function fetchUserTrades() {
  return (dispatch) => {
    
    dispatch({
      type: masterActionTypes.FETCH_TRADES_PENDING,
    });

    dispatch(showLoader());

    Api.get("master/getTrades", {})
      .then((response) => {
        dispatch(hideLoader());
        // if (!response || response.__handled) return;


        dispatch({
          type: masterActionTypes.FETCH_TRADES_SUCCESS,
          payload: {
            trades: response.data || [],
          },
        });
      })
      .catch((error) => {

        dispatch(hideLoader());

        dispatch({
          type: masterActionTypes.FETCH_TRADES_ERROR,
        });

        
      

        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg:
              error?.message
          })
        );
      });
  };
}



export function fetchCourses(tradeId) {
  return (dispatch) => {
    dispatch({
      type: masterActionTypes.FETCH_COURSES_PENDING,
    });

    dispatch(showLoader());

    Api.get(`course/getCourse?tradeId=${tradeId}`, {})
      .then((response) => {
        dispatch(hideLoader());
        // if (!response || response.__handled) return;


        dispatch({
          type: masterActionTypes.FETCH_COURSES_SUCCESS,
          payload: {
            courses: response.data || [],
          },
        });
      })
      .catch((error) => {

        dispatch(hideLoader());

        dispatch({
          type: masterActionTypes.FETCH_COURSES_ERROR,
        });


      
        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg:error.message,
          })
        );
      });
  };
}