import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import commits from './commits';
import notifications from './notifications';
import profile from './profile';

export default combineReducers({
  commits,
  notifications,
  profile,
  routerReducer,
});
