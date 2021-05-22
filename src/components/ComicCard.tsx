import { Comic } from '../types';
import styles from '../assets/styles/components/ComicCard.module.scss';

interface ComicCardProps {
  comic: Comic;
}

const ComicCard = ({ comic }: ComicCardProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{comic.title}</h2>
      <img
        className={`${styles['comic-img']}`}
        src={comic.img}
        alt={comic.alt}
      />
      <p className={styles['comic-num']}>Comic #{comic.num}</p>
    </div>
  );
};

export default ComicCard;
