// import react to React instance
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

//Create and expose MovieCard, for list of movies titles
export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} crossOrigin="true" />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

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

//proptypes is property make sure that components use correct data type and pass the right data
//object contains special values on how moviecard props should look
//props object must include a movie object, shape({...}) means that it's an object
//movie prop (object) may contain a Title key, if it does, must be String
//props object must contain onMovieClick and must be a function

/* NOTE
this.props refer to class component MovieCard
ES6 object destruction, short form of const movie=this.props.movie, destructuring props movie and onMovieClick objects from MovieCard passed by MainView
onClick is special attribute, which accepts function, a call back function once the element is clicked
onClick={() => { onMovieClick(movie); } is event listener, listen when user click on movie.Title, pass argument "movie" to onMovieClick

variant="top"

// onMovieClick: PropTypes.func.isRequired


*/