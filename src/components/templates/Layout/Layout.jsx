import Header from 'components/organisms/Header/Header';
import React from 'react'
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main>
        {children}
      </main>
    </div>
  )
}

export { Layout };