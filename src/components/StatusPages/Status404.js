import React, { Component } from 'react';
import { Status404 as Status404Axiom } from 'bw-axiom';

export default class Status404 extends Component {
  render() {
    return (
      <Status404Axiom
          contactUsLocation="https://support.brandwatch.com/hc"
          homeLocation="/"
          theme="light" />
    );
  }
}
