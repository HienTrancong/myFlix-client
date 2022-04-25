import React from 'react';
import { Row, Col, CardGroup, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

export function DirectorView(props) {
  const { director, onBackClick } = props;
  return (
    <Row>
      <Col>
        <CardGroup>
          <Card>
            <Card.Title className="dorector-name value">{director.Name}</Card.Title>
          </Card>
          <ListGroup>
            <ListGroupItem className="director-bio">Bio: {director.Bio} </ListGroupItem>
          </ListGroup>
          <ListGroup>
            <ListGroupItem className="director-birthday">Birthday: {director.Birth} </ListGroupItem>
          </ListGroup>
        </CardGroup>
        <Button variant="primary" onClick={() => { onBackClick(); }}>
          Back
        </Button>
      </Col>
    </Row>
  )
}
