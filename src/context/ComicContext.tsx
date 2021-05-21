import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {
  State,
  MyDispatch,
  GET_LATEST_XKCD_NUM,
  MAKE_REQUEST,
  GET_DATA,
  ERROR,
} from './types';
import comicReducer from './ComicReducer';

// CORS enabled version of the xkcd API. Credit goes to https://github.com/khalby786/getxkcd
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const BASE_URL = process.env.REACT_APP_XKCD_API!;

const randomComicURL = (maxNum: number) => {
  const comicNum = Math.floor(Math.random() * (maxNum + 1));
  return `${BASE_URL}/?num=${comicNum}`;
};

const ComicContext =
  createContext<{ state: State; dispatch: MyDispatch } | undefined>(undefined);

const initialState: State = {
  latestXkcdNum: undefined,
  comic: null,
  isLoading: true,
  error: null,
};

interface ComicProviderProps {
  children: React.ReactNode;
}

const ComicProvider = ({ children }: ComicProviderProps) => {
  const [state, dispatch] = useReducer(comicReducer, initialState);
  return (
    <ComicContext.Provider value={{ state, dispatch }}>
      {children}
    </ComicContext.Provider>
  );
};

const useComic = () => {
  const context = useContext(ComicContext);
  if (context === undefined) {
    throw new Error('useComic must be used within a ComicContext');
  }
  const { state, dispatch } = context;

  const useFetchComic = (
    shouldRefetch: boolean,
    setShouldRefetch: Dispatch<SetStateAction<boolean>>
  ): State => {
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
              setShouldRefetch(true);
            } else {
              throw new Error(`Error: ${res.status}`);
            }
          } catch (err) {
            dispatch({ type: ERROR, payload: { error: err } });
          }
        };
        setLatestXkcdNum();
      } else if (shouldRefetch) {
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
          .then((data) => {
            // mocking a server GET request with localStorage.getItem()

            dispatch({
              type: GET_DATA,
              payload: { comic: data },
            });
            setShouldRefetch(false);
          })
          .catch((err) => {
            if (err.name === 'AbortError') return; // Ignoring errors due to cancelling
            dispatch({ type: ERROR, payload: { error: err } });
          });
      }

      return abortCtrl ? () => abortCtrl.abort() : undefined;
    }, [state.latestXkcdNum, shouldRefetch]);
    return state;
  };

  return {
    state,
    useFetchComic,
    dispatch,
  };
};

export { ComicProvider, useComic };
