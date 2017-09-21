import React, { Component } from 'react';
import { Base } from 'bw-axiom';

export default class AppHeader extends Component {
  render() {
    return (
      <Base { ...this.props }
          className="bw-app__header"
          sticky="0"/>
    );
  }
}
