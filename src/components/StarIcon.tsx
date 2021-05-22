/* eslint-disable react/self-closing-comp */
import { ChangeEvent } from 'react';
import styles from '../assets/styles/components/StarRating.module.scss';

interface StarIconProps {
  idx: number;
  checked: boolean;
  handleClick: (e: ChangeEvent<HTMLInputElement>) => void;
}
const StarIcon = ({ idx, handleClick, checked }: StarIconProps) => {
  return (
    <>
      <label
        aria-label={`${idx} star`}
        className={`${styles['rating-label']}`}
        htmlFor={`rating-${idx}`}
      >
        <i className={`${styles['rating-star']} fa fa-star`}></i>
      </label>
      <input
        onChange={handleClick}
        className={`${styles['rating-input']}`}
        name='rating'
        id={`rating-${idx}`}
        value={`${idx}`}
        type='radio'
        checked={checked}
      />
    </>
  );
};

export default StarIcon;
