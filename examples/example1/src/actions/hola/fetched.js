import types from './types';

const fetched = data => ({
  type: types.FETCHED,
  data,
});

export default fetched;
