import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  DropdownMenu,
  DropdownMenuItem,
  Grid,
  GridCell,
  Icon,
  UserMenu as UserMenuAxiom,
} from 'bw-axiom';

export default class UserMenu extends Component {

  static propTypes = {
    email: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    showAccountAdministration: PropTypes.bool.isRequired,
    onChangePasswordClick: PropTypes.func.isRequired,
  };

  static contextTypes = {
    brandwatchAuthLogout: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  render() {
    const {
      email,
      name,
      imageUrl,
      onChangePasswordClick,
      showAccountAdministration,
    } = this.props;
    const { brandwatchAuthLogout, t } = this.context;

    if (!email) return null;

    return (
      <UserMenuAxiom
          email={ email }
          firstName={ name }
          imageSrc={ imageUrl }
          lastName=""
          onLogout={ () => brandwatchAuthLogout() }>
        <DropdownMenu>
          { showAccountAdministration && (
            <DropdownMenuItem data-ra-ut="account-administration-menu-option">
              <Grid gutters="tiny" responsive={ false } shrink verticalAlign="middle">
                <GridCell>{ t('account-administration') }</GridCell>
                <GridCell><Icon name="open" /></GridCell>
              </Grid>
            </DropdownMenuItem>
          ) }

          <DropdownMenuItem
              data-ra-ut="change-password-menu-option"
              onClick={ () => onChangePasswordClick() }>
            { t('change-password-user-menu-item') }
          </DropdownMenuItem>
        </DropdownMenu>
      </UserMenuAxiom>
    );
  }
}
