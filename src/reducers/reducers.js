import {
  SET_MOVIES,
  SET_FILTER,
  SET_USER,
  UPDATE_USER
} from '../actions/actions';

import { combineReducers } from 'redux';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      console.log('SET_FILTER reducer reached');
      return action.value;
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

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      console.log('SET_USER reducer reached');
      return action.value;
    case UPDATE_USER:
      console.log('UPDATE_USER reducer reached');
      return action.value;
    default: return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user
});

export default moviesApp;

