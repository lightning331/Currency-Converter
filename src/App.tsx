import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import './App.css';
import { Page1 } from "./Pages/Page1";
import { Page2 } from "./Pages/Page2";
import Header from "./Pages/Header"

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Switch>
          <Route exact={true} path="/" >
            <Page1 />
          </Route>
          <Route exact={true} path="/rates">
            <Page2 />
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
