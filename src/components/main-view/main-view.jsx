import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import './main-view.scss'
import { Container, Row, Col, Button } from "react-bootstrap";


import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";

export class MainView extends React.Component {//Create and expose MainView component, as class component
  constructor() {
    super();
    this.state = {//Initial state set to null
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');//Get the value of the token from local storage and assign to accessToken
    if (accessToken !== null) {
      this.setState({//Change state of MainView user by value of user from localStorage
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken)//Call getMovies method
    }
  }

  //When user sucessfully logs in, this function updates 'user' property to that user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  //When user logs out, token and user are removed from localStorage, 'user' state set to null
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  getMovies(token) {//passing bearer authorization in header of HTTP request, to make authenticated requested to the API
    axios.get("https://hien-tran-080222.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {// Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Render visual representation of component
  render() {
    const { movies, user } = this.state;
    return (
      <Routes>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {//If no user loggedin, render login view, preventing rendering register view
            if (!user)
              return <Col>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m.id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col> <RegistrationView /> </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m.id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path={"/users/${user}"} render={({ history }) => {
            if (!user) return <Redirect to="/" />
            return (<Col>
              <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} />
            </Col>
            )
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Redirect to="/" />
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Redirect to="/" />
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView director={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />
        </Row>
      </Routes>
    );
  }
}

/* NOTE

Router component, contains Route component
      each Route component has a path prop expresses what it should match
      and a render() prop to tell what to render if it matches the URL
      path to a movie view contains a fixed fragment (movies/:movieId).
    

  //Custom component method to change state, when a movie title is clicked
  setSelectedMovie(newSelectedMovie) {
    this.setState({ selectedMovie: newSelectedMovie });
  }


    if (!register)
      return (
        <RegistrationView
          onRegistration={(register) => this.onRegistration(register)
          }
        />
      );


  //Axios to do ajax operation, to fetch the actual movies from myFlix movies API

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

OLD code

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

*/
