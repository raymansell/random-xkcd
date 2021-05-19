import { Comic } from '../types';

interface ComicCardProps {
  comic: Comic;
}

const ComicCard = ({ comic }: ComicCardProps) => {
  return (
    <div>
      <h2>{comic.title}</h2>
      <img src={comic.img} alt={comic.alt} />
    </div>
  );
};

export default ComicCard;
