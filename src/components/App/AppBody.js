import React, { Component } from 'react';

export default class AppBody extends Component {
  render() {
    return (
      <div { ...this.props } className="bw-app__body" />
    );
  }
}
