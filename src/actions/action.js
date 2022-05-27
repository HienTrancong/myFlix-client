//Declare action types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';


//Action to filter movie list
export function setFilter(value) {
  console.log('SET_FILTER action triggered')
  return {
    type: SET_FILTER,
    value
  };
}

//Action to return movie list
export function setMovies(value) {
  console.log('SET_MOVIES action triggered')
  return {//return action object
    type: SET_MOVIES,
    value
  };
}