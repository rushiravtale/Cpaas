
import {
  SUBMIT_PHYSICAL_PROFICIENCY_PENDING,
  SUBMIT_PHYSICAL_PROFICIENCY_SUCCESS,
  SUBMIT_PHYSICAL_PROFICIENCY_ERROR,
  FETCH_PHYSICAL_PROFICIENCY_PENDING,
  FETCH_PHYSICAL_PROFICIENCY_SUCCESS,
  FETCH_PHYSICAL_PROFICIENCY_ERROR,
} from "./PhysicalProficiencyActionTypes";

const initialState = {
  submitting: false,
  submitError: null,
  submitSuccess: false,

  loading: false,
  data: null,
  fetchError: null,
};

const physicalProficiencyReducer = (state = initialState, action) => {

    
  switch (action.type) {
   
    case SUBMIT_PHYSICAL_PROFICIENCY_PENDING:
      return {
        ...state,
        submitting: true,
        submitError: null,
        submitSuccess: false,
      };

    case SUBMIT_PHYSICAL_PROFICIENCY_SUCCESS:
      return {
        ...state,
        submitting: false,
        submitSuccess: true,
        data: action.payload,
      };

    case SUBMIT_PHYSICAL_PROFICIENCY_ERROR:
      return {
        ...state,
        submitting: false,
        submitError: action.payload,
      };

    /** -----------------------------
     * FETCH PHYSICAL PROFICIENCY
     * ----------------------------- */
    case FETCH_PHYSICAL_PROFICIENCY_PENDING:
      return {
        ...state,
        loading: true,
        fetchError: null,
      };

    case FETCH_PHYSICAL_PROFICIENCY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_PHYSICAL_PROFICIENCY_ERROR:
      return {
        ...state,
        loading: false,
        fetchError: action.payload,
      };

    default:
      return state;
  }
};

export default physicalProficiencyReducer;
