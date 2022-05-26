export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(type: T, payload: P): { type: T; payload: P };

export function typedAction(type: string, payload?: any) {
  return { type, payload };
}

export type PreferencesState = {
  isDarkModeEnabled: boolean;
};

const initialState: PreferencesState = { isDarkModeEnabled: false };

export const toggleDarkMode = () => typedAction('preferences/TOGGLE_DARK_MODE');

export type PreferecesAction = ReturnType<typeof toggleDarkMode>;

export function preferencesReducer(state = initialState, action: PreferecesAction): PreferencesState {
  switch (action.type) {
    case 'preferences/TOGGLE_DARK_MODE':
      return { isDarkModeEnabled: !state.isDarkModeEnabled };
    default:
      return state;
  }
}
