import { combineReducers } from 'redux';

import skillReducer from './skill-reducer';

export default combineReducers({
  skill: skillReducer,
});
