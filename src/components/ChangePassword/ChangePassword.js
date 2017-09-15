import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ChangePassword as ChangePasswordAxiom,
} from 'bw-axiom';

export default class ChangePassword extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
  };

  render() {
    const { isOpen, ...rest } = this.props;
    return isOpen ? <ChangePasswordAxiom { ...rest } isOpen={ isOpen } /> : null;
  }
}
