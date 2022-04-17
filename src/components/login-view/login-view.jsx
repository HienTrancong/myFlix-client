import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardGroup, Button, Form } from 'react-bootstrap';

//Export function component
export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //Declare hooks for inputs and pass empty string as argument
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  //Validate user inputs
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
    else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    //Prevent default form submitting
    e.preventDefault();
    //Assign validate function to variable isReq
    let isReq = validate();
    //Condition to check isReq
    if (isReq) {
      //Send a POST request to the server login end point by passing username and password for authentication
      axios
        .post("https://hien-tran-080222.herokuapp.com/login", {
          Username: username,
          Password: password
        })
        //If there’s a match, the onLoggedIn method that was passed through the props is called
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
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
                <Card.Title>Login</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                    {/*Display validation error*/}
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                    {/*Display validation error*/}
                    {passwordErr && <p>{passwordErr}</p>}
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

// LoginView.propTypes = {
//   user: propTypes.shape({
//     username: PropTypes.string.isRequired
//   })
// }


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