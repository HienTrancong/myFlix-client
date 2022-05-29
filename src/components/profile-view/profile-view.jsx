import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies'
import { UpdateUser } from './update-user';

import './profile-view.scss';
import { Button, Container, Row, Col, Nav } from 'react-bootstrap';


export function ProfileView(props) {

  const { user, onBackClick } = props;

  // const [userdata, setUserdata] = useState({ user }); //no need because already have props user
  const [updatedUser, setUpdatedUser] = useState({});
  // const [favoriteMovieList, setFavoriteMovieList] = useState([]); //no need because will pass favorite

  //Set default Authorization for axios requests
  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  //Function to get the user data from server, assign to userdata variable
  //no need because already have user data pass as props
  // const getUserData = (cancelToken, Username) => {
  //   axios.get(`https://hien-tran-080222.herokuapp.com/users/${Username}`, {
  //     cancelToken: cancelToken
  //   })
  //     .then(response => {
  //       setUserdata(response.data);
  //       setUpdatedUser(response.data);
  //       setFavoriteMovieList(props.movies.filter(m => response.data.FavoriteMovies.includes(m._id)));
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  //no need because already have user data pass as props
  // useEffect(() => {
  //   let source = axios.CancelToken.source();
  //   if (token !== null) {
  //     getUserData(
  //       source.token,
  //       props.user);
  //   } else {
  //     console.log('Not Authorized');
  //   }
  //   return () => {
  //     source.cancel();
  //   }
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://hien-tran-080222.herokuapp.com/users/${user.Username}`, updatedUser)
      .then(response => {
        // setUserdata(response.data);

        console.log(response.data);
        alert('Profile updated');
      })
      .catch(err => {
        console.log(err);
      });
  }

  //?
  const handleUpdate = (e) => {
    setUpdatedUser({
      ...updatedUser, [e.target.name]: e.target.value
    });
  }

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
          < FavoriteMovies user={user} />
          < UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
          <div>
            <Button variant="primary" onClick={() => { onBackClick(null); }}>
              Back to movies list
            </Button>
            <Button variant="danger" type="submit" onClick={deleteProfile}>
              Delete profile
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