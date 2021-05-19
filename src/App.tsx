import { useState } from 'react';
import Layout from './components/Layout';
import useFetchComic from './hooks/useFetchComic/useFetchComic';
import ComicContainer from './components/ComicContainer';
import Loader from './components/Loader';
import './assets/styles/App.scss';

const App = () => {
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { comic, isLoading, error } = useFetchComic(
    shouldRefetch,
    setShouldRefetch
  );
  return (
    <Layout>
      {isLoading && (
        <>
          <h3 style={{ marginBottom: '1rem' }}>Loading...</h3>
          <Loader show />
        </>
      )}
      {error && <h4>Oops something went wrong. Try refreshing</h4>}
      {comic ? (
        <ComicContainer comic={comic} setShouldRefetch={setShouldRefetch} />
      ) : null}
    </Layout>
  );
};

export default App;
