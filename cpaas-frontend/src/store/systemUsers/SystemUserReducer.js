import {
  LOAD_SYSTEM_USERS,
  GET_SYSTEM_USER_BY_ID_PENDING,
  GET_SYSTEM_USER_BY_ID_SUCCESS,
  GET_SYSTEM_USER_BY_ID_ERROR,
  ADD_SYSTEM_USER_PENDING,
  ADD_SYSTEM_USER_SUCCESS,
  ADD_SYSTEM_USER_ERROR,
  UPDATE_SYSTEM_USER,
  RESET_SYSTEM_USERS_PAGINATION,
  DELETE_SYSTEM_USER,
} from "./SystemUserActionTypes";

const initialState = {
  users: [],
  selectedUser: null,
  pagination: {
    totalDocs: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 5,
  },
  addUserPending: false,
  addUserError: null,
  loadingUserById: false,
  userByIdError: null,
};

const SystemUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SYSTEM_USERS:
      return {
        ...state,
        users: action.payload.users,
        pagination: action.payload.pagination,
      };

    case GET_SYSTEM_USER_BY_ID_PENDING:
      return { ...state, loadingUserById: true, selectedUser: null };

    case GET_SYSTEM_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loadingUserById: false,
        selectedUser: action.payload,
      };

    case GET_SYSTEM_USER_BY_ID_ERROR:
      return {
        ...state,
        loadingUserById: false,
        userByIdError: action.payload,
      };

    case ADD_SYSTEM_USER_PENDING:
      return { ...state, addUserPending: true, addUserError: null };

    case ADD_SYSTEM_USER_SUCCESS:
      return { ...state, addUserPending: false };

    case ADD_SYSTEM_USER_ERROR:
      return { ...state, addUserPending: false, addUserError: action.payload };

    case UPDATE_SYSTEM_USER:
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload._id ? action.payload : u
        ),
      };

    case DELETE_SYSTEM_USER:
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };

      case RESET_SYSTEM_USERS_PAGINATION:
  return {
    ...state,
    pagination: {
      totalDocs: 0,
      totalPages: 0,
      currentPage: 1,
      limit: 5,   // default
    },
  };

    default:
      return state;
  }
};

export default SystemUserReducer;
