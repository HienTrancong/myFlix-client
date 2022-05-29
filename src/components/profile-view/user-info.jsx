import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export function UserInfo(props) {
  const { user } = props;
  console.log(user);
  return (
    <Row>
      <Col>
        <Card>
          <Card.Title>User Profile</Card.Title>
          <Card.Body>
            <p>Username: {user.Username}</p>
            <p>Email: {user.Email}</p>
            <p>Birthday: {user.Birthday}</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
