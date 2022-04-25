import React from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';


export function UpdateUser({ handleUpdate, handleSubmit }) {
  // Return a registration form where user can update username, password, email and bday
  // Listening to changes on input and update states
  return (
    <Container>
      <Row>
        <Col>
          <Form className="mb-3">
            <h4>Update profile information</h4>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" placeholder="Enter new username" onChange={e => handleUpdate(e)} />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" name="Password" onChange={e => handleUpdate(e)} />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" name="Email" onChange={e => handleUpdate(e)} />
            </Form.Group>
            <Form.Group controlId="formBirthday" className="mb-3">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control type="date" name="Birthday" onChange={e => handleUpdate(e)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
