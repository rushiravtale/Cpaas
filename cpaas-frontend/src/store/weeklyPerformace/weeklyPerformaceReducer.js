import * as types from "./weeklyPerformaceActionTypes";

const initialState = {
  data: [], // array of parameter objects
};

const weeklyPerformaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_WEEKLY_PERFORMANCE:
      return {
        ...state,
        data: action.payload,
      };

    case types.SET_WEEKLY_PERFORMANCE: {
      const { id, value } = action.payload;
      return {
        ...state,
        data: state.data.map((p) => (p.id === id ? { ...p, value } : p)),
      };
    }

    case types.SAVE_WEEKLY_PERFORMANCE:
      // no-op for now; simply return current state. In future store server ack.
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default weeklyPerformaceReducer;
