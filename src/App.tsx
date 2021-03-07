import * as React from "react";
//import logo from './logo.svg';
import { Switch, Route } from "react-router-dom";
// import { NotFound } from './PageNotFound/NotFound'
import Store from "./Store/Store";
import './App.css';
import { HomePage } from "./Pages/HomePage";

function App() {
  return (
    <Store>
      {/* <Switch> */}
        {/* <Route exact={true} path="/" component={HomePage} /> */}
        {/* <NotFound default /> */}
        < HomePage />
      {/* </Switch> */}
    </Store>
  );
}

export default App;
