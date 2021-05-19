import React from 'react';
import styles from '../assets/styles/components/Layout.module.scss';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <section className={styles.hero}>{children}</section>
    </>
  );
};

export default Layout;
