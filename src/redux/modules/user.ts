import { typedAction } from './typedAction';

type UserState = {
  username: string | null;
};

const initialState: UserState = { username: null };

export const login = (username: string) => typedAction('user/LOGIN', username);
export const logout = () => typedAction('user/LOGOUT');

type UserAction = ReturnType<typeof login | typeof logout>;

export function userReducer(state = initialState, action: UserAction): UserState {
  switch (action.type) {
    case 'user/LOGIN':
      return { username: action.payload };
    case 'user/LOGOUT':
      return { username: null };
    default:
      return state;
  }
}
