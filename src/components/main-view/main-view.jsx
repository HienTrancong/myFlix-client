//Import react to React instance
import React from 'react';

//Import axios library
import axios from 'axios';

//Import MovieCard (list of movies) and MovieView (movie's detail) components
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

//Create and expose MaineView component, as class component
export class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    };
  }

  componentDidMount() {
    axios.get ('https://hien-tran-080222.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  //Custom component method to change state
  setSelectedMovie(newSelectedMovie) { 
    this.setState({selectedMovie: newSelectedMovie});
  }

  //Render visual representation of component
  render () {
    const { movies, selectedMovie } = this.state;
    if (movies.length === 0) return <div className="main-view" />;
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => {this.setSelectedMovie(newSelectedMovie);}}/>
          : movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => {this.setSelectedMovie(movie)}} />)
        }
      </div>
    );
  }
}


/* NOTE
axios 
  https://axios-http.com/docs/intro

componentDidMount() method is called after the component is rendered.
This is where you run statements that requires that the component is already placed in the DOM.
https://www.w3schools.com/react/react_lifecycle.asp

React class components have built.in state object, storing property values that belong to the component
Whenever state changes, the component will be automatically re-rendered, update only the effected nodes

React.Component: generic react template
  constructor(){}: to create component, function is called when component gets initiated
    super(): statement execute the parent component's constructor function, and MainView got all functions of parent component (React.Component), init your component's state
    this.state = { // this refer to MainView component
      movies: []: starting value of the MainView is initialized with object containing movies holding an array
      selectedMovie: null initial value as null, as no movies cards were clicked

Custom component method:
  onMovieClick={(movie) => {this.setSelectedMovie(movie)}}
    equal to 
  onMovieClick={newSelectedMovie => { this.setState({ selectedMovie: newSelectedMovie }); }}
    however, it would be unreadable if the function is more complex, so we create a custom component method 
  setSelectedMovie() {} before the render method for the code block
  setSelectedMovie(newSelectedMovie) {
      this.setState({selectedMovie: newSelectedMovie});
    }

      this.setState is React method to change a state, always takes an object with key-value pair of new state value

render(): 
rendering only affect the changed component
Props get passed through elements 
  const { movies, selectedMovie } = this.state;//ES6 feature called object destruction. It’s a shortened form of const movies = this.state.movies and const selectedMovie = this.state.selectedMovie, destructuring compenent states into objects

  {selectedMovie
    ? <MovieView .../>
    : movies.map(movie => <MovieCard .../>)
  }
  is a conditional ternary operator a condition ? expression to execute if condition is truthy : expression when condition is falsy
  if selectedMovie is not null meaning a movie is selected, display MovieView, else display movie card aka. a list of all movie titles

  movies.map creates a new array populated with the results of calling a provided function on every element in the calling array, so it create movie array with each movie card to <MovieCard key../>, then add custom ATTRIBUTE (or propertie) movie = {movie}, can be movieData={movie}, this kind of attribute is special, or reffered as PROPS
  onMovieClick is a function as prop, passed to movie-card, include the logic in it

react event listener https://www.w3schools.com/react/react_events.asp
*/