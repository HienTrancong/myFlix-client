import React from 'react';
import { Row, Col, CardGroup, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

export function GenreView(props) {
  const { genre, onBackClick } = props;
  return (
    <Row>
      <Col>
        <CardGroup>
          <Card>
            <Card.Title className="dorector-name value">{genre.Name}</Card.Title>
          </Card>
          <ListGroup>
            <ListGroupItem className="director-bio">{genre.Description} </ListGroupItem>
          </ListGroup>
        </CardGroup>
        <Button variant="primary" onClick={() => { onBackClick(); }}>
          Back
        </Button>
      </Col>
    </Row>
  )
}
