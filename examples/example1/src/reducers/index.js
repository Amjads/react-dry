import { combineReducers } from 'redux';
import hola from './hola';
import customers from './customers';
import jsonDATA from './jsonDATA';
// ##REDUCER_IMPORT##

const rootReducer = combineReducers({
  hola,
  customers,
  jsonDATA,
  // ##REDUCER_KEY##
});

export default rootReducer;
