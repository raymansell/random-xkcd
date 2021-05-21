import Layout from './components/Layout';
import { ComicProvider } from './context/ComicContext';
import ComicContainer from './components/ComicContainer';
import './assets/styles/App.scss';

const App = () => {
  return (
    <Layout>
      <ComicProvider>
        <ComicContainer />
      </ComicProvider>
    </Layout>
  );
};

export default App;
