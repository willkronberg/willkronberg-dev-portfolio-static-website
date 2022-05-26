import { combineReducers } from 'redux';
import { userReducer } from './modules/user';
import { preferencesReducer } from './modules/preferences';

export const rootReducer = combineReducers({
  user: userReducer,
  preferences: preferencesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
