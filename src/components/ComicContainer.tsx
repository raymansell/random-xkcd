import { useEffect } from 'react';
import { useComic } from '../context/ComicContext';
import Loader from './Loader';
import ComicCard from './ComicCard';
import StarRating from './StarRating';

const ComicContainer = () => {
  const {
    state: { comic, rating, isLoading, error, latestXkcdNum },
    setLatestXkcdNum,
    fetchComic,
    saveToLocalStorage,
  } = useComic();

  useEffect(() => {
    if (!latestXkcdNum) {
      setLatestXkcdNum();
    } else {
      fetchComic('random');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestXkcdNum]);

  const handleClick = (fetchType: 'prev' | 'next' | 'random') => {
    if (comic) {
      saveToLocalStorage(rating, comic);
      fetchComic(fetchType);
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
          <button onClick={() => handleClick('prev')}>prev</button>
          <button onClick={() => handleClick('next')}>next</button>
          <ComicCard comic={comic} />
          <h4>Rate this comic</h4>
          <StarRating rating={rating} />
          <button className='refetch-btn' onClick={() => handleClick('random')}>
            New random comic
          </button>
        </>
      ) : null}
    </>
  );
};

export default ComicContainer;
