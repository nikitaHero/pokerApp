const actionTypes = {
  GET_HANDS_REQUEST: "GET_HANDS_REQUEST",
  GET_HANDS_SUCCESS: "GET_HANDS_SUCCESS",
  GET_HANDS_ERROR: "GET_HANDS_ERROR",
  SET_WINNER: "SET_WINNER",
};

const initialState = {
  isFetching: false,
  cards: null,
  err: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_HANDS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.GET_HANDS_SUCCESS:
      return {
        ...state,
        cards: action.payload,
        isFetching: false,
      };
    case actionTypes.GET_HANDS_ERROR:
      return {
        ...state,
        err: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};

export const actions = {
  getHandsRequest: () => ({
    type: actionTypes.GET_HANDS_REQUEST,
  }),
  getHandsSuccess: (payload) => ({
    type: actionTypes.GET_HANDS_SUCCESS,
    payload,
  }),
  getHandsError: (payload) => ({
    type: actionTypes.GET_HANDS_ERROR,
    payload,
  }),
};
