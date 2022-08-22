import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { setMovies, setUser, setFavoriteMovies } from '../../actions/actions'; //#import setUser action

import { BrowserRouter as Routes, Route, Redirect } from 'react-router-dom';

import './main-view.scss'
import { Row, Col, Container } from 'react-bootstrap';

import { NavbarView } from '../navbar-view/navbar-view';
import { LoginView } from '../login-view/login-view.jsx';
import MovieList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';


class MainView extends React.Component {
  constructor() {
    super();
  }


  getUser(token, username) {
    axios.get(`https://hien-tran-080222.herokuapp.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        this.props.setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getMovies(token) {
    axios.get('https://hien-tran-080222.herokuapp.com/movies', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let username = localStorage.getItem('user');
    console.log('componentDidMount() is running');

    if (accessToken !== null && username !== null) {

      this.getMovies(accessToken);
      this.getUser(accessToken, username);
      this.props.setFavoriteMovies(
        this.props.movies.filter(movie => this.props.user.FavoriteMovies.includes(movie._id)));
    }
  }

  //When user sucessfully logs in, this function updates 'user' property to that user
  onLoggedIn(authData) {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(accessToken);
    this.getUser(accessToken, username);
    this.props.setFavoriteMovies(
      this.props.movies.filter(movie => this.props.user.FavoriteMovies.includes(movie._id)));

  }

  //When user logs out, token and user are removed from localStorage, 'user' state set to null
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  render() {
    let { movies, user, favoriteMovies } = this.props;
    console.log('mainview', movies, user, favoriteMovies);

    return (
      <Routes>
        <NavbarView user={user} />
        <Container>
          <Row className='main-view justify-content-md-center'>

            <Route exact path='/' render={() => {
              //If no user -> LoginView, otherwise -> MovieList
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                )
              //If movie list is empty (while movies load from API) -> empty page
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <MovieList movies={movies} user={user} favoriteMovies={favoriteMovies} />
              )
            }} />

            <Route path='/register' render={() => {
              if (user) return <Redirect to='/' />
              return (
                <Col>
                  <RegistrationView />
                </Col>
              )
            }} />

            <Route path='/movies/:movieId' render={({ match, history }) => {
              return (
                <Col md={8}>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                </Col>
              )
            }} />

            <Route path={`/users/${user.Username}`} render={({ history }) => {
              if (!user) return <Redirect to='/' />
              return (
                <Col>
                  <ProfileView user={user} favoriteMovies={favoriteMovies} onBackClick={() => history.goBack()} />
                </Col>
              )
            }} />

            <Route path={'/director/:directorName'} render={({ match, history }) => {
              if (!user) return <Redirect to='/' />
              if (movies.length === 0) return <div className='main-view' />;
              return (
                <Col md={8}>
                  <DirectorView director={movies.find(m => m.Director.Name === match.params.directorName).Director} onBackClick={() => history.goBack()} />
                </Col>
              )
            }} />

            <Route path={'/genre/:genreName'} render={({ match, history }) => {
              if (!user) return <Redirect to='/' />
              if (movies.length === 0) return <div className='main-view' />;
              return (
                <Col md={8}>
                  <GenreView genre={movies.find(m => m.Genre.Name === match.params.genreName).Genre} onBackClick={() => history.goBack()} />
                </Col>
              )
            }} />

          </Row>
        </Container>
      </Routes>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
    favoriteMovies: state.favoriteMovies
  }
}

export default connect(mapStateToProps, { setMovies, setUser, setFavoriteMovies })(MainView);

/* NOTE

*/
