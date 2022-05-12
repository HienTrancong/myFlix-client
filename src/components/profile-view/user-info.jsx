import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export function UserInfo(props) {
  const userdata = props.userdata
  return (
    <Row>
      <Col>
        <Card>
          <Card.Title>Profle</Card.Title>
          <Card.Body>
            <p>Username: {userdata.Username}</p>
            <p>Email: {userdata.Email}</p>
            <p>Birthday: {userdata.Birthday}</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
