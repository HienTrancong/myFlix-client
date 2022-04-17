import React from 'react';

import { CardGroup, Card, Button, Container, CardImg, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <CardGroup>
              <Card>
                <CardImg className="movie-view movie-poster" src={movie.ImagePath} />
                <Card.Body>
                  <Card.Title className="movie-title value">{movie.Title}</Card.Title>
                  <ListGroup>
                    <ListGroupItem className="movie-description value">Description: {movie.Description}</ListGroupItem>
                    <ListGroupItem className="movie-genre">Genre: {movie.Genre.Name}</ListGroupItem>
                    <ListGroupItem className="movie-director">Director: {movie.Director.Name}</ListGroupItem>
                  </ListGroup>
                  <Link to={`/director/${movie.Director.Name}`}>
                    <Button variant="link">Director</Button>
                  </Link>
                  <Link to={`/genre/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                  </Link>
                  <Button variant="primary" onClick={() => { onBackClick(null); }}>
                    Back
                  </Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container >
    );
  }
}
/* NOTE
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
 


keypressCallback(event) {
  console.log(event.key);
}

componentDidMount() {
  document.addEventListener('keypress', this.keypressCallback);
}

componentWillUnmount() {
  document.removeEventListener('keypress', this.keypressCallback);
}
*/