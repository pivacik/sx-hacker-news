import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { NewsList } from "./components/NewsList";
import { SingleStoryPage } from "./components/SingleStoryPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={NewsList} />
        <Route exact path="/stories/:storyId" component={SingleStoryPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
