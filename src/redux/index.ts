import { combineReducers } from 'redux';
import { userReducer } from './modules/user';
import { preferencesReducer } from './modules/preferences';
import { fetchDiscogsInventoryReducer } from './modules/inventory';

export const rootReducer = combineReducers({
  user: userReducer,
  preferences: preferencesReducer,
  inventory: fetchDiscogsInventoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
