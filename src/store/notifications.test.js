import reducer, {
  notificationsAddNotification,
  notificationsRemoveNotification,
} from './notifications';

export const notification = {
  duration: 5000,
  message: 'Uh oh',
  type: 'error',
};

describe('notifications', () => {
  test('adding a notification', () => {
    expect(reducer([], notificationsAddNotification(notification)).length)
      .toBe(1);
  });

  test('removing a notification', () => {
    const state = reducer([], notificationsAddNotification(notification));
    const id = state[0].id;
    expect(reducer(state, notificationsRemoveNotification(id)).length)
      .toBe(0);
  });
});
