import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Canvas,
  Dock,
  DockFooter,
  DockHeader,
  DockIconLink,
  DockItem,
  Platform,
} from 'bw-axiom';
import './App.css';
import Notifications from '../Notifications';
import UserMenu from '../UserMenu';
import ChangePassword from '../ChangePassword';

export default class App extends Component {

  static propTypes = {
    onProfileReceived: PropTypes.func.isRequired,
  }

  static contextTypes = {
    brandwatchAuthGetProfile: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { onProfileReceived } = this.props;
    const { brandwatchAuthGetProfile } = this.context;
    brandwatchAuthGetProfile().then(onProfileReceived);
  }

  render() {
    return (
      <Platform>
        <Notifications />
        <Dock>
          <DockHeader>
            <DockIconLink
                active={ true }
                data-tid="search"
                icon="deck"
                title="Search" />
          </DockHeader>
          <DockFooter>
            <DockItem>
              <UserMenu />
            </DockItem>
          </DockFooter>
        </Dock>
        <Canvas>
          <div className="bw-layout-container">
          </div>
        </Canvas>

        <ChangePassword />
      </Platform>
    );
  }
}
