import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './FlexText.css';

export default class FlexText extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <span { ...rest } className="bw-flex-text__container">
        <span className="bw-flex-text">
          { children }
        </span>
      </span>
    );
  }
}
