import {
  FETCH_OPERATOR_TECH_PHASE_PENDING,
  FETCH_OPERATOR_TECH_PHASE_SUCCESS,
  FETCH_OPERATOR_TECH_PHASE_ERROR,
  SAVE_OPERATOR_TECH_PHASE_PENDING,
  SAVE_OPERATOR_TECH_PHASE_SUCCESS,
  SAVE_OPERATOR_TECH_PHASE_ERROR,
  CLEAR_OPERATOR_TECH_PHASE,
} from "./techPhaseOperatorActionTypes";

const initialState = {
  loading: false,
  saving: false,
  form: null,
  rawData: null,
  recordId: null,
  error: null,
};

const techPhaseOperatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OPERATOR_TECH_PHASE_PENDING:
      return { ...state, loading: true, error: null };
    case FETCH_OPERATOR_TECH_PHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        form: action.payload.form,
        rawData: action.payload.rawData,
        recordId: action.payload.recordId,
      };
    case FETCH_OPERATOR_TECH_PHASE_ERROR:
      return { ...state, loading: false, error: action.payload };
    case SAVE_OPERATOR_TECH_PHASE_PENDING:
      return { ...state, saving: true, error: null };
    case SAVE_OPERATOR_TECH_PHASE_SUCCESS:
      return { ...state, saving: false };
    case SAVE_OPERATOR_TECH_PHASE_ERROR:
      return { ...state, saving: false, error: action.payload };
    case CLEAR_OPERATOR_TECH_PHASE:
      return initialState;
    default:
      return state;
  }
};

export default techPhaseOperatorReducer;