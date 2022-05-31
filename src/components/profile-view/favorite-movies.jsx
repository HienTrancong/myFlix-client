import React from 'react';

import { Row, Col, Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MovieCard from '../movie-card/movie-card';

export function FavoriteMovies(props) {

  const { user, favoriteMovies } = props;
  console.log(user);

  return (
    <>
      <Row>
        <Col>
          <h4>Favorite movies</h4>
          {
            favoriteMovies.map(movie => {
              return (
                <Col xs={12} sm={4} className="d-flex" key={movie._id}>
                  <MovieCard movie={movie} user={user} favoriteMovies={favoriteMovies} />
                </Col>
              )
            })
          }
        </Col>
      </Row>
    </>
  )
}

/*

*/

