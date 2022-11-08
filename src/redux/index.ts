import { combineReducers } from 'redux';
import { userReducer } from './modules/user';
import { preferencesReducer } from './modules/preferences';
import { fetchDiscogsInventoryReducer } from './modules/inventory';
import { fetchArticlesReducer } from './modules/articles';

export const rootReducer = combineReducers({
  user: userReducer,
  preferences: preferencesReducer,
  inventory: fetchDiscogsInventoryReducer,
  articles: fetchArticlesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
