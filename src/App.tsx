import ComicCard from './components/ComicCard';
import useFetchComic from './hooks/useFetchComic/useFetchComic';

const App = () => {
  const { comic, isLoading, error } = useFetchComic();
  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h4>Oops something went wrong. Try refreshing</h4>}
      {comic ? <ComicCard comic={comic} /> : null}
    </div>
  );
};

export default App;
