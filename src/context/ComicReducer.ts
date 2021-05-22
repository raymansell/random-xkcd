import {
  State,
  Action,
  GET_LATEST_XKCD_NUM,
  MAKE_REQUEST,
  GET_DATA,
  ERROR,
  UPDATE_RATING,
} from './types';

const comicReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case GET_LATEST_XKCD_NUM: {
      return { ...state, latestXkcdNum: action.payload.latestXkcdNum };
    }
    case MAKE_REQUEST: {
      return { ...state, comic: null, isLoading: true, error: null };
    }
    case GET_DATA: {
      return {
        ...state,
        isLoading: false,
        comic: action.payload.comic,
        rating: action.payload.rating,
        history: action.payload.history,
      };
    }
    case UPDATE_RATING: {
      return {
        ...state,
        rating: action.payload.rating,
      };
    }
    case ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        comic: null,
      };
    }
    default:
      return state;
  }
};

export default comicReducer;
