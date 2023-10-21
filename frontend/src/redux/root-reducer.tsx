import { combineReducers } from 'redux';

import skillReducer from './skill-reducer';

const rootReducer = combineReducers({
  skill: skillReducer,
});

export default rootReducer;