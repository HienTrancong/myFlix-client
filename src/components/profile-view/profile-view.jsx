import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import UpdateUser from './update-user';

import './profile-view.scss';
import { Button, Container, Row, Col, Nav } from 'react-bootstrap';


export function ProfileView(props) {

  const { user, favoriteMovies, onBackClick } = props;

  //Set default Authorization for axios requests
  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`


  //Function to allow users to deregister
  const deleteProfile = (e) => {
    axios.delete(`https://hien-tran-080222.herokuapp.com/users/${user.Username}`)
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
  //No need because this will be done in favorit movies view
  // const removeFavorite = (id) => {
  //   axios.delete(`https://hien-tran-080222.herokuapp.com/users/${userdata.Username}/movies/${id}`)
  //     .then(() => {
  //       //Change state of favoriteMovieList to rerender component
  //       setFavoriteMovieList(favoriteMovieList.filter(movie => movie._id != id));
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  return (
    <>
      <Row>
        <Col>
          < UserInfo user={user} />

          <div>
            <Button variant="danger" type="submit" onClick={deleteProfile}>
              Deregister
            </Button>
          </div>

          < FavoriteMovies user={user} favoriteMovies={favoriteMovies} />
          < UpdateUser user={user} />

          <div>
            <Button variant="primary" onClick={() => { onBackClick(null); }}>
              Back to movies list
            </Button>
          </div>

        </Col>
      </Row>
    </>
  );
}


/*NOTE
Profile view
● Allows users to update their user info (username, password, email, date of birth)
● Allows existing users to deregister
● Displays favorite movies
● Allows users to remove a movie from their list of favorites

*/