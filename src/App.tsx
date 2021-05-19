import { useState } from 'react';
import Layout from './components/Layout';
import ComicCard from './components/ComicCard';
import useFetchComic from './hooks/useFetchComic/useFetchComic';
import StarRating from './components/StarRating';
import './assets/styles/App.scss';

const App = () => {
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { comic, isLoading, error } = useFetchComic(
    shouldRefetch,
    setShouldRefetch
  );
  return (
    <Layout>
      {isLoading && <h1>Loading...</h1>}
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
    </Layout>
  );
};

export default App;
