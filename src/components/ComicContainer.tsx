import { useState } from 'react';
import { useComic } from '../context/ComicContext';
import Loader from './Loader';
import ComicCard from './ComicCard';
import StarRating from './StarRating';
import { BASE_URL } from '../context/utils';

const ComicContainer = () => {
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { state, useFetchComic, dispatch } = useComic();
  const { comic, isLoading, error } = useFetchComic(
    shouldRefetch,
    setShouldRefetch
  );

  const paginate = (direction: 'prev' | 'next') => {
    if (state.comic && state.latestXkcdNum) {
      const currentPage = state.comic.num;
      let newPage: number | undefined;
      if (direction === 'next' && currentPage < state.latestXkcdNum) {
        newPage = currentPage + 1;
      }
      if (direction === 'prev' && currentPage > 1) {
        newPage = currentPage - 1;
      }
      dispatch({ type: 'make-request' });
      fetch(`${BASE_URL}/?num=${newPage}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(`Error: ${res.status}`);
        })
        .then((data) => {
          dispatch({
            type: 'get-data',
            payload: { comic: data },
          });
        })
        .catch((err) => {
          dispatch({ type: 'error', payload: { error: err } });
        });
    }
  };

  return (
    <>
      {isLoading && (
        <>
          <h3 style={{ marginBottom: '1rem' }}>Loading...</h3>
          <Loader show />
        </>
      )}
      {error && <h4>Oops something went wrong. Try refreshing</h4>}
      {comic ? (
        <>
          <button onClick={() => paginate('prev')}>prev</button>
          <button onClick={() => paginate('next')}>next</button>
          <ComicCard comic={comic} />
          <h4>Rate this comic</h4>
          <StarRating />
          <button
            className='refetch-btn'
            onClick={() => setShouldRefetch(true)}
          >
            New random comic
          </button>
        </>
      ) : null}
    </>
  );
};

export default ComicContainer;
