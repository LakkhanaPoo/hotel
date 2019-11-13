import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from "./Search";
import SearchResults from "./SearchResults";
import Detail from "./Detail";

class App extends React.Component {
  render() {
    return (
      <div className="img-background">
        <div className="App">
          <div className="content">
            <h1>HOTELS SEARCH</h1>
            <Router>
              <Route path="/" component={Search} />
              <Route exact path="/search/:query" component={SearchResults} />
              <Route exact path="/detail/:id" component={Detail} />
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
