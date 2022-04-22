import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { UserInfo } from './user-info';
import { UpdateUser } from './update-user';
import { FavoriteMovies } from './favorite-movies';


import './profile-view.scss';
import { Button } from 'react-bootstrap';

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
        //Set favorite movie list with values from FavoriteMovies in userdata
        setFavoriteMovieList(props.movies.filter(m => response.data.FavoriteMovies.includes(m._id)));
      })
      .catch(err => {
        console.log(err);
      });
  }

  //Get the user data in useEffect hook
  useEffect(() => {
    let source = axios.CancelToken.source(); //?

    //Load user data
    if (token !== null) {
      getUserData(source.token, props.user);
    } else {
      console.log('Not authorized');
    }

    // Clean up effect ?
    return () => {
      source.cancel();
    }
  }, []);

  //Function to update userdata through API
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default submit button behaviour, i.e., don't reload the page

    //Sending request to server, if successful, update userdata
    axios.put(`https://hien-tran-080222.herokuapp.com/users/${userdata.Username}`,
      updatedUser //?
    )
      .then(response => {
        //Update userdata with new user from the server
        setUserdata(response.data);
        alert('Profile successfully updated')
      })
      .catch(err => {
        console.log(err);
      });
  }

  //Function to handle the updates in the form input fields, adding to updatedUser variable which will be passed to server in handleSubmit
  const handleUpdate = (e) => {
    setUpdatedUser({
      ...updatedUser,//?
      [e.target.name]: e.target.value//?
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
    <>
      {/*Display userdata*/}
      < UserInfo userdata={userdata} />

      {/*Form to update user data*/}
      < UpdateUser userdata={userdata} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />

      {/*Button to delete user*/}
      <div>
        <Button className="bm=3" variant="danger" type="submit" onClick={deleteProfile}>
          Delete Profile
        </Button>
      </div>

      {/*List of favorite movies*/}
      <FavoriteMovies favoriteMovieList={favoriteMovieList} removeFavorite={removeFavorite} />

      <div>
        <Button variant="outline-light" onClick={() => props.onBackClick()}>Back to full list</Button>
      </div>
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