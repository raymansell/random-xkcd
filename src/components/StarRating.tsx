import { ChangeEvent, useRef } from 'react';
import { useComic } from '../context/ComicContext';
import StarIcon from './StarIcon';
import styles from '../assets/styles/components/StarRating.module.scss';

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  const { updateRating } = useComic();
  const emptyRatingRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (emptyRatingRef.current) {
      updateRating(Number(e.target.value));
    }
  };

  return (
    <div className={`${styles['rating-container']} ${styles['rating-group']} `}>
      <input
        ref={emptyRatingRef}
        disabled
        checked={rating === 0}
        className={`${styles['rating-input']} ${styles['rating-input--none']}`}
        id='rating-none'
        value='0'
        type='radio'
      />
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon
          key={n}
          idx={n}
          checked={n === rating}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default StarRating;
