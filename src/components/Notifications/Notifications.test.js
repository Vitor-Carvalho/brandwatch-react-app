import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { Notification } from 'bw-axiom';
import Notifications from './Notifications';

function render(props) {
  return shallow(<Notifications { ...props } />);
}

jest.useFakeTimers();

describe('Notifications', () => {
  let props;

  beforeEach(() => {
    props = {
      notifications: [{
        id: '1',
        duration: 5000,
        message: 'Uh oh',
        type: 'error',
      }, {
        id: '2',
        message: 'Aw yeah',
        type: 'info',
      }],
      onNotificationRemoval: sinon.stub(),
    };
  });

  it('renders an AxiomNotification for each notification', () => {
    expect(render(props).find(Notification).length).toBe(2);
  });

  it('adds an onRemoveClick property to handle removing each notification', () => {
    const notifications = render(props);
    notifications.find(Notification).at(0).prop('onRemoveClick')();
    expect(props.onNotificationRemoval.calledWith(props.notifications[0].id));
    notifications.find(Notification).at(1).prop('onRemoveClick')();
    expect(props.onNotificationRemoval.calledWith(props.notifications[1].id));
  });

  it('adds an onAppear property to handle auto removal when a duration is given', () => {
    const notifications = render(props);
    notifications.find(Notification).at(0).prop('onAppear')();
    jest.runAllTimers();
    expect(props.onNotificationRemoval.calledWith(props.notifications[0].id));
  });

  it('does not add an onAppear property when no duration is given', () => {
    expect(render(props).find(Notification).at(1).prop('onAppear')).toBe(undefined);
  });
});
