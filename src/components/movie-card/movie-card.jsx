// import react to React instance
import React from 'react';

//Create and expose MovieCard, for list of movies titles
export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
  }
}

/* NOTE
this.props refer to class component MovieCard
ES6 object destruction, short form of const movie=this.props.movie, destructuring props movie and onMovieClick objects from MovieCard passed by MainView
onClick is special attribute, which accepts function, a call back function once the element is clicked
onClick={() => { onMovieClick(movie); } is event listener, listen when user click on movie.Title, pass argument "movie" to onMovieClick
*/