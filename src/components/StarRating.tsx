import { ChangeEvent, useRef } from 'react';
import styles from '../assets/styles/components/StarRating.module.scss';
import StarIcon from './StarIcon';

const StarRating = () => {
  const emptyRatingRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (emptyRatingRef.current) {
      emptyRatingRef.current.checked = false;
      // One could set a rating state in this comp and then send a POST request to the server with the rating value.
      // eslint-disable-next-line no-console
      console.log(`This comic was rated ${e.target.value}/5`);
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
