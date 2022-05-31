import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export function UserInfo(props) {
  const { user } = props;
  console.log(user);


  const birthdayString = new Date(Date.parse(user.Birthday)).toLocaleDateString("DE-de", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replaceAll('.', '/');

  return (
    <Row>
      <Col>
        <Card>
          <Card.Title>User Profile</Card.Title>
          <Card.Body>
            <p>Username: {user.Username}</p>
            <p>Email: {user.Email}</p>
            <p>Birthday: {birthdayString}</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
