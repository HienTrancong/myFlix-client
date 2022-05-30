import {
  SET_MOVIES,
  SET_FILTER,
  SET_USER,
  UPDATE_USER,
  SET_FAVORITEMOVIES,
  ADD_FAVORITEMOVIE,
  REMOVE_FAVORITEMOVIE
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

function favoriteMovies(state = [], action) {
  switch (action.type) {
    case SET_FAVORITEMOVIES:
      console.log('SET_FAVORITEMOVIES reducer reached');
      return action.value;
    case ADD_FAVORITEMOVIE:
      console.log('ADD_FAVORITEMOVIE reducer reached');
      return [...state, action.value];
    case REMOVE_FAVORITEMOVIE:
      console.log('REMOVE_FAVORITEMOVIE reducer reached');
      return state.filter(movie => movie._id != action.value._id);
    default: return state;

  }
}



const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  favoriteMovies
});

export default moviesApp;

