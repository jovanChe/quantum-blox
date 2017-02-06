import { combineReducers } from 'redux';
import sidebarStatus from './sidebarStatus';

const appDataReducers = combineReducers({
  sidebarStatus
});

export default appDataReducers;