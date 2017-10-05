import React, { Component } from 'react';
import atIds from '../../../at_ids';
import { Status404 as Status404Axiom } from 'bw-axiom';

export default class Status404 extends Component {
  render() {
    return (
      <Status404Axiom
          contactUsLocation="https://support.brandwatch.com/hc"
          data-ra-at={ atIds.Status404.oops }
          homeLocation="/"
          theme="light" />
    );
  }
}
