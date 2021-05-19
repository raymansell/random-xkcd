import { useEffect, useReducer } from 'react';
import {
  State,
  Action,
  GET_LATEST_XKCD_NUM,
  MAKE_REQUEST,
  GET_DATA,
  ERROR,
} from './types';
import { randomComicURL, BASE_URL } from './utils';

const initialState: State = {
  latestXkcdNum: undefined,
  comic: null,
  isLoading: true,
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case GET_LATEST_XKCD_NUM: {
      return { ...state, latestXkcdNum: action.payload.latestXkcdNum };
    }
    case MAKE_REQUEST: {
      return { ...state, comic: null, isLoading: true, error: null };
    }
    case GET_DATA: {
      return { ...state, isLoading: false, comic: action.payload.comic };
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

const useFetchComic = (): State => {
  const [state, dispatch] = useReducer(reducer, initialState);

  let abortCtrl: AbortController;

  useEffect(() => {
    // Getting the number of the latest xkcd
    if (state.latestXkcdNum === undefined) {
      const setLatestXkcdNum = async () => {
        try {
          const res = await fetch(BASE_URL);
          if (res.ok) {
            const { num } = await res.json();
            dispatch({
              type: GET_LATEST_XKCD_NUM,
              payload: { latestXkcdNum: num as number },
            });
          }
          throw new Error(`Error: ${res.status}`);
        } catch (err) {
          dispatch({ type: ERROR, payload: { error: err } });
        }
      };
      setLatestXkcdNum();
    } else {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      abortCtrl = new AbortController();
      const opts = {
        signal: abortCtrl.signal,
      };

      const urlEndpoint = randomComicURL(state.latestXkcdNum);

      // Fetching a random comic between 0 and the latest xkcd num
      dispatch({ type: MAKE_REQUEST });
      fetch(urlEndpoint, opts)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(`Error: ${res.status}`); // Failed HTTP responses (4xx 5xx)
        })
        .then((data) => dispatch({ type: GET_DATA, payload: { comic: data } }))
        .catch((err) => {
          if (err.name === 'AbortError') return; // Ignoring errors due to cancelling
          dispatch({ type: ERROR, payload: { error: err } });
        });
    }

    return abortCtrl ? () => abortCtrl.abort() : undefined;
  }, [state.latestXkcdNum]);
  return state;
};

export default useFetchComic;
