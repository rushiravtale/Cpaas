// import { masterActionTypes } from "./masterActionTypes";

// const initialState = {
//   rolesPending: false,
//   rolesError: null,
//   roles: [],

//   tradesPending: false,
//   tradesError: null,
//   trades: [],
// };

// export default function masterReducer(state = initialState, action) {
//   switch (action.type) {
//     /** ROLES */
//     case masterActionTypes.FETCH_ROLES_PENDING:
//       return { ...state, rolesPending: true, rolesError: null };

//     case masterActionTypes.FETCH_ROLES_SUCCESS:
//       return {
//         ...state,
//         rolesPending: false,
//         rolesError: null,
//         roles: action.payload.roles,
//       };

//     case masterActionTypes.FETCH_ROLES_ERROR:
//       return { ...state, rolesPending: false, rolesError: true, roles: [] };

//     /** TRADES */
//     case masterActionTypes.FETCH_TRADES_PENDING:
//       return { ...state, tradesPending: true, tradesError: null };

//     case masterActionTypes.FETCH_TRADES_SUCCESS:
//       return {
//         ...state,
//         tradesPending: false,
//         tradesError: null,
//         trades: action.payload.trades,
//       };

//     case masterActionTypes.FETCH_TRADES_ERROR:
//       return { ...state, tradesPending: false, tradesError: true, trades: [] };

//     default:
//       return state;
//   }
// }


import { masterActionTypes } from "./masterActionTypes";

const initialState = {
  rolesPending: false,
  rolesError: null,
  roles: [],

  tradesPending: false,
  tradesError: null,
  trades: [],

  coursesPending: false,
  coursesError: null,
  courses: [],
};

export default function masterReducer(state = initialState, action) {
  switch (action.type) {
    /** ROLES */
    case masterActionTypes.FETCH_ROLES_PENDING:
      return { ...state, rolesPending: true, rolesError: null };

    case masterActionTypes.FETCH_ROLES_SUCCESS:
      return {
        ...state,
        rolesPending: false,
        rolesError: null,
        roles: action.payload.roles,
      };

    case masterActionTypes.FETCH_ROLES_ERROR:
      return { ...state, rolesPending: false, rolesError: true, roles: [] };

    /** TRADES */
    case masterActionTypes.FETCH_TRADES_PENDING:
      return { ...state, tradesPending: true, tradesError: null };

    case masterActionTypes.FETCH_TRADES_SUCCESS:
      return {
        ...state,
        tradesPending: false,
        tradesError: null,
        trades: action.payload.trades,
      };

    case masterActionTypes.FETCH_TRADES_ERROR:
      return { ...state, tradesPending: false, tradesError: true, trades: [] };

    /** COURSES */
    case masterActionTypes.FETCH_COURSES_PENDING:
      return { ...state, coursesPending: true, coursesError: null };

    case masterActionTypes.FETCH_COURSES_SUCCESS:
      return {
        ...state,
        coursesPending: false,
        coursesError: null,
        courses: action.payload.courses,
      };

    case masterActionTypes.FETCH_COURSES_ERROR:
      return { ...state, coursesPending: false, coursesError: true, courses: [] };

    default:
      return state;
  }
}
