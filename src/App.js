import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { MainPage } from "./pages/MainPage";
import { SingleStoryPage } from "./pages/SingleStoryPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/stories/:storyId" component={SingleStoryPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
