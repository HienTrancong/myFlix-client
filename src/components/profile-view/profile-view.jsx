import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies'

import './profile-view.scss';
import { Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { UpdateUser } from './update-user';

export function ProfileView(props) {

  //constant to hold the userdata loaded from the server
  const [userdata, setUserdata] = useState({});
  //constant to hold the data that the user updates through the form
  const [updatedUser, setUpdatedUser] = useState({});
  //constant to hold favorite movie list from userdata
  const [favoriteMovieList, setFavoriteMovieList] = useState([]);

  //Set default Authorization for axios requests
  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  //Function to get the user data from server, assign to userdata variable
  const getUserData = (cancelToken, Username) => {
    axios.get(`https://hien-tran-080222.herokuapp.com/users/${Username}`, {
      cancelToken: cancelToken
    })
      .then(response => {
        //Assign the result to the userdata
        setUserdata(response.data);
        setUpdatedUser(response.data);
        //Set favorite movie list with values from FavoriteMovies in userdata
        setFavoriteMovieList(props.movies.filter(m => response.data.FavoriteMovies.includes(m._id)));
      })
      .catch(err => {
        console.log(err);
      });
  }
  useEffect(() => {
    let source = axios.CancelToken.source();
    if (token !== null) {
      getUserData(
        source.token,
        props.user);
    } else {
      console.log('Not Authorized');
    }
    return () => {
      source.cancel();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://mymoviesapp775.herokuapp.com/users/${userdata.Username}`, updatedUser)
      .then(response => {
        setUserdata(response.data);
        alert('Profile updated');
      })
      .catch(e => {
        console.log(e);
      });
  }

  //?
  const handleUpdate = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value
    });
  }

  //Function to allow users to deregister
  const deleteProfile = (e) => {
    axios.delete(`https://hien-tran-080222.herokuapp.com/users/${userdata.Username}`)
      .then(response => {
        alert('Your profile has been deleted');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      })
      .catch(err => {
        console.log(err);
      });
  }

  //Function allows users to remove a movie from their list of favorites
  const removeFavorite = (id) => {
    axios.delete(`https://hien-tran-080222.herokuapp.com/users/${userdata.Username}/movies/${id}`)
      .then(() => {
        //Change state of favoriteMovieList to rerender component
        setFavoriteMovieList(favoriteMovieList.filter(movie => movie._id != id));
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <Container>
      <Row>
        <Col>
          < UserInfo userdata={userdata} />
          < FavoriteMovies favoriteMovieList={favoriteMovieList} removeFavorite={removeFavorite} />
          < UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
          <div>
            <Nav.Link href="/">Back to Movies list</Nav.Link>
          </div>
          <div>
            <Button variant="danger" type="submit" onClick={deleteProfile}>
              Delete profile
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}


/*NOTE
Profile view
● Allows users to update their user info (username, password, email, date of birth)
● Allows existing users to deregister
● Displays favorite movies
● Allows users to remove a movie from their list of favorites

*/