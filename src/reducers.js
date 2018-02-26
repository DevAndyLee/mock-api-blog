import * as axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

const initialState = {
  fetching: false,
  operators: undefined,
  value: undefined,
  calculating: false,
  calculated: false,
  errorMessage: null
};

const actions = {
  FETCHING: 'app/FETCHING',
  RECEIVED: 'app/RECEIVED',
  CALCULATING: 'app/CALCULATING',
  CALCULATED: 'app/CALCULATED',
  ERROR_OCCURED: 'app/ERROR_OCCURED'
}

export default function(state = initialState, action) {
  switch(action.type) {
    case actions.FETCHING:
      return Object.assign({}, state, {
        fetching: true
      });
    case actions.RECEIVED:
      return Object.assign({}, state, {
        fetching: false,
        operators: action.operators,
        value: action.value
      });
    case actions.CALCULATING:
      return Object.assign({}, state, {
        calculating: true,
        calculated: false,
        errorMessage: null
      });
    case actions.CALCULATED:
      return Object.assign({}, state, {
        calculating: false,
        calculated: true,
        value: action.value
      });
    case actions.ERROR_OCCURED:
      return Object.assign({}, state, {
        calculating: false,
        errorMessage: action.message
      });
    default:
      return state;
  }
}

export function getIfNecessary() {
  return (dispatch, getState) => {
    if (!getState().operators) {
      dispatch(get());
    } else {
      return Promise.resolve();
    }
  };
}

function get() {
  return dispatch => {
    dispatch({ type: actions.FETCHING });

    Promise.all([api.get('/operators'), api.get('/domaths')])
      .then(([operatorsResponse, mathsResponse]) => {
        dispatch({
          type: actions.RECEIVED,
          operators: operatorsResponse.data.operators,
          value: mathsResponse.data.value
        });
      });
  }
}

export function doMaths(operator, input) {
  return dispatch => {
    dispatch({ type: actions.CALCULATING });

    api.post('/domaths', { operator, input })
      .then(response => {
        dispatch({
          type: actions.CALCULATED,
          value: response.data.value
        });
      })
      .catch(err => {
        dispatch({
          type: actions.ERROR_OCCURED,
          message: err.response.data || err.response.statusText
        });
      });
  }
}
