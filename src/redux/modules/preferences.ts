import { typedAction } from './typedAction';

export type PreferencesState = {
  isDarkModeEnabled: boolean;
};

const initialState: PreferencesState = { isDarkModeEnabled: false };

export const toggleDarkMode = () => typedAction('preferences/TOGGLE_DARK_MODE');

export type PreferencesAction = ReturnType<typeof toggleDarkMode>;

export function preferencesReducer(state = initialState, action: PreferencesAction): PreferencesState {
  switch (action.type) {
    case 'preferences/TOGGLE_DARK_MODE':
      return { isDarkModeEnabled: !state.isDarkModeEnabled };
    default:
      return state;
  }
}
