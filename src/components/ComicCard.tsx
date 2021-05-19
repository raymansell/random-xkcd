import styles from '../assets/styles/components/ComicCard.module.scss';
import { Comic } from '../types';

interface ComicCardProps {
  comic: Comic;
}

const ComicCard = ({ comic }: ComicCardProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{comic.title}</h2>
      <img src={comic.img} alt={comic.alt} />
    </div>
  );
};

export default ComicCard;
