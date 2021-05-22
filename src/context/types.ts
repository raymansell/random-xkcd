import { Comic } from '../types';

export type History = [
  {
    comic: Comic;
    rating: number;
  }
];

export type State = {
  latestXkcdNum: number | undefined;
  comic: Comic | null;
  rating: number;
  isLoading: boolean;
  error: Error | null;
  history: History;
};

export const GET_LATEST_XKCD_NUM = 'get-latest-xkcd-num';
export const MAKE_REQUEST = 'make-request';
export const GET_DATA = 'get-data';
export const UPDATE_RATING = 'update-rating';
export const ERROR = 'error';

export type Action =
  | {
      type: typeof GET_LATEST_XKCD_NUM;
      payload: { latestXkcdNum: number };
    }
  | {
      type: typeof MAKE_REQUEST;
    }
  | {
      type: typeof GET_DATA;
      payload: { comic: Comic; rating: number; history: History };
    }
  | {
      type: typeof UPDATE_RATING;
      payload: { rating: number };
    }
  | {
      type: typeof ERROR;
      payload: { error: Error };
    };

export type MyDispatch = (action: Action) => void;
