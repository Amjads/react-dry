import { combineReducers } from 'redux';
import customers from './customers';
import auth from './auth';
// ##REDUCER_IMPORT##

const rootReducer = combineReducers({
  customers,
  auth,
  // ##REDUCER_KEY##
});

export default rootReducer;
