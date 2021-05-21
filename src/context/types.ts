import { Comic } from '../types';

export type State = {
  latestXkcdNum: number | undefined;
  comic: Comic | null;
  isLoading: boolean;
  error: Error | null;
};

export const GET_LATEST_XKCD_NUM = 'get-latest-xkcd-num';
export const MAKE_REQUEST = 'make-request';
export const GET_DATA = 'get-data';
export const ERROR = 'error';

export type Action =
  | {
      type: typeof MAKE_REQUEST;
    }
  | {
      type: typeof GET_DATA;
      payload: { comic: Comic };
    }
  | {
      type: typeof ERROR;
      payload: { error: Error };
    }
  | {
      type: typeof GET_LATEST_XKCD_NUM;
      payload: { latestXkcdNum: number };
    };

export type MyDispatch = (action: Action) => void;
