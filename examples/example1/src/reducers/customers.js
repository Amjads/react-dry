import { actionTypes } from '../actions/customers';

const reducer = (state = {
// ##REDUCER_STATE##
}, action) => {
  switch (action.type) {
    case actionTypes.FETCHING:
      return {
        ...state,
        fetched: false,
        fetching: true,
      };

    case actionTypes.FETCH_FAILED:
      return {
        ...state,
        fetched: false,
        fetching: false,
      };

    case actionTypes.FETCHED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.data,
      };
    // ##REDUCER_CASE##

    default:
      return state;
  }
};

export default reducer;
