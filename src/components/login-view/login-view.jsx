import React, { useState } from 'react';
import propTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Card, CardGroup, Button, Form } from 'react-bootstrap';

//Export function component
export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    //Send a request to the server for authentication
    // then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };


  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Login</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
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

LoginView.propTypes = {
  user: propTypes.shape({
    username: PropTypes.string.isRequired
  })
}


/* NOTES

function component, accept props object arguement, then returns a React element

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

It's a function, that returns React elements

  //useState to declare a "state variable" call username, it has same capabilities with this.state provided in a class component
  //https://reactjs.org/docs/hooks-state.html#tip-what-do-square-brackets-mean
  //making 2 new variables: username (current value) and setUsername (a function that let us update it)
  //useState returns

user-defined element

const element = <Welcome name="Sara" />;

ReactDOM.render(
  element,
  document.getElementById('root')
);
      //prevent default behavior of button which is refresh/reload
    //onChange = function event occurs when value of element has been changed
    //e is event argument , target is the component, value is value of input component

        <form>
      <label>Username: <input type="text" value={username} onChange= { e => setUsername(e.target.value) } /></label>
      <label>Password: <input type="password" value={password} onChange= { e => setPassword(e.target.value) } /></label>
      <button type="submit" onClick={handleSubmit}>Submit</button> <br /> <br />
      <button type="submit">Register</button>
    </form>

*/