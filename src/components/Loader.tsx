/* eslint-disable react/self-closing-comp */
import styles from '../assets/styles/components/Loader.module.scss';

interface LoaderProps {
  show: boolean;
}

const Loader = ({ show }: LoaderProps) => {
  return show ? <div className={styles.loader}></div> : null;
};

export default Loader;
