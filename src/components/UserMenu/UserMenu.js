import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  DropdownMenu,
  DropdownMenuItem,
  UserMenu as UserMenuAxiom,
} from 'bw-axiom';

export default class UserMenu extends Component {

  static propTypes = {
    email: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    onChangePasswordClick: PropTypes.func.isRequired,
  };

  static contextTypes = {
    brandwatchAuthLogout: PropTypes.func.isRequired,
  };

  render() {
    const {
      email,
      name,
      imageUrl,
      onChangePasswordClick,
    } = this.props;
    const { brandwatchAuthLogout } = this.context;

    if (!email) return null;

    return (
      <UserMenuAxiom
          email={ email }
          firstName={ name }
          imageSrc={ imageUrl }
          lastName=""
          onLogout={ () => brandwatchAuthLogout() }>
        <DropdownMenu>
          <DropdownMenuItem
              data-tid="change-password-menu-option"
              onClick={ () => onChangePasswordClick() }>
            Change password
          </DropdownMenuItem>
        </DropdownMenu>
      </UserMenuAxiom>
    );
  }
}
