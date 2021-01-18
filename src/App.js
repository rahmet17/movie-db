import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../src/components/Header/Header";
import Favourites from "../src/pages/Favourites/Favourites";
import Home from "../src/pages/Home/Home";
import Movie from "../src/pages/Movie/Movie";
import "./App.css";

const App = () => {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/favourites" component={Favourites} exact />
            <Route path="/:movieId" component={Movie} exact />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
};

export default App;
