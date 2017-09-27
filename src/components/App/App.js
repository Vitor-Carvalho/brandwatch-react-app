import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import {
  Base,
  Grid,
  GridCell,
  Heading,
  LogoHorizontal,
  ProgressInfinite,
  Strong,
} from 'bw-axiom';
import './App.css';
import atIds from '../../../at_ids';
import AppBody from './AppBody';
import AppHeader from './AppHeader';
import ChangePassword from '../ChangePassword';
import Notifications from '../Notifications';
import Products from '../Products';
import UserMenu from '../UserMenu';

export class App extends Component {
  static propTypes = {
    name: PropTypes.string,
    t: PropTypes.func.isRequired,
    onInitializeFeatures: PropTypes.func.isRequired,
    onProfileReceived: PropTypes.func.isRequired,
  };

  static contextTypes = {
    brandwatchAuthGetProfile: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { onInitializeFeatures, onProfileReceived } = this.props;
    const { brandwatchAuthGetProfile } = this.context;
    brandwatchAuthGetProfile().then((profile) => {
      onProfileReceived(profile);

      if (process.env.LAUNCH_DARKLY_CLIENT_ID) {
        onInitializeFeatures(profile.sub);
      }
    });
  }

  render() {
    const { name, t } = this.props;

    return (
      <Base className="bw-app" data-ra-at={ atIds.App.root }>
        <ChangePassword />
        <Notifications />
        <AppHeader>
          <Grid responsive={ false } verticalAlign="middle">
            <GridCell>
              <LogoHorizontal width="12rem" />
            </GridCell>

            <GridCell shrink>
              <UserMenu />
            </GridCell>
          </Grid>
        </AppHeader>

        { name ? (
          <AppBody>
            <Base>
              <Heading textSize="display1" textUnderline>
                <Strong>{ t('hi-name', { name }) }</Strong>
              </Heading>
              <Products />
            </Base>
          </AppBody>
        ) : (
          <AppBody>
            <ProgressInfinite size="large" />
          </AppBody>
        ) }
      </Base>
    );
  }
}

export default translate()(App);
