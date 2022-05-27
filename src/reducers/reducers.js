import {
  SET_MOVIES,
  SET_FILTER
} from '../actions/actions';

import { combineReducers } from 'redux';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER: return action.value;
    default: return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      console.log('SET_MOVIES reducer reached');
      return action.value;
    default: return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies
});

export default moviesApp;
