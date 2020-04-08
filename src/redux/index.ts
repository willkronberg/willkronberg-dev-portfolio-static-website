import { combineReducers } from 'redux';
import { userReducer } from './modules/user';

export const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
