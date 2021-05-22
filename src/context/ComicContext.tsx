import { createContext, useContext, useReducer } from 'react';
import { State, MyDispatch, History } from './types';
import comicReducer from './ComicReducer';
import { Comic } from '../types';

// CORS enabled version of the xkcd API. Credit goes to https://github.com/khalby786/getxkcd
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const BASE_URL = process.env.REACT_APP_XKCD_API!;

const ComicContext =
  createContext<{ state: State; dispatch: MyDispatch } | undefined>(undefined);

const history: History = localStorage.getItem('history')
  ? JSON.parse(localStorage.getItem('history') || '[]')
  : [];

const initialState: State = {
  latestXkcdNum: undefined,
  comic: null,
  rating: 0,
  isLoading: true,
  error: null,
  history,
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

  const setLatestXkcdNum = async () => {
    try {
      const res = await fetch(BASE_URL);
      if (res.ok) {
        const { num } = await res.json();
        dispatch({
          type: 'get-latest-xkcd-num',
          payload: { latestXkcdNum: num as number },
        });
      } else {
        throw new Error(`Error: ${res.status}`);
      }
    } catch (err) {
      dispatch({ type: 'error', payload: { error: err } });
    }
  };

  const fetchComic = (pageType: 'prev' | 'next' | 'random') => {
    const currentPage = state.comic?.num;
    let newPage: number | undefined;
    if ((!currentPage || pageType === 'random') && state.latestXkcdNum) {
      newPage = Math.floor(Math.random() * (state.latestXkcdNum + 1));
    }
    if (currentPage && pageType === 'prev' && state.latestXkcdNum) {
      newPage = currentPage - 1;
    }
    if (currentPage && pageType === 'next' && state.latestXkcdNum) {
      newPage = currentPage + 1;
    }
    dispatch({ type: 'make-request' });
    fetch(`${BASE_URL}/?num=${newPage}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Error: ${res.status}`); // Failed HTTP responses (4xx 5xx)
      })
      .then((data) => {
        // Mocking a GET request with localStorage.getItem()
        const updatedHistory: History = localStorage.getItem('history')
          ? JSON.parse(localStorage.getItem('history') || '[]')
          : [];
        dispatch({
          type: 'get-data',
          payload: {
            comic: data,
            rating:
              updatedHistory.find((h) => h.comic.num === data?.num)?.rating ||
              0,
            history: updatedHistory,
          },
        });
      })
      .catch((err) => {
        dispatch({ type: 'error', payload: { error: err } });
      });
  };

  // Mocking a POST request with localStorage
  const saveToLocalStorage = (rating: number, comic: Comic) => {
    const currentComicNumsInHistory = state.history.map((i) => i.comic.num);
    if (currentComicNumsInHistory.includes(comic.num)) {
      localStorage.setItem(
        'history',
        JSON.stringify(
          state.history.map((h) => {
            return h.comic.num === comic.num ? { comic, rating } : h;
          })
        )
      );
    } else {
      localStorage.setItem(
        'history',
        JSON.stringify(state.history.concat({ comic, rating }))
      );
    }
  };

  const updateRating = (rating: number) => {
    dispatch({ type: 'update-rating', payload: { rating } });
  };

  return {
    state,
    setLatestXkcdNum,
    fetchComic,
    saveToLocalStorage,
    updateRating,
    dispatch,
  };
};

export { ComicProvider, useComic };
