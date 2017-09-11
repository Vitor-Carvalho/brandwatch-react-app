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
import CommitHistory from '../CommitHistory';
import Notifications from '../Notifications';
import UserMenu from '../UserMenu';

export default class App extends Component {

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
            <CommitHistory />
          </div>
        </Canvas>
      </Platform>
    );
  }
}
