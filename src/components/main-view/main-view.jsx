//Import react to React instance
import React from "react";

//Import axios library to fetch movies from database
import axios from "axios";

//Import RegistrationView component (user login)
import { RegistrationView } from "../registration-view/registration-view";
//Import LoginView component (user login)
import { LoginView } from "../login-view/login-view";
//Import MovieCard component (list of movies)
import { MovieCard } from "../movie-card/movie-card";
//Import MovieView component (movie's detail)
import { MovieView } from "../movie-view/movie-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Create and expose MainView component, as class component
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null,
    };
  }

  //Axios to do ajax operation, to fetch the actual movies from myFlix movies API
  componentDidMount() {
    axios
      .get("https://hien-tran-080222.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Custom component method to change state, when a movie title is clicked
  setSelectedMovie(newSelectedMovie) {
    this.setState({ selectedMovie: newSelectedMovie });
  }

  //Custom component method to change state, when a movie title is clicked
  onRegistration(register) {
    this.setState({
      register,
    });
  }

  //When user logins i.e. click Submit button on loginview, user state change from null to user input
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  //Render visual representation of component
  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!register)
      return (
        <RegistrationView
          onRegistration={(register) => this.onRegistration(register)}
        />
      );

    if (!user)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
        />
      );

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;
    //If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all movies will be returned
    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col md={3}>
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(movie) => {
                  this.setSelectedMovie(movie);
                }}
              />
            </Col>
          ))
        )}
      </Row>
    );
  }
}

/* NOTE

<Col md={8}> //md medium screen size 768px, define column with of 8/12

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

  
  If there is no user aka user is null/faulty, the LoginView is rendered. If there is a user logged in, the user details are*passed as a prop to the LoginView
  method, onLoggedIn, will be passed as a prop with the same name to LoginView
  (note that this just happens to be the same name—it’s not a constraint). This method will update the user state of the MainView component and will be called when the user has successfully logged in
    

  {selectedMovie
    ? <MovieView .../>
    : movies.map(movie => <MovieCard .../>)
  }
  is a conditional ternary operator a condition ? expression to execute if condition is truthy : expression when condition is falsy
  if selectedMovie is not null meaning a movie is selected, display MovieView, else display movie card aka. a list of all movie titles

  movies.map creates a new array populated with the results of calling a provided function on every element in the calling array, so it create movie array with each movie card to <MovieCard key../>, then add custom ATTRIBUTE (or propertie) movie = {movie}, can be movieData={movie}, this kind of attribute is special, or reffered as PROPS
  onMovieClick is a function as prop, passed to movie-card, include the logic in it

react event listener https://www.w3schools.com/react/react_events.asp

test branch

*/
