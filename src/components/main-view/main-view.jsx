//Import react to React instance
import React from 'react';

//Import MovieCard (list of movies) and MovieView (movie's detail) components
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

//Create and expose MaineView component, as class component
export class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [
        {_id:1,Title:'Inception',Description:': A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',ImagePath:'https://images.app.goo.gl/2UpK3qrDRjF9rYB36'},
        {_id:2,Title:'The Shawshank Redemption',Description: ': Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',ImagePath: 'https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=ext_shr_lnk'},
        {_id:3,Title:'Gladiator',Description:'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',ImagePath: 'https://images.app.goo.gl/Lvfz4TnNd7vCoUpY6'}
      ],
      selectedMovie: null
    };
  }

  //Custom component method to change state
  setSelectedMovie(newSelectedMovie) { 
    this.setState({selectedMovie: newSelectedMovie});
  }

  //Render visual representation of component
  render () {
    const { movies, selectedMovie } = this.state;
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
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