import React from "react";
import axios from "axios";

import { BrowserRouter as Routes, Route, Redirect } from "react-router-dom";

import './main-view.scss'
import { Row, Col, Container } from "react-bootstrap";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view.jsx";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavbarView } from "../navbar-view/navbar-view";
import { ProfileView } from "../profile-view/profile-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";


export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken)
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

  getMovies(token) {
    axios.get('https://hien-tran-080222.herokuapp.com/movies', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Routes>
        <NavbarView user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              if (!user)
                return <Col>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return movies.map(m => (
                <Col md={3} key={m._id}>
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
            <Route path="/movies/:movieId" render={({ match, history }) => {
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            <Route path={`/users/${user}`} render={({ history }) => {
              if (!user) return <Redirect to="/" />
              return (
                <Col>
                  <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} />
                </Col>
              )
            }} />
            <Route path={"/director/:directorName"} render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.directorName).Director} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            <Route path={"/genre/:genreName"} render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.genreName).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }} />

          </Row>
        </Container>
      </Routes>
    );
  }
}

/* NOTE

*/
