import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import notifications from './notifications';
import profile from './profile';

export default combineReducers({
  notifications,
  profile,
  routerReducer,
});
