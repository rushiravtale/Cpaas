import {
  CREATE_AGNIVEER_PENDING,
  CREATE_AGNIVEER_SUCCESS,
  CREATE_AGNIVEER_ERROR,
  LOAD_AGNIVEERS,
  GET_AGNIVEERS_PENDING,
  GET_AGNIVEERS_SUCCESS,
  GET_AGNIVEERS_ERROR,
  GET_SINGLE_AGNIVEER_SUCCESS,
  GET_SINGLE_AGNIVEER_PENDING,
  GET_SINGLE_AGNIVEER_ERROR,
  EXPORT_AGNIVEERS_PENDING,
  EXPORT_AGNIVEERS_SUCCESS,
  EXPORT_AGNIVEERS_ERROR,
  IMPORT_AGNIVEERS_PENDING,
  IMPORT_AGNIVEERS_SUCCESS,
  IMPORT_AGNIVEERS_ERROR,
} from "./tradeUserActionTypes";

const initialState = {
  agniveers: [],
  pagination: {
    totalDocs: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 5,
  },

    // Edit single agniveer
  editAgniveer: null,
  loadingEditAgniveer: false,
  editAgniveerError: null,

  // Create Agniveer
  createPending: false,
  createError: null,

  // Get Agniveers
  loadingAgniveers: false,
  getAgniveersError: null,

  // Export Agniveers
  exportingAgniveers: false,
  exportError: null,

  // Import Agniveers
  importingAgniveers: false,
  importError: null,
  importResult: null,
};

const tradeUserReducer = (state = initialState, action) => {
  switch (action.type) {
    /* -------------------------- CREATE AGNIVEER -------------------------- */
    case CREATE_AGNIVEER_PENDING:
      return { ...state, createPending: true, createError: null };

    case CREATE_AGNIVEER_SUCCESS:
      return { ...state, createPending: false };

    case CREATE_AGNIVEER_ERROR:
      return { ...state, createPending: false, createError: action.payload };

    /* ----------------------------- LOAD LIST ----------------------------- */
    case LOAD_AGNIVEERS:
      return { ...state, agniveers: action.payload };

    /* ------------------------- GET AGNIVEERS LIST ------------------------ */
    case GET_AGNIVEERS_PENDING:
      return { ...state, loadingAgniveers: true };

    case GET_AGNIVEERS_SUCCESS:
      return {
        ...state,
        loadingAgniveers: false,
        agniveers: action.payload.agniveers,
        pagination: action.payload.pagination,
      };

    case GET_AGNIVEERS_ERROR:
      return {
        ...state,
        loadingAgniveers: false,
        getAgniveersError: action.payload,
      };

     case GET_SINGLE_AGNIVEER_PENDING:
      return { ...state, loadingEditAgniveer: true, editAgniveer: null };

    case GET_SINGLE_AGNIVEER_SUCCESS:
      return {
        ...state,
        loadingEditAgniveer: false,
        editAgniveer: action.payload,
      };

    case GET_SINGLE_AGNIVEER_ERROR:
      return {
        ...state,
        loadingEditAgniveer: false,
        editAgniveerError: action.payload,
        editAgniveer: null,
      };

    /* ------------------------- EXPORT AGNIVEERS ------------------------- */
    case EXPORT_AGNIVEERS_PENDING:
      return { ...state, exportingAgniveers: true, exportError: null };

    case EXPORT_AGNIVEERS_SUCCESS:
      return { ...state, exportingAgniveers: false };

    case EXPORT_AGNIVEERS_ERROR:
      return {
        ...state,
        exportingAgniveers: false,
        exportError: action.payload,
      };

    /* ------------------------- IMPORT AGNIVEERS ------------------------- */
    case IMPORT_AGNIVEERS_PENDING:
      return {
        ...state,
        importingAgniveers: true,
        importError: null,
        importResult: null,
      };

    case IMPORT_AGNIVEERS_SUCCESS:
      return {
        ...state,
        importingAgniveers: false,
        importResult: action.payload,
      };

    case IMPORT_AGNIVEERS_ERROR:
      return {
        ...state,
        importingAgniveers: false,
        importError: action.payload,
      };

    default:
      return state;
  }
};

export default tradeUserReducer;
