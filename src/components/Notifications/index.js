import { connect } from 'react-redux';
import { notificationsRemoveNotification } from '../../store/notifications';
import Notifications from './Notifications';

const mapStateToProps = ({ notifications }) => ({
  notifications: notifications,
});

const mapDispatchToProps = {
  onNotificationRemoval: notificationsRemoveNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
