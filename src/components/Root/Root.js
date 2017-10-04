import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Status404 from '../StatusPages/Status404';
import App from '../App';

export default class Root extends Component {
  render() {
    return (
      <Switch>
        <Route component={ App } exact  path="/" />
        <Route component={ Status404 } />
      </Switch>
    );
  }
}
