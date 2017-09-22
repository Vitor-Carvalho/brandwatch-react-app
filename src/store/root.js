import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import features from './features';
import notifications from './notifications';
import profile from './profile';

export default combineReducers({
  features,
  notifications,
  profile,
  routerReducer,
});
