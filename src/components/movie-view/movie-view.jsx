import React from 'react';

import { CardGroup, Card, Button, Container, CardImg, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';

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
                  <Card.Text className="movie-description value">{movie.Description}</Card.Text>
                </Card.Body>
                <Card.Body>
                  <ListGroup>
                    <ListGroupItem className="movie-genre">{movie.Genre.Name}</ListGroupItem>
                    <ListGroupItem className="movie-director">{movie.Director.Name}</ListGroupItem>
                  </ListGroup>
                  <Button variant="Primary" onClick={() => { onBackClick(null); }}>
                    Back
                  </Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
/* NOTE

    //   <div className="movie-view">
    //     <div className="movie-poster">
    //       <img src={movie.ImagePath} />
    //     </div>
    //     <div className="movie-title">
    //       <span className="label">Title: </span>
    //       <span className="value">{movie.Title}</span>
    //     </div>
    //     <div className="movie-genre">
    //       <span className="label">Genre: </span>
    //       <span className="value">{movie.Genre.Name}</span>
    //     </div>
    //     <div className="movie-description">
    //       <span className="label">Description: </span>
    //       <span className="value">{movie.Description}</span>
    //     </div>
    //     <div className="movie-director">
    //       <span className="label">Director: </span>
    //       <span className="value">{movie.Director.Name}</span>
    //     </div>
    //     <button onClick={() => {onBackClick(null); }}>Back</button>
    //   </div>
    // );
  }


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