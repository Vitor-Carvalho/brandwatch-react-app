import { v4 } from 'uuid';
import { createAction, handleActions } from 'redux-actions';

export const NOTIFICATIONS_ADD_NOTIFICATION = 'notification added';
export const NOTIFICATIONS_REMOVE_NOTIFICATION = 'notification removed';

const DEFAULT_NOTIFICATION_DURATION = 5000;
const initialState = [];

export const notificationsAddNotification = createAction(
  NOTIFICATIONS_ADD_NOTIFICATION,
  ({ duration, message, type }) => ({
    duration: duration || DEFAULT_NOTIFICATION_DURATION,
    id: v4(),
    message,
    type,
  })
);

export const notificationsRemoveNotification = createAction(
  NOTIFICATIONS_REMOVE_NOTIFICATION,
  (id) => ({ id })
);

export default handleActions({
  [NOTIFICATIONS_ADD_NOTIFICATION]: (state, { payload }) =>
    [payload].concat(state),
  [NOTIFICATIONS_REMOVE_NOTIFICATION]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload.id),
}, initialState);
