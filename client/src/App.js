import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import List from "./components/List";
import Edit from "./components/Edit";
import Create from "./components/Create";


class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" exact component={Create} />
            <Route path="/list" component={List} />
            <Route path="/edit/:id" component={Edit} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
