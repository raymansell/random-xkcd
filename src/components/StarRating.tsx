import { useRef } from 'react';
import styles from '../assets/styles/components/StarRating.module.scss';
import StarIcon from './StarIcon';

const StarRating = () => {
  const emptyRatingRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (emptyRatingRef.current) {
      emptyRatingRef.current.checked = false;
    }
  };

  return (
    <div className={`${styles['rating-container']} ${styles['rating-group']} `}>
      <input
        ref={emptyRatingRef}
        disabled
        checked
        className={`${styles['rating-input']} ${styles['rating-input--none']}`}
        id='rating-none'
        value='0'
        type='radio'
      />
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} idx={n} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default StarRating;
