//import defaut export of 'react' module to 'React' constant, and import React virtual DOM
import React from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";

//import MainView from main-view.jsx, curly bracket when not default
import { MainView } from "./components/main-view/main-view";

//import statement to indicate need to bundle `./index.scss`
import "./index.scss";

//Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  //create class component 'MyFlixApplication'
  render() {
    //render method to return HTML div element
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

// DOM finds the root of the app and assign to constant container
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render app in the root DOM element, display MyFlicApplication component in the 'root' element
ReactDOM.render(React.createElement(MyFlixApplication), container);

/* NOTE
 */
