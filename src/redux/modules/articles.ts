import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { typedAction } from './typedAction';
import { getArticles } from '../../services/articles';

export const fetchArticlesLoading = () => typedAction('articles/FETCH_ARTICLES_LOADING');
export const fetchArticlesSuccess = (data: Record<string, any>[]) => typedAction('articles/FETCH_ARTICLES_SUCCESS', data);
export const fetchArticlesError = (error: Error) => typedAction('articles/FETCH_ARTICLES_ERROR', error);

export type ArticlesAction = ReturnType<typeof fetchArticlesLoading> | ReturnType<typeof fetchArticlesSuccess> | ReturnType<typeof fetchArticlesError>;

interface RestServiceError {
  isError: boolean;
  message: string;
}

export type ArticlesState = {
  isLoading: boolean;
  data: Record<string, any>[];
  error: RestServiceError;
};

const initialState: ArticlesState = {
  isLoading: false,
  data: [],
  error: {
    isError: false,
    message: '',
  },
};

export const fetchArticlesReducer = (state = initialState, action: ArticlesAction): ArticlesState => {
  switch (action.type) {
    case 'articles/FETCH_ARTICLES_LOADING':
      return {
        ...state,
        isLoading: true,
        data: [],
        error: { isError: false, message: '' },
      };
    case 'articles/FETCH_ARTICLES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: { isError: false, message: '' },
      };
    case 'articles/FETCH_ARTICLES_ERROR':
      return {
        ...state,
        isLoading: false,
        error: { isError: true, message: action.payload.message },
      };
    default:
      return state;
  }
};

export const fetchArticles = (): ((dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(fetchArticlesLoading());

      const results = await getArticles();

      dispatch(fetchArticlesSuccess(results));
    } catch (ex: unknown) {
      console.error(ex);
      dispatch(fetchArticlesError(ex as Error));
    }
  };
};
