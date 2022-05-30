import React, { useState } from "react";
import "./registration-view.scss";

import { Form, Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";
import axios from "axios";

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  //Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  //Validate user's input
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username is required');
      isReq = false;
    }
    else if (username.length < 2) {
      setUsernameErr('Username must be at least 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password is required');
      isReq = false;
    }
    else if (password.length < 5) {
      setPasswordErr('Password must be at least 5 characters long');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email is required');
      isReq = false;
    }
    else if (email.indexOf('@') === -1) {
      setEmailErr('Not valid email');
      isReq = false;
    }

    return isReq;
  }



  const handleSubmit = (e) => {
    //Prevent default form submitting
    e.preventDefault();
    //Assign validate function to variable isReq
    let isReq = validate();
    //Condition to check isReq trueness
    if (isReq) {
      //Send post request with an object
      axios.post("https://hien-tran-080222.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, please login!');
          window.open('/', '_self');
        })
        .catch(response => {
          console.error(response);
          alert('Unable to register');
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please register</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter a username"
                      required
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your password must be 8 or more characters"
                      minLength="8"
                      required
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                    {emailErr && <p>{emailErr}</p>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      placeholder="Enter your day of birth"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}


/* NOTE
https://www.w3schools.com/jsref/met_win_open.asp

          //if the backend validation is succcessful, data will be loggedin and users redirected to main view
          //where they can login and see the list of movies
          //Open window replaces current tab

*/
