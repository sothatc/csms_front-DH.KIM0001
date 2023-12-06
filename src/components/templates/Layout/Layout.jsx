import Footer from 'components/organisms/Footer/Footer';
import Header from 'components/organisms/Header/Header';
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export { Layout };
