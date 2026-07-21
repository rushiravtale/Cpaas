// src/services/Api.js

import axios from "axios";
import { globals } from "../store/globals";
import Auth from "./auth";
// import * as authActions from "../store/auth/authActions";
import { showAlert } from "../store/alert/alertActions";
import { history } from "../store/configure/configureStore";
// import { APP_KEY, DOMAIN_API_URL, PATH_API_URI } from "./apiConstants";
// import { getErrorHandlingData } from "../store/master/masterActions";
// import { LOGIN } from "../navigation/routes";
export default class PublicApi {
  static isRefreshing = false;
  static failedQueue = [];

  static methods = {
    GET: "get",
    POST: "post",
    PATCH: "patch",
    PUT: "put",
    DELETE: "delete",
  };

  static composeRouteUrl(route) {
    if (route.startsWith("http")) return route;
    // Remove leading slash from route to avoid double slashes
    const cleanRoute = route.startsWith("/") ? route.slice(1) : route;
    return `${import.meta.env.VITE_BASE_API_URL}/${cleanRoute}`;
  }

  static get(route, params) {
    return PublicApi.request(route, params, undefined, PublicApi.methods.GET);
  }

  static post(route, data, appendHeaders, handleFormError = true) {
    return PublicApi.request(
      route,
      undefined,
      data,
      PublicApi.methods.POST,
      appendHeaders,
      handleFormError
    );
  }

  static put(route, data, params) {
    return PublicApi.request(route, params, data, PublicApi.methods.PUT);
  }

  static patch(route, params, data) {
    return PublicApi.request(route, params, data, PublicApi.methods.PATCH);
  }

  static delete(route, data) {
    // return PublicApi.request(
    //   route,
    //   params,
    //   data,
    //   PublicApi.methods.DELETE
    // );

    return PublicApi.request(route, undefined, data, PublicApi.methods.DELETE);
  }

  static alert(input, type = "info") {
    const payload =
      typeof input === "string"
        ? { title: "Notification", msg: input }
        : {
            title: input.title || "Notification",
            msg: input.text || input.msg,
          };

    globals.store.dispatch(
      showAlert({
        ...payload,
        type,
      })
    );
  }

  //   static alert(msg) {
  //     globals.store.dispatch(
  //       showAlert(
  //         typeof msg === "string"
  //           ? { title: "Notification", msg }
  //           : { title: msg.title, msg: msg.text }
  //       )
  //     );
  //   }

  static async request(
    route,
    params,
    data,
    method,
    appendHeaders,
    handleFormError = true
  ) {
    const url = PublicApi.composeRouteUrl(route);
    let headers = {
      Accept: "application/json",

      "X-Requested-With": "XMLHttpRequest",
      "Application-Type": "Web",
      lat: "",
      lon: "",
    };

    const token = Auth.getAccessToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const userLocation = JSON.parse(
      localStorage.getItem("userLocation") || "{}"
    );
    if (userLocation?.latitude && userLocation?.longitude) {
      headers["lat"] = userLocation.latitude;
      headers["lon"] = userLocation.longitude;
    }

    const isFormData =
      typeof FormData !== "undefined" && data instanceof FormData;
    if (!isFormData) {
      headers["Content-Type"] = "application/json; charset=utf-8";
    }

    if (appendHeaders) headers = { ...headers, ...appendHeaders };

    const originalRequest = {
      method,
      url,
      headers,
      params,
      data,
    };

    try {
      const response = await axios(originalRequest);

      if (response?.data?.rid === 308) {
        // globals.store.dispatch(getErrorHandlingData(response?.data));
      }

      if (response?.data?.msg) {
        PublicApi.alert(response.data.msg);
      }

      return { ...response.data, status: response.status };
    } catch (error) {
      const { response } = error;

      if (response?.status === 401 && !originalRequest._retry) {
        if (PublicApi.isRefreshing) {
          return new Promise((resolve, reject) => {
            PublicApi.failedQueue.push({ resolve, reject });
          }).then((newToken) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return axios(originalRequest);
          });
        }

        originalRequest._retry = true;
        PublicApi.isRefreshing = true;

        try {
          const refreshToken = Auth.getRefreshToken();
          const refreshResp = await axios.post(
            `${import.meta.env.VITE_BASE_API_URL}/auth/refresh`,
            {
              refreshToken,
            }
          );

          const { accessToken, refreshToken: newRefreshToken } =
            refreshResp.data;
          Auth.setTokens(accessToken, newRefreshToken);

          PublicApi.failedQueue.forEach((prom) => prom.resolve(accessToken));
          PublicApi.failedQueue = [];

          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          PublicApi.failedQueue.forEach((prom) => prom.reject(refreshError));
          PublicApi.failedQueue = [];

          Auth.clear();
          //   globals.store.dispatch(authActions.logout());
          //   globals.history.push(LOGIN);

          history.push("/login");
          throw refreshError;
        } finally {
          PublicApi.isRefreshing = false;
        }
      }

      if (response?.data?.msg && handleFormError) {
        PublicApi.alert({ title: "Error", text: response.data.msg });
      }

      throw error;
    }
  }
}
