import {
  FETCH_OFC_TECH_PHASE_PENDING,
  FETCH_OFC_TECH_PHASE_SUCCESS,
  FETCH_OFC_TECH_PHASE_ERROR,
  SAVE_OFC_TECH_PHASE_PENDING,
  SAVE_OFC_TECH_PHASE_SUCCESS,
  SAVE_OFC_TECH_PHASE_ERROR,
  CLEAR_OFC_TECH_PHASE,
} from "./ofcTechPhaseActionTypes";

const initialState = {
  loading: false,
  saving: false,
  form: null,
  rawData: null,
  recordId: null,
  error: null,
};

const ofcTechPhaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OFC_TECH_PHASE_PENDING:
      return { ...state, loading: true, error: null };
    case FETCH_OFC_TECH_PHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        form: action.payload.form,
        rawData: action.payload.rawData,
        recordId: action.payload.recordId,
      };
    case FETCH_OFC_TECH_PHASE_ERROR:
      return { ...state, loading: false, error: action.payload };
    case SAVE_OFC_TECH_PHASE_PENDING:
      return { ...state, saving: true, error: null };
    case SAVE_OFC_TECH_PHASE_SUCCESS:
      return { ...state, saving: false };
    case SAVE_OFC_TECH_PHASE_ERROR:
      return { ...state, saving: false, error: action.payload };
    case CLEAR_OFC_TECH_PHASE:
      return initialState;
    default:
      return state;
  }
};

export default ofcTechPhaseReducer;