import xkcdLogo from '../assets/static/logo.png';
import styles from '../assets/styles/components/Header.module.scss';

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <div>
        <img className={styles['logo-img']} src={xkcdLogo} alt='xkcd-logo' />
      </div>
      <div>
        <h3>a webcomic of romance, sarcasm, math, and language.</h3>
      </div>
    </header>
  );
};

export default Header;
