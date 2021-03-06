import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { UserMenu as UserMenuAxiom } from 'bw-axiom';
import UserMenu from './UserMenu';
import unitTestSelector from '../../utils/unitTestSelector';

const render = (props, opts = {}) => shallow(<UserMenu { ...props } />, opts);

describe('UserMenu', () => {
  let props;
  let opts;

  beforeEach(() => {
    props = {
      email: 'a@b.co',
      imageUrl: 'http://a.png',
      firstName: 'Ace',
      lastName: 'Spades',
      onChangePasswordClick: sinon.stub(),
      showAccountAdministration: false,
    };
    opts = {
      lifecycleExperimental: true,
      context: {
        brandwatchAuthLogout: sinon.stub(),
        t: () => { return 'translated-text'; },
      },
    };
  });

  describe('UserMenu', () => {
    it('renders nothing if there is no email property', () => {
      props.email = null;
      expect(render(props, opts).get(0)).toBeFalsy();
    });

    it('calls the brandwatchAuthLogout context property when the user logs out', () => {
      render(props, opts).find(UserMenuAxiom).prop('onLogout')();
      expect(opts.context.brandwatchAuthLogout.calledOnce).toBeTruthy();
    });

    it('calls the onChangePasswordClick property when the user clicks change password', () => {
      render(props, opts).find(unitTestSelector('change-password-menu-option')).simulate('click');
      expect(props.onChangePasswordClick.calledOnce).toBeTruthy();
    });

    it('shows an account administration menu item', () => {
      props.showAccountAdministration = true;
      expect(render(props, opts)
        .find(unitTestSelector('account-administration-menu-option'))
        .length).toBe(1);
    });
  });
});
