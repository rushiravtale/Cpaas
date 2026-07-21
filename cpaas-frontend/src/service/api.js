// import axios from "axios";
// import { globals } from "../store/globals";
// import Auth from "./auth";
// import { showAlert } from "../store/alert/alertActions";
// import { history } from "../store/configure/configureStore";
// import { v4 as uuidv4 } from "uuid";

// export default class Api {
//   static isRefreshing = false;
//   static failedQueue = [];

//   static methods = {
//     GET: "get",
//     POST: "post",
//     PATCH: "patch",
//     PUT: "put",
//     DELETE: "delete",
//   };

//   static composeRouteUrl(route) {
//     if (route.startsWith("http")) return route;

//     return `${import.meta.env.VITE_BASE_API_URL}/api/${route}`;
//   }

//   static get(route, params) {
//     return Api.request(route, params, undefined, Api.methods.GET);
//   }

//   static post(route, data, appendHeaders, handleFormError = true) {
//     return Api.request(
//       route,
//       undefined,
//       data,
//       Api.methods.POST,
//       appendHeaders,
//       handleFormError
//     );
//   }

//   static put(route, data, params) {
//     return Api.request(route, params, data, Api.methods.PUT);
//   }

//   static patch(route, params, data) {
//     return Api.request(route, params, data, Api.methods.PATCH);
//   }

//   static delete(route, params) {
//     return Api.request(route, params, undefined, Api.methods.DELETE);
//   }

//   static alert(input, type = "info") {
//     const payload =
//       typeof input === "string"
//         ? { title: "Notification", msg: input }
//         : {
//             title: input.title || "Notification",
//             msg: input.text || input.msg,
//           };

//     globals.store.dispatch(
//       showAlert({
//         ...payload,
//         type,
//       })
//     );
//   }

//   static getSessionUuid() {
//     let sessionUuid = localStorage.getItem("sessionUuid");
//     if (!sessionUuid) {
//       sessionUuid = uuidv4();
//       localStorage.setItem("sessionUuid", sessionUuid);
//     }
//     return sessionUuid;
//   }

//   static async request(
//     route,
//     params,
//     data,
//     method,
//     appendHeaders,
//     handleFormError = true
//   ) {
//     const url = Api.composeRouteUrl(route);
//     let headers = {
//       Accept: "application/json",

//       "X-Requested-With": "XMLHttpRequest",
//       "Application-Type": "Web",
//       lat: "",
//       lon: "",
//       uuid: Api.getSessionUuid(),
//     };

//     const token = Auth.getAccessToken();

//     if (token) headers["Authorization"] = `Bearer ${token}`;

//     const userLocation = JSON.parse(
//       localStorage.getItem("userLocation") || "{}"
//     );
//     if (userLocation?.latitude && userLocation?.longitude) {
//       headers["lat"] = userLocation.latitude;
//       headers["lon"] = userLocation.longitude;
//     }

//     const isFormData =
//       typeof FormData !== "undefined" && data instanceof FormData;
//     if (!isFormData) {
//       headers["Content-Type"] = "application/json; charset=utf-8";
//     }

//     if (appendHeaders) headers = { ...headers, ...appendHeaders };

//     const originalRequest = {
//       method,
//       url,
//       headers,
//       params,
//       data,
//     };

//     try {
//       const response = await axios(originalRequest);
//       if (
//         response?.status === 401 ||
//         response?.data?.errorCode === "AUTH_EXPIRED" ||
//         response?.data?.rid === "e-auth-16" ||
//         response?.data?.message?.toLowerCase() === "unauthorized access"
//       ) {

//         Auth.clear();

//         history.push("/login");
//         return;
//       }

//       if (response?.data?.rid === 308) {
//       }

//       if (response?.data?.msg) {
//         Api.alert(response.data.msg);
//       }

//       return { ...response.data, status: response.status };
//     } catch (error) {
//       const { response } = error;

//       if (response?.status === 401 && !originalRequest._retry) {
//         if (Api.isRefreshing) {
//           return new Promise((resolve, reject) => {
//             Api.failedQueue.push({ resolve, reject });
//           }).then((newToken) => {
//             originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
//             return axios(originalRequest);
//           });
//         }

//         originalRequest._retry = true;
//         Api.isRefreshing = true;

//         try {
//           const refreshToken = Auth.getRefreshToken();
//           const refreshResp = await axios.post(
//             `${import.meta.env.VITE_BASE_API_URL}/auth/refresh`,
//             {
//               refreshToken,
//             }
//           );

//           const { accessToken, refreshToken: newRefreshToken } =
//             refreshResp.data;
//           Auth.setTokens(accessToken, newRefreshToken);

//           Api.failedQueue.forEach((prom) => prom.resolve(accessToken));
//           Api.failedQueue = [];

//           originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
//           return axios(originalRequest);
//         } catch (refreshError) {
//           Api.failedQueue.forEach((prom) => prom.reject(refreshError));
//           Api.failedQueue = [];

//           Auth.clear();
//           history.push("/signin");
//           throw refreshError;
//         } finally {
//           Api.isRefreshing = false;
//         }
//       }

//       if (response?.data?.msg && handleFormError) {
//         Api.alert({ title: "Error", text: response.data.msg });
//       }

//       throw error;
//     }
//   }
// }

// import axios from "axios";
// import { globals } from "../store/globals";
// import Auth from "./auth";
// import { showAlert } from "../store/alert/alertActions";
// import { history } from "../store/configure/configureStore";
// import { v4 as uuidv4 } from "uuid";

// export default class Api {
//   static isRefreshing = false;
//   static failedQueue = [];

//   static methods = {
//     GET: "get",
//     POST: "post",
//     PATCH: "patch",
//     PUT: "put",
//     DELETE: "delete",
//   };

//   static composeRouteUrl(route) {
//     if (route.startsWith("http")) return route;
//     return `${import.meta.env.VITE_BASE_API_URL}/api/${route}`;
//   }

//   static get(route, params) {
//     return Api.request(route, params, undefined, Api.methods.GET);
//   }

//   static post(route, data, appendHeaders, handleFormError = true) {
//     return Api.request(
//       route,
//       undefined,
//       data,
//       Api.methods.POST,
//       appendHeaders,
//       handleFormError
//     );
//   }

//   static put(route, data, params) {
//     return Api.request(route, params, data, Api.methods.PUT);
//   }

//   static patch(route, params, data) {
//     return Api.request(route, params, data, Api.methods.PATCH);
//   }

//   static delete(route, params) {
//     return Api.request(route, params, undefined, Api.methods.DELETE);
//   }

//   static alert(input, type = "info") {
//     const payload =
//       typeof input === "string"
//         ? { title: "Notification", msg: input }
//         : {
//             title: input.title || "Notification",
//             msg: input.text || input.msg,
//           };

//     globals.store.dispatch(
//       showAlert({
//         ...payload,
//         type,
//       })
//     );
//   }

//   static getSessionUuid() {
//     let sessionUuid = localStorage.getItem("sessionUuid");
//     if (!sessionUuid) {
//       sessionUuid = uuidv4();
//       localStorage.setItem("sessionUuid", sessionUuid);
//     }
//     return sessionUuid;
//   }

//   static async request(
//     route,
//     params,
//     data,
//     method,
//     appendHeaders,
//     handleFormError = true
//   ) {
//     const url = Api.composeRouteUrl(route);
//     let headers = {
//       Accept: "application/json",
//       "X-Requested-With": "XMLHttpRequest",
//       "Application-Type": "Web",
//       lat: "",
//       lon: "",
//       uuid: Api.getSessionUuid(),
//     };

//     const token = Auth.getAccessToken();
//     if (token) headers["Authorization"] = `Bearer ${token}`;

//     const userLocation = JSON.parse(
//       localStorage.getItem("userLocation") || "{}"
//     );
//     if (userLocation?.latitude && userLocation?.longitude) {
//       headers["lat"] = userLocation.latitude;
//       headers["lon"] = userLocation.longitude;
//     }

//     const isFormData =
//       typeof FormData !== "undefined" && data instanceof FormData;
//     if (!isFormData) {
//       headers["Content-Type"] = "application/json; charset=utf-8";
//     }

//     if (appendHeaders) headers = { ...headers, ...appendHeaders };

//     const originalRequest = {
//       method,
//       url,
//       headers,
//       params,
//       data,
//     };

//     try {
//       const response = await axios(originalRequest);
//       const resp = response?.data || {};

//       // -------------------------------
//       // HANDLE RID-BASED LOGIC
//       // -------------------------------
//       if (resp?.rid) {
//         // Explicit AUTH error → logout
//         if (resp.rid === "e-auth-2" || resp.rid === "e-auth-14") {
//           Auth.clear();
//           history.push("/login");
//           throw resp; // Forward to .catch(err)
//         }

//         // General "e-" = error
//         if (resp.rid.startsWith("e-")) {
//           if (handleFormError && resp?.message) {
//             Api.alert({ title: "Error", text: resp.message });
//           }
//           throw resp; // Forward this error to actions
//         }

//         // "s-" = success
//         if (resp.rid.startsWith("s-")) {
//           if (resp?.msg) Api.alert(resp.msg);
//           return { ...resp, status: response.status };
//         }
//       }

//       // -------------------------------
//       // LEGACY 401 HANDLING
//       // -------------------------------
//       if (
//         response?.status === 401 ||
//         resp?.errorCode === "AUTH_EXPIRED" ||
//         resp?.rid === "e-auth-16" ||
//         resp?.message?.toLowerCase() === "unauthorized access"
//       ) {
//         Auth.clear();
//         history.push("/login");
//         return;
//       }

//       // Default success
//       if (resp?.msg) Api.alert(resp.msg);
//       return { ...resp, status: response.status };
//     } catch (error) {
//       const { response } = error;

//       // -------------------------------
//       // TOKEN REFRESH LOGIC
//       // -------------------------------
//       if (response?.status === 401 && !originalRequest._retry) {
//         if (Api.isRefreshing) {
//           return new Promise((resolve, reject) => {
//             Api.failedQueue.push({ resolve, reject });
//           }).then((newToken) => {
//             originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
//             return axios(originalRequest);
//           });
//         }

//         originalRequest._retry = true;
//         Api.isRefreshing = true;

//         try {
//           const refreshToken = Auth.getRefreshToken();
//           const refreshResp = await axios.post(
//             `${import.meta.env.VITE_BASE_API_URL}/auth/refresh`,
//             { refreshToken }
//           );

//           const { accessToken, refreshToken: newRefreshToken } =
//             refreshResp.data;
//           Auth.setTokens(accessToken, newRefreshToken);

//           Api.failedQueue.forEach((prom) => prom.resolve(accessToken));
//           Api.failedQueue = [];

//           originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
//           return axios(originalRequest);
//         } catch (refreshError) {
//           Api.failedQueue.forEach((prom) => prom.reject(refreshError));
//           Api.failedQueue = [];

//           Auth.clear();
//           history.push("/signin");
//           throw refreshError;
//         } finally {
//           Api.isRefreshing = false;
//         }
//       }

//       if (response?.data?.msg && handleFormError) {
//         Api.alert({ title: "Error", text: response.data.msg });
//       }

//       throw response?.data || error;
//     }
//   }
// }

// import axios from "axios";
// import { globals } from "../store/globals";
// import Auth from "./auth";
// import { showAlert } from "../store/alert/alertActions";
// import { history } from "../store/configure/configureStore";
// import { v4 as uuidv4 } from "uuid";

//   let isSessionExpiredDispatched = false;

// export default class Api {
//   static isRefreshing = false;
//   static failedQueue = [];

//   static methods = {
//     GET: "get",
//     POST: "post",
//     PATCH: "patch",
//     PUT: "put",
//     DELETE: "delete",
//   };

//   static composeRouteUrl(route) {
//     if (route.startsWith("http")) return route;
//     return `${import.meta.env.VITE_BASE_API_URL}/api/${route}`;
//   }

//   static get(route, params) {
//     return Api.request(route, params, undefined, Api.methods.GET);
//   }

//   static post(route, data, appendHeaders, handleFormError = true) {
//     return Api.request(
//       route,
//       undefined,
//       data,
//       Api.methods.POST,
//       appendHeaders,
//       handleFormError
//     );
//   }

//   static put(route, data, params) {
//     return Api.request(route, params, data, Api.methods.PUT);
//   }

//   static patch(route, params, data) {
//     return Api.request(route, params, data, Api.methods.PATCH);
//   }

//   static delete(route, params) {
//     return Api.request(route, params, undefined, Api.methods.DELETE);
//   }

//   static alert(input, type = "info") {
//     const payload =
//       typeof input === "string"
//         ? { title: "Notification", msg: input }
//         : {
//             title: input.title || "Notification",
//             msg: input.text || input.msg,
//           };

//           console.log("alert is dispatched",payload)

//     globals.store.dispatch(
//       showAlert({
//             isOpen: true,
//             title: payload?.title,
//             type: "danger",
//             msg:payload?.msg,
//           })
//     );
//   }

//   static getSessionUuid() {
//     let sessionUuid = localStorage.getItem("sessionUuid");
//     if (!sessionUuid) {
//       sessionUuid = uuidv4();
//       localStorage.setItem("sessionUuid", sessionUuid);
//     }
//     return sessionUuid;
//   }

//   static async request(
//     route,
//     params,
//     data,
//     method,
//     appendHeaders,
//     handleFormError = true
//   ) {
//     const url = Api.composeRouteUrl(route);
//     let headers = {
//       Accept: "application/json",
//       "X-Requested-With": "XMLHttpRequest",
//       "Application-Type": "Web",
//       lat: "",
//       lon: "",
//       uuid: Api.getSessionUuid(),
//     };

//     const token = Auth.getAccessToken();
//     if (token) headers["Authorization"] = `Bearer ${token}`;

//     const userLocation = JSON.parse(
//       localStorage.getItem("userLocation") || "{}"
//     );
//     if (userLocation?.latitude && userLocation?.longitude) {
//       headers["lat"] = userLocation.latitude;
//       headers["lon"] = userLocation.longitude;
//     }

//     const isFormData =
//       typeof FormData !== "undefined" && data instanceof FormData;
//     if (!isFormData) {
//       headers["Content-Type"] = "application/json; charset=utf-8";
//     }

//     if (appendHeaders) headers = { ...headers, ...appendHeaders };

//     const originalRequest = {
//       method,
//       url,
//       headers,
//       params,
//       data,
//     };

//     try {
//       const response = await axios(originalRequest);
//       const resp = response?.data || {};

//       // --------------------------------------------
//       // RID-BASED LOGIC (UPDATED with e-auth-16 rule)
//       // --------------------------------------------
//       if (resp?.rid) {
//         // explicit auth logout errors
//         if (resp.rid === "e-auth-2" || resp.rid === "e-auth-14") {
//           Auth.clear();
//           history.push("/login");
//           throw resp;
//         }

//         // NEW RULE → e-auth-16 ALWAYS redirect
//         // if (resp.rid === "e-auth-16") {
//         //   Auth.clear();
//         //   history.push("/login");
//         //   throw resp;
//         // }

//         if (resp?.rid === "e-auth-16") {
//   Api.alert({
//     title: "Session Expired",
//     text: resp.message || "Your session has expired. Please login again.",
//   }, "danger");

//   Auth.clear();
//   history.push("/login");

//   // IMPORTANT: stop promise chain WITHOUT rejecting
//   return Promise.resolve(null);
// }

//         // general “e-” prefix errors
//         if (resp.rid.startsWith("e-")) {
//           if (handleFormError && resp?.message) {
//             Api.alert({ title: "Error", text: resp.message });
//           }
//           throw resp;
//         }

//         // “s-” prefix = success
//         if (resp.rid.startsWith("s-")) {
//           if (resp?.msg) Api.alert(resp.msg);
//           return { ...resp, status: response.status };
//         }
//       }

//       // ------------------------------------------------------
//       // LEGACY 401 / UNAUTHORIZED HANDLING (UPDATED)
//       // ------------------------------------------------------
//       if (
//         response?.status === 401 ||
//         resp?.errorCode === "AUTH_EXPIRED" ||
//         resp?.rid === "e-auth-16" ||
//         resp?.message?.toLowerCase() === "unauthorized access"
//       ) {
//         Auth.clear();
//         history.push("/login");
//         return;
//       }

//       // Default success
//       if (resp?.msg) Api.alert(resp.msg);
//       return { ...resp, status: response.status };
//     } catch (error) {
//       const { response } = error;

//       // --------------------------------------------
//       // TOKEN REFRESH WORKFLOW
//       // --------------------------------------------
//       if (response?.status === 401 && !originalRequest._retry) {
//         if (Api.isRefreshing) {
//           return new Promise((resolve, reject) => {
//             Api.failedQueue.push({ resolve, reject });
//           }).then((newToken) => {
//             originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
//             return axios(originalRequest);
//           });
//         }

//         originalRequest._retry = true;
//         Api.isRefreshing = true;

//         try {
//           const refreshToken = Auth.getRefreshToken();
//           const refreshResp = await axios.post(
//             `${import.meta.env.VITE_BASE_API_URL}/auth/refresh`,
//             { refreshToken }
//           );

//           const { accessToken, refreshToken: newRefreshToken } =
//             refreshResp.data;
//           Auth.setTokens(accessToken, newRefreshToken);

//           Api.failedQueue.forEach((prom) => prom.resolve(accessToken));
//           Api.failedQueue = [];

//           originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
//           return axios(originalRequest);
//         } catch (refreshError) {
//           Api.failedQueue.forEach((prom) => prom.reject(refreshError));
//           Api.failedQueue = [];

//           Auth.clear();
//           history.push("/login");
//           throw refreshError;
//         } finally {
//           Api.isRefreshing = false;
//         }
//       }

//       if (response?.data?.msg && handleFormError) {
//         Api.alert({ title: "Error", text: response.data.msg });
//       }

//       throw response?.data || error;
//     }
//   }
// }


// import axios from "axios";
// import { globals } from "../store/globals";
// import Auth from "./auth";
// import { showAlert } from "../store/alert/alertActions";
// import { history } from "../store/configure/configureStore";
// import { v4 as uuidv4 } from "uuid";

// let isSessionExpiredDispatched = false;

// export default class Api {
//   static isRefreshing = false;
//   static failedQueue = [];

//   static methods = {
//     GET: "get",
//     POST: "post",
//     PATCH: "patch",
//     PUT: "put",
//     DELETE: "delete",
//   };

//   static composeRouteUrl(route) {
//     if (route.startsWith("http")) return route;
//     return `${import.meta.env.VITE_BASE_API_URL}/api/${route}`;
//   }

//   static get(route, params) {
//     return Api.request(route, params, undefined, Api.methods.GET);
//   }

//   static post(route, data, appendHeaders, handleFormError = true) {
//     return Api.request(
//       route,
//       undefined,
//       data,
//       Api.methods.POST,
//       appendHeaders,
//       handleFormError
//     );
//   }

//   static put(route, data, params) {
//     return Api.request(route, params, data, Api.methods.PUT);
//   }

//   static patch(route, params, data) {
//     return Api.request(route, params, data, Api.methods.PATCH);
//   }

//   static delete(route, params) {
//     return Api.request(route, params, undefined, Api.methods.DELETE);
//   }

//   static alert(input, type = "danger") {
//     const payload =
//       typeof input === "string"
//         ? { title: "Notification", msg: input }
//         : {
//             title: input.title || "Notification",
//             msg: input.text || input.msg,
//           };

//     console.log("alert is dispatched", payload);

//     globals.store.dispatch(
//       showAlert({
//         isOpen: true,
//         title: payload.title,
//         type,
//         msg: payload.msg,
//       })
//     );
//   }

//   static getSessionUuid() {
//     let sessionUuid = localStorage.getItem("sessionUuid");
//     if (!sessionUuid) {
//       sessionUuid = uuidv4();
//       localStorage.setItem("sessionUuid", sessionUuid);
//     }
//     return sessionUuid;
//   }

//   static handleSessionExpired(message, rid) {
//     if (isSessionExpiredDispatched) return;

//     isSessionExpiredDispatched = true;
//     if (rid === "e-auth-16") {
//       Api.alert(
//         {
//           title: "Session Expired",
//           text: message,
//         },
//         "danger"
//       );
//     } else {
//       Api.alert(
//         {
//           title: "Error",
//           text: message,
//         },
//         "danger"
//       );
//     }

//     Auth.clear();
//     history.push("/login");

//     // allow next login session to alert again
//     setTimeout(() => {
//       isSessionExpiredDispatched = false;
//     }, 1000);
//   }

//   static async request(
//     route,
//     params,
//     data,
//     method,
//     appendHeaders,
//     handleFormError = true
//   ) {
//     const url = Api.composeRouteUrl(route);
//     let headers = {
//       Accept: "application/json",
//       "X-Requested-With": "XMLHttpRequest",
//       "Application-Type": "Web",
//       lat: "",
//       lon: "",
//       uuid: Api.getSessionUuid(),
//     };

//     const token = Auth.getAccessToken();

//     if (token) headers["Authorization"] = `Bearer ${token}`;

//     const userLocation = JSON.parse(
//       localStorage.getItem("userLocation") || "{}"
//     );
//     if (userLocation?.latitude && userLocation?.longitude) {
//       headers.lat = userLocation.latitude;
//       headers.lon = userLocation.longitude;
//     }

//     const isFormData =
//       typeof FormData !== "undefined" && data instanceof FormData;
//     if (!isFormData) {
//       headers["Content-Type"] = "application/json; charset=utf-8";
//     }

//     if (appendHeaders) headers = { ...headers, ...appendHeaders };

//     const originalRequest = {
//       method,
//       url,
//       headers,
//       params,
//       data,
//     };

//     try {
//       const response = await axios(originalRequest);
//       const resp = response?.data || {};

//       // ---------------- RID BASED ----------------
//       if (resp?.rid) {
//         if (resp.rid === "e-auth-2" || resp.rid === "e-auth-14") {
//           Api.handleSessionExpired(resp.message);
//           return null;
//         }

//         if (resp.rid === "e-auth-16") {
//           Api.handleSessionExpired(resp.message, resp?.rid);

//           return Promise.resolve({
//             __handled: true,
//             rid: resp.rid,
//           });
//         }

//         if (resp.rid.startsWith("e-")) {
//           if (handleFormError && resp.message) {
//             Api.alert({ title: "Error", text: resp.message });
//           }
//           return null;
//         }

//         if (resp.rid.startsWith("s-")) {
//           if (resp.msg) Api.alert(resp.msg);
//           return { ...resp, status: response.status };
//         }
//       }

//       // ------------ LEGACY 401 ----------------
//       if (
//         response.status === 401 ||
//         resp?.errorCode === "AUTH_EXPIRED" ||
//         resp?.message?.toLowerCase() === "unauthorized access"
//       ) {
//         Api.handleSessionExpired(resp.message);
//         return null;
//       }

//       if (resp?.msg) Api.alert(resp.msg);
//       return { ...resp, status: response.status };
//     } catch (error) {
//       const { response } = error;

//       // -------- TOKEN REFRESH --------
//       if (response?.status === 401 && !originalRequest._retry) {
//         if (Api.isRefreshing) {
//           return new Promise((resolve, reject) => {
//             Api.failedQueue.push({ resolve, reject });
//           }).then((newToken) => {
//             originalRequest.headers.Authorization = `Bearer ${newToken}`;
//             return axios(originalRequest);
//           });
//         }

//         originalRequest._retry = true;
//         Api.isRefreshing = true;

//         try {
//           const refreshToken = Auth.getRefreshToken();
//           const refreshResp = await axios.post(
//             `${import.meta.env.VITE_BASE_API_URL}/auth/refresh`,
//             { refreshToken }
//           );

//           const { accessToken, refreshToken: newRefreshToken } =
//             refreshResp.data;

//           Auth.setTokens(accessToken, newRefreshToken);

//           Api.failedQueue.forEach((p) => p.resolve(accessToken));
//           Api.failedQueue = [];

//           originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//           return axios(originalRequest);
//         } catch (refreshError) {
//           Api.failedQueue.forEach((p) => p.reject(refreshError));
//           Api.failedQueue = [];

//           Api.handleSessionExpired();
//           throw refreshError;
//         } finally {
//           Api.isRefreshing = false;
//         }
//       }

//       if (response?.data?.msg && handleFormError) {
//         Api.alert({ title: "Error", text: response.data.msg });
//       }

//       throw response?.data || error;
//     }
//   }
// }





import axios from "axios";
import { globals } from "../store/globals";
import Auth from "./auth";
import { showAlert } from "../store/alert/alertActions";
import { history } from "../store/configure/configureStore";
import { v4 as uuidv4 } from "uuid";

let isSessionExpiredDispatched = false;

export default class Api {
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
    return `${import.meta.env.VITE_BASE_API_URL}/api/${cleanRoute}`;
  }

  static get(route, params) {
    return Api.request(route, params, undefined, Api.methods.GET);
  }

  static post(route, data, appendHeaders, handleFormError = true) {
    return Api.request(
      route,
      undefined,
      data,
      Api.methods.POST,
      appendHeaders,
      handleFormError
    );
  }

  static put(route, data, params) {
    return Api.request(route, params, data, Api.methods.PUT);
  }

  static patch(route, params, data) {
    return Api.request(route, params, data, Api.methods.PATCH);
  }

  static delete(route, params) {
    return Api.request(route, params, undefined, Api.methods.DELETE);
  }

  static exportAgniveers(params) {
    const url = Api.composeRouteUrl("agniveer/export");
    const token = Auth.getAccessToken();
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${url}?${queryString}`;

    return fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Export failed");
        }
        const blob = await response.blob();
        const contentDisp = response.headers.get("Content-Disposition");
        let filename = `agniveers_export_${Date.now()}.xlsx`;
        if (contentDisp) {
          const match = contentDisp.match(/filename="?([^";\n]+)"?/);
          if (match) filename = match[1].trim();
        }
        return { blob, filename };
      })
      .then(({ blob, filename }) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        return { success: true };
      });
  }

  static importAgniveers(file, tradeId) {
    const formData = new FormData();
    formData.append("file", file);
    if (tradeId != null) {
      const id = typeof tradeId === "string" ? tradeId : (tradeId._id || tradeId)?.toString?.();
      if (id) formData.append("tradeId", id);
    }

    return Api.post("agniveer/import", formData, undefined, false);
  }

  static alert(input, type = "danger") {
    const payload =
      typeof input === "string"
        ? { title: "Notification", msg: input }
        : {
            title: input.title || "Notification",
            msg: input.text || input.msg,
          };

    console.log("alert is dispatched", payload);

    globals.store.dispatch(
      showAlert({
        isOpen: true,
        title: payload.title,
        type,
        msg: payload.msg,
      })
    );
  }

  static getSessionUuid() {
    let sessionUuid = localStorage.getItem("sessionUuid");
    if (!sessionUuid) {
      sessionUuid = uuidv4();
      localStorage.setItem("sessionUuid", sessionUuid);
    }
    return sessionUuid;
  }

  static handleSessionExpired(message, rid) {
    if (isSessionExpiredDispatched) return;

    isSessionExpiredDispatched = true;
    if (rid === "e-auth-16") {
      Api.alert(
        {
          title: "Session Expired",
          text: message,
        },
        "danger"
      );
    } else {
      Api.alert(
        {
          title: "Error",
          text: message,
        },
        "danger"
      );
    }

    Auth.clear();
    history.push("/login");

    // allow next login session to alert again
    setTimeout(() => {
      isSessionExpiredDispatched = false;
    }, 1000);
  }

  static async request(
    route,
    params,
    data,
    method,
    appendHeaders,
    handleFormError = true
  ) {
    const url = Api.composeRouteUrl(route);
    let headers = {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Application-Type": "Web",
      lat: "",
      lon: "",
      uuid: Api.getSessionUuid(),
    };

    const token = Auth.getAccessToken();

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const userLocation = JSON.parse(
      localStorage.getItem("userLocation") || "{}"
    );
    if (userLocation?.latitude && userLocation?.longitude) {
      headers.lat = userLocation.latitude;
      headers.lon = userLocation.longitude;
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
      const resp = response?.data || {};

      // ---------------- RID BASED ----------------
      if (resp?.rid) {
        if (resp.rid === "e-auth-2" || resp.rid === "e-auth-14") {
          Api.handleSessionExpired(resp.message);
          return null;
        }

        if (resp.rid === "e-auth-16") {
          Api.handleSessionExpired(resp.message, resp?.rid);

          return Promise.resolve({
            __handled: true,
            rid: resp.rid,
          });
        }

        // if (resp.rid.startsWith("e-")) {
        //   if (handleFormError && resp.message) {
        //     Api.alert({ title: "Error", text: resp.message });
        //   }
        //   return null;
        // }


        if (resp?.rid === "e-agniveer-7") {
  // force this specific RID into catch block
  throw {
    rid: resp.rid,
    message: resp.message,
    data: resp.data,
    status: response.status,
  };
}

if (resp?.rid.startsWith("e-")) {
  if (handleFormError && resp.message) {
    Api.alert({ title: "Error", text: resp.message });
  }
  return null;
}


        if (resp.rid.startsWith("s-")) {
          if (resp.msg) Api.alert(resp.msg);
          return { ...resp, status: response.status };
        }
      }

      // ------------ LEGACY 401 ----------------
      if (
        response.status === 401 ||
        resp?.errorCode === "AUTH_EXPIRED" ||
        resp?.message?.toLowerCase() === "unauthorized access"
      ) {
        Api.handleSessionExpired(resp.message);
        return null;
      }

      if (resp?.msg) Api.alert(resp.msg);
      return { ...resp, status: response.status };
    } catch (error) {
      const { response } = error;

      // -------- TOKEN REFRESH --------
      if (response?.status === 401 && !originalRequest._retry) {
        if (Api.isRefreshing) {
          return new Promise((resolve, reject) => {
            Api.failedQueue.push({ resolve, reject });
          }).then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axios(originalRequest);
          });
        }

        originalRequest._retry = true;
        Api.isRefreshing = true;

        try {
          const refreshToken = Auth.getRefreshToken();
          const refreshResp = await axios.post(
            `${import.meta.env.VITE_BASE_API_URL}/auth/refresh`,
            { refreshToken }
          );

          const { accessToken, refreshToken: newRefreshToken } =
            refreshResp.data;

          Auth.setTokens(accessToken, newRefreshToken);

          Api.failedQueue.forEach((p) => p.resolve(accessToken));
          Api.failedQueue = [];

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          Api.failedQueue.forEach((p) => p.reject(refreshError));
          Api.failedQueue = [];

          Api.handleSessionExpired();
          throw refreshError;
        } finally {
          Api.isRefreshing = false;
        }
      }

      if (response?.data?.msg && handleFormError) {
        Api.alert({ title: "Error", text: response.data.msg });
      }

      throw response?.data || error;
    }
  }
}



