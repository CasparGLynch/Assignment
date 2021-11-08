import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Route } from "react-router-dom";


import App from "./App";
import Cart from "./components/Cart/Cart";

export default class Routes extends React.Component {
  public render() {
    return (
    <Router>
        <Switch>
            
            <Route path="/cart" component={Cart}/>
            <Route path="/" component={App}/>
            
        </Switch>
    </Router>
        
    )
  }
}
