
import {
  LOAD_SYSTEM_USERS,
  GET_SYSTEM_USER_BY_ID_PENDING,
  GET_SYSTEM_USER_BY_ID_SUCCESS,
  GET_SYSTEM_USER_BY_ID_ERROR,
  ADD_SYSTEM_USER_PENDING,
  ADD_SYSTEM_USER_SUCCESS,
  RESET_SYSTEM_USERS_PAGINATION,
  ADD_SYSTEM_USER_ERROR,
  UPDATE_SYSTEM_USER,
  DELETE_SYSTEM_USER,
} from "./SystemUserActionTypes";

import Api from "../../service/api";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";

const getResponseMessage = (res, fallback) =>
  res?.data?.message || res?.message || fallback;

export const loadSystemUsers = (page = 1, limit = 5,text="") => {
  return (dispatch) => {
    dispatch(showLoader());

       const params = {};

    if (page) params.page = page;
    if (limit) params.limit = limit;
    if (text) params.text = text;

    const query = new URLSearchParams(params).toString();
    Api.get(`auth/getUsers?${query}`)
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;


        const res = response.data;
        const usersData = res?.data || [];

        const formattedUsers = usersData.map((user, index) => ({
          slNo: index + 1 + (page - 1) * limit,
          id: user._id || "-",
          name: user.name || "-",
          username: user.userName || "-",
          email: user.email || "-",
          phone: user.phoneNo || "-",
          role:
            Array.isArray(user.roleIds) && user.roleIds.length > 0
              ? user.roleIds.map((r) => r.label).join(", ")
              : "-",
          trade:
            Array.isArray(user.tradeId) && user.tradeId.length > 0
              ? user.tradeId.map((t) => t.label).join(", ")
              : "-",
          status: user.status ? "Active" : "Inactive",
          createdAt: user.createdAt
            ? new Date(user.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-",
        }));

        dispatch({
          type: LOAD_SYSTEM_USERS,
          payload: {
            users: formattedUsers,
            pagination: {
              totalDocs: res.totalDocs,
              totalPages: res.totalPages,
              currentPage: res.currentPage,
              hasNextPage: res.hasNextPage,
              limit,
            },
          },
        });

       
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: ADD_SYSTEM_USER_ERROR,
          payload: error.response?.data || error,
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: getResponseMessage(error.response, "Unable to fetch users."),
          })
        );
      });
  };
};

export const getSystemUserById = (userId) => {
  return (dispatch) => {
    if (!userId) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Error",
          type: "danger",
          msg: "Invalid user ID. Please try again.",
        })
      );
      return;
    }

    dispatch({ type: GET_SYSTEM_USER_BY_ID_PENDING });
    dispatch(showLoader());

    Api.get(`user/getUserById/${userId}`)
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        const user = response?.data?.data || response?.data;

        if (!user) throw new Error("User not found in response");

        const formattedUser = {
          id: user._id || user.id || "",
          name: user.name || "",
          userName: user.userName || user.username || "",
          email: user.email || "",
          phoneNo: user.phoneNo || user.phone || "",
          status: Boolean(user.status),
          roleIds: Array.isArray(user.roleIds)
            ? user.roleIds.map((r) => ({
                id: r._id || r.id || "",
                label: r.label || r.name || "",
              }))
            : [],
          tradeId: Array.isArray(user.tradeId)
            ? user.tradeId.map((t) => ({
                id: t._id || t.id || "",
                label: t.label || t.name || "",
              }))
            : [],
          createdAt: user.createdAt || "",
          updatedAt: user.updatedAt || "",
        };

        dispatch({
          type: GET_SYSTEM_USER_BY_ID_SUCCESS,
          payload: formattedUser,
        });

      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: GET_SYSTEM_USER_BY_ID_ERROR,
          payload: error.response?.data || error,
        });

        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: getResponseMessage(
              error.response,
              "Unable to fetch user details."
            ),
          })
        );
      });
  };
};

export const addSystemUser = (userData,onSuccess) => {
  return (dispatch) => {
    if (!userData.userName || !userData.password || !userData.name) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Error",
          type: "danger",
          msg: "Please fill all required fields.",
        })
      );
      return;
    }

    dispatch({ type: ADD_SYSTEM_USER_PENDING });
    dispatch(showLoader());

    Api.post("auth/createUser", userData)
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        dispatch({
          type: ADD_SYSTEM_USER_SUCCESS,
          payload: response.data,
        });

        dispatch(
          showAlert({
            isOpen: true,
            title: "Success",
            type: "success",
            msg: getResponseMessage(
              response,
              "User created successfully."
            ),
          })
        );

     if (typeof onSuccess === "function") {
  onSuccess();
}


        // if (history) history.push("/system-users");
      })
      .catch((error) => {

        console.log("error message in add is",error)
        dispatch(hideLoader());
        dispatch({
          type: ADD_SYSTEM_USER_ERROR,
          payload: error.response?.data || error,
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: error.message,
          })
        );
      });
  };
};

export const updateSystemUser = (user) => {
  return (dispatch) => {
    if (!user?.id) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Error",
          type: "danger",
          msg: "User ID missing for update.",
        })
      );
      return;
    }

    const payload = {
      userId: user.id,
      userName: user.userName,
      name: user.name,
      password: user.password,
      phoneNo: user.phoneNo,
      email: user.email,
      roleIds: user.roleIds,
      tradeId: user.tradeId,
    };

    dispatch(showLoader());

    Api.post("user/updateUser", payload)
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        dispatch({
          type: UPDATE_SYSTEM_USER,
          payload: response.data?.data || payload,
        });

        dispatch(
          showAlert({
            isOpen: true,
            title: "Success",
            type: "success",
            msg: getResponseMessage(response, "User updated successfully."),
          })
        );

        dispatch(getSystemUserById(user.id));
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: getResponseMessage(error.response, "Unable to update user."),
          })
        );
      });
  };
};

export const deleteSystemUser = (userId) => {
  return (dispatch) => {
    if (!userId) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Error",
          type: "danger",
          msg: "Invalid user ID for delete.",
        })
      );
      return;
    }

    dispatch(showLoader());

    Api.delete(`user/deleteUser/${userId}`)
      .then((response) => {
        dispatch(hideLoader());
        if (!response || response.__handled) return;

        dispatch({
          type: DELETE_SYSTEM_USER,
          payload: userId,
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Success",
            type: "success",
            msg: getResponseMessage(response, "User deleted successfully."),
          })
        );

        dispatch(loadSystemUsers());
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch(
          showAlert({
            isOpen: true,
            title: "Error",
            type: "danger",
            msg: getResponseMessage(error.response, "Unable to delete user."),
          })
        );
      });
  };
};


export const resetSystemUsersPagination = () => (
  
  {
  type: RESET_SYSTEM_USERS_PAGINATION
});
