//Import defaut export of 'react' module to 'React' constant
import React from "react";

//Import Reat virtual DOM
import ReactDOM from "react-dom";

//Import Container (grid system) from react bootstrap
import Container from "react-bootstrap/Container";

//Import MainView from main-view.jsx, curly bracket when not default
import { MainView } from "./components/main-view/main-view";

//import statement to indicate need to bundle `./index.scss`
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
