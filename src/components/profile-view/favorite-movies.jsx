import React from 'react';

import { Row, Col, Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function FavoriteMovies(props) {

  const { user } = props;
  console.log(user);

  return (
    <>
      <Row xs={12}>
        <Col>
          <h4>Favorite movies of {user.Username}</h4>
        </Col>
      </Row>

    </>
  )
}

/*
      {
        favoriteMovieList.map(movie => {
          return (
            <Col xs={12} sm={4} className="d-flex" key={movie._id}>
              <Card text="dark" border="dark" className="mb-3">
                <Card.Img variant="top" src={movie.ImagePath} className="img-responsive" />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>

                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">More Info</Button>
                  </Link>

                  <Button variant="outline-danger" onClick={() => removeFavorite(movie._id)}>
                    Remove from Favorites
                  </Button>

                </Card.Body>
              </Card>
            </Col>
          )
        })
      }
*/

