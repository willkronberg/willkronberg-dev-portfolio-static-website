import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { typedAction } from './typedAction';
import { getInventory, Release } from '../../services/discogs';

interface RestServiceError {
  isError: boolean;
  message: string;
}

export type DiscogsState = {
  isLoading: boolean;
  data: Release[];
  error: RestServiceError;
};

const initialState: DiscogsState = {
  isLoading: false,
  data: [],
  error: {
    isError: false,
    message: '',
  },
};

export const fetchDiscogsInventoryLoading = () => typedAction('discogs/FETCH_INVENTORY_LOADING');
export const fetchDiscogsInventorySuccess = (data: Release[]) => typedAction('discogs/FETCH_INVENTORY_SUCCESS', data);
export const fetchDiscogsInventoryError = (error: Error) => typedAction('discogs/FETCH_INVENTORY_ERROR', error);

export type DiscogsAction =
  | ReturnType<typeof fetchDiscogsInventoryLoading>
  | ReturnType<typeof fetchDiscogsInventorySuccess>
  | ReturnType<typeof fetchDiscogsInventoryError>;

export const fetchDiscogsInventoryReducer = (state = initialState, action: DiscogsAction): DiscogsState => {
  switch (action.type) {
    case 'discogs/FETCH_INVENTORY_LOADING':
      return {
        ...state,
        isLoading: true,
        error: { isError: false, message: '' },
      };
    case 'discogs/FETCH_INVENTORY_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: { isError: false, message: '' },
      };
    case 'discogs/FETCH_INVENTORY_ERROR':
      return {
        ...state,
        isLoading: false,
        error: { isError: true, message: action.payload.message },
      };
    default:
      return state;
  }
};

export const fetchDiscogsInventory = (): ((dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(fetchDiscogsInventoryLoading());

      const results = await getInventory();
      dispatch(fetchDiscogsInventorySuccess(results));
    } catch (ex: unknown) {
      dispatch(fetchDiscogsInventoryError(ex as Error));
      throw ex;
    }
  };
};
