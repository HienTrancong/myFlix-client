import React from "react";
import axios from "axios";

import { BrowserRouter as Routes, Route, Redirect } from "react-router-dom";

import './main-view.scss'
import { Row, Col } from "react-bootstrap";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view.jsx";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavbarView } from "../navbar-view/navbar-view";


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
        <NavbarView user={user} />
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
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
            return <Col>
              <RegistrationView />
            </Col>
          }} />
          <Route path="/movies/:movieTitle" render={({ match, history }) => {
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

        </Row>
      </Routes>
    );
  }
}

/* NOTE

*/
