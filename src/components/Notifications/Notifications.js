import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Notifications as AxiomNotifications,
  Notification as AxiomNotification,
} from 'bw-axiom';

export default class Notifications extends Component {
  static propTypes = {
    notifications: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      duration: PropTypes.number,
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
    })).isRequired,
    onNotificationRemoval: PropTypes.func.isRequired,
  };

  render() {
    const { notifications, onNotificationRemoval } = this.props;

    return (
      <AxiomNotifications>
        { notifications.map(({ duration, id, message, type }) =>
          <AxiomNotification
              key={ id }
              onAppear={ (duration > 0
                ? () => setTimeout(() => onNotificationRemoval(id), duration)
                : undefined) }
              onRemoveClick={ () => onNotificationRemoval(id) }
              type={ type }>
            { message }
          </AxiomNotification>
        ) }
      </AxiomNotifications>
    );
  }
}

