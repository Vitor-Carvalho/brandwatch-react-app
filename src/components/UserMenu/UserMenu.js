import PropTypes from 'prop-types';
import atIds from '../../../at_ids';
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
    firstName: PropTypes.string,
    imageUrl: PropTypes.string,
    lastName: PropTypes.string,
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
      firstName,
      lastName,
      imageUrl,
      onChangePasswordClick,
      showAccountAdministration,
    } = this.props;
    const { brandwatchAuthLogout, t } = this.context;

    if (!email) return null;

    return (
      <UserMenuAxiom
          email={ email }
          firstName={ firstName }
          imageSrc={ imageUrl }
          lastName={ lastName }
          onLogout={ () => brandwatchAuthLogout() }>
        <DropdownMenu>
          { showAccountAdministration && (
            <DropdownMenuItem
                data-ra-at={ atIds.UserMenu.accountAdmin }
                data-ra-ut="account-administration-menu-option">
              <Grid gutters="tiny" responsive={ false } shrink verticalAlign="middle">
                <GridCell>{ t('account-administration') }</GridCell>
                <GridCell><Icon name="open" /></GridCell>
              </Grid>
            </DropdownMenuItem>
          ) }

          <DropdownMenuItem
              data-ra-at={ atIds.UserMenu.changePassword }
              data-ra-ut="change-password-menu-option"
              onClick={ () => onChangePasswordClick() }>
            { t('change-password-user-menu-item') }
          </DropdownMenuItem>
        </DropdownMenu>
      </UserMenuAxiom>
    );
  }
}
