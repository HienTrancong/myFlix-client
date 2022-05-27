import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';
import MainView from './components/main-view/main-view';

import './index.scss';

// Declare store with reducer as argument
const myFlixStore = createStore(moviesApp, devToolsEnhancer());

//Create class component 'MyFlixApplication' which is main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={myFlixStore}>
        <Container>
          <MainView />
        </Container>
      </Provider >
    );
  }
}

//DOM finds the root of the app and assign to constant container
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render app in the root DOM element, display MyFlicApplication component in the 'root' element
ReactDOM.render(React.createElement(MyFlixApplication), container);

/* 

*/
