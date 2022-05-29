//Declare action types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';



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
  return {
    type: SET_MOVIES,
    value
  };
}

//Action to return user info
export function setUser(value) {
  console.log('SET_USER action triggered')
  return {
    type: SET_USER,
    value
  };
}

//Action to update info
export function updateUser(value) {
  console.log('UPDATE_USER action triggered')
  return {
    type: UPDATE_USER,
    value
  };
}