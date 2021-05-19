import { Dispatch, SetStateAction } from 'react';
import { Comic } from '../types';
import ComicCard from './ComicCard';
import StarRating from './StarRating';

interface ComicContainerProps {
  comic: Comic;
  setShouldRefetch: Dispatch<SetStateAction<boolean>>;
}

const ComicContainer = ({ comic, setShouldRefetch }: ComicContainerProps) => {
  return (
    <>
      <ComicCard comic={comic} />
      <h4>Rate this comic</h4>
      <StarRating />
      <button className='refetch-btn' onClick={() => setShouldRefetch(true)}>
        New random comic
      </button>
    </>
  );
};

export default ComicContainer;
