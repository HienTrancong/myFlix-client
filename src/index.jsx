import React from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";
import { MainView } from "./components/main-view/main-view";

import "./index.scss";

//Create class component 'MyFlixApplication' which is main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

//DOM finds the root of the app and assign to constant container
const container = document.getElementsByClassName("app-container")[0];

//Tells React to render app in the root DOM element, display MyFlicApplication component in the 'root' element
ReactDOM.render(React.createElement(MyFlixApplication), container);

/* NOTE

*/
