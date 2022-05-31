// import react to React instance
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Card } from 'react-bootstrap';

import { connect } from 'react-redux';
import { addFavoriteMovie, removeFavoriteMovie } from '../../actions/actions';

import { Link } from 'react-router-dom';

//Create and expose MovieCard, for list of movies titles
function MovieCard(props) {

  const { movie, user, favoriteMovies } = props;


  //Set default Authorization for axios requests
  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (favoriteMovies.find(m => m._id === movie._id)) {
      setIsFav(true);
    }
  })

  console.log('movie-card', movie, user, favoriteMovies, isFav);

  const addFav = (movie) => {
    axios.post(`https://hien-tran-080222.herokuapp.com/users/${user.Username}/movies/${movie._id}`)
      .then(() => {
        props.addFavoriteMovie(movie);
        setIsFav(!isFav);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const removeFav = (movie) => {
    axios.delete(`https://hien-tran-080222.herokuapp.com/users/${user.Username}/movies/${movie._id}`)
      .then(() => {
        props.removeFavoriteMovie(movie);
        setIsFav(!isFav);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Card>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${movie._id}`}>
          <Button variant="link">Open</Button>
        </Link>
        <div>
          {!isFav && <Button variant='outline-primary' onClick={() => addFav(movie)}>Add to favorites</Button>}
        </div>
        <div>
          {isFav && <Button variant='outline-danger' onClick={() => removeFav(movie)}> Remove from favorites</Button>}
        </div>
      </Card.Body>
    </Card >
  );
}

export default connect(null, { addFavoriteMovie, removeFavoriteMovie })(MovieCard);


MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired,
};



/* */
