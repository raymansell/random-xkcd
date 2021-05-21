import { useState } from 'react';
import { useComic } from '../context/ComicContext';
import Loader from './Loader';
import ComicCard from './ComicCard';
import StarRating from './StarRating';

const ComicContainer = () => {
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { useFetchComic } = useComic();
  const { comic, isLoading, error } = useFetchComic(
    shouldRefetch,
    setShouldRefetch
  );
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
